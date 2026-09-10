"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Physics, useBox, usePlane, type PublicApi } from "@react-three/cannon";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Skill cubes on a table. Pick them up, throw them, stack them however you like.
 * Color = category. "탑으로 쌓기" restacks, "흩뿌리기" scatters.
 */

export type Cube = { label: string; cat: string; color: string };

const S = 0.82; // cube size
type Held = { api: PublicApi; pos: THREE.Vector3 } | null;

function labelTexture(text: string, alpha = 1) {
  const px = 256;
  const c = document.createElement("canvas");
  c.width = px; c.height = px;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#1c1b2e"; ctx.globalAlpha = alpha;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  let s = 54;
  ctx.font = `700 ${s}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
  while (ctx.measureText(text).width > px * 0.8 && s > 18) { s -= 3; ctx.font = `700 ${s}px -apple-system, "Helvetica Neue", Arial, sans-serif`; }
  ctx.fillText(text, px / 2, px / 2 + 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// resting spots on the table: three loose rows, front row slightly offset
function scatterLayout(n: number): [number, number, number][] {
  const out: [number, number, number][] = [];
  const cols = Math.ceil(n / 3);
  for (let i = 0; i < n; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    out.push([(c - (cols - 1) / 2) * (S + 0.5) + (r % 2 ? 0.4 : 0), S / 2, 1.4 - r * 1.4]);
  }
  return out;
}
// tidy tower: 3 wide
function towerLayout(n: number): [number, number, number][] {
  const out: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const c = i % 3, r = Math.floor(i / 3);
    out.push([(c - 1) * (S + 0.02), S / 2 + r * (S + 0.01), 0]);
  }
  return out;
}

function Block({ cube, i, start, heldRef, cmd }: { cube: Cube; i: number; start: [number, number, number]; heldRef: React.MutableRefObject<Held>; cmd: { n: number; kind: "tower" | "scatter" | "shake" } }) {
  const [ref, api] = useBox(() => ({ mass: 1, args: [S, S, S], position: start, angularDamping: 0.6, linearDamping: 0.08, material: { friction: 0.9, restitution: 0.05 } }));
  const pos = useMemo(() => new THREE.Vector3(...start), [start]);
  useEffect(() => api.position.subscribe((p) => pos.set(p[0], p[1], p[2])), [api, pos]);

  useEffect(() => {
    if (!cmd.n) return;
    if (cmd.kind === "shake") {
      api.applyImpulse([(Math.random() - 0.5) * 6, 5 + Math.random() * 3, (Math.random() - 0.5) * 6], [0, 0, 0]);
      return;
    }
    const target = (cmd.kind === "tower" ? towerLayout(TOTAL_HOLDER.n) : scatterLayout(TOTAL_HOLDER.n))[i];
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
    api.rotation.set(0, 0, 0);
    api.position.set(target[0], target[1] + (cmd.kind === "tower" ? 0.02 * i : 0.6), target[2]);
  }, [cmd, api, i]);

  const top = useMemo(() => labelTexture(cube.label, 0.9), [cube.label]);
  const front = useMemo(() => labelTexture(cube.label, 0.55), [cube.label]);
  useEffect(() => () => { top.dispose(); front.dispose(); }, [top, front]);

  const onDown = (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); heldRef.current = { api, pos }; api.wakeUp(); };
  const onUp = () => { if (heldRef.current?.api === api) heldRef.current = null; };

  return (
    <group ref={ref as React.RefObject<THREE.Group>}>
      {/* keycap-like clay block: rounded edges, matte, label printed on top and front */}
      <RoundedBox args={[S, S, S]} radius={0.16} smoothness={5} castShadow receiveShadow onPointerDown={onDown} onPointerUp={onUp} onPointerOver={() => (document.body.style.cursor = "grab")} onPointerOut={() => (document.body.style.cursor = "")}>
        <meshStandardMaterial color={cube.color} roughness={0.95} />
      </RoundedBox>
      <mesh position={[0, S / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[S * 0.86, S * 0.86]} />
        <meshBasicMaterial map={top} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, S / 2 + 0.002]}>
        <planeGeometry args={[S * 0.86, S * 0.86]} />
        <meshBasicMaterial map={front} transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}
const TOTAL_HOLDER = { n: 0 };

function Table() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], material: { friction: 1 } }));
  return (
    <group>
      <mesh ref={ref as React.RefObject<THREE.Mesh>} visible={false}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial />
      </mesh>
      <ContactShadows position={[0, 0.001, 0]} opacity={0.45} scale={22} blur={2.2} far={2.5} color="#3f3270" frames={Infinity} />
    </group>
  );
}
function Wall({ position, args }: { position: [number, number, number]; args: [number, number, number] }) {
  useBox(() => ({ type: "Static", position, args }));
  return null;
}

// pulls the camera back on narrow viewports so the whole table stays in frame
function CameraFit() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    const z = 10.5 * Math.max(1, 1.75 / aspect);
    camera.position.set(0, 5.2 * (z / 10.5), z);
    camera.lookAt(0, 0.4, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

// carries the held cube toward the pointer on a plane facing the camera, so you can lift and place
function Drag({ heldRef }: { heldRef: React.MutableRefObject<Held> }) {
  const { camera, pointer, gl } = useThree();
  const plane = useMemo(() => new THREE.Plane(), []);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const normal = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    const up = () => (heldRef.current = null);
    gl.domElement.addEventListener("pointerup", up);
    gl.domElement.addEventListener("pointerleave", up);
    return () => { gl.domElement.removeEventListener("pointerup", up); gl.domElement.removeEventListener("pointerleave", up); };
  }, [gl, heldRef]);
  useFrame(() => {
    const h = heldRef.current;
    if (!h) return;
    // plane through the cube, perpendicular to the camera's forward on the ground (keeps depth stable)
    camera.getWorldDirection(normal);
    normal.y = 0; normal.normalize();
    plane.setFromNormalAndCoplanarPoint(normal, h.pos);
    ray.setFromCamera(pointer, camera);
    if (!ray.ray.intersectPlane(plane, target)) return;
    target.y = Math.max(S / 2, target.y);
    const k = 14;
    h.api.velocity.set((target.x - h.pos.x) * k, (target.y - h.pos.y) * k, (target.z - h.pos.z) * k);
    h.api.angularVelocity.set(0, 0, 0);
  });
  return null;
}

export default function Playground({ cubes, legend }: { cubes: Cube[]; legend: { cat: string; color: string }[] }) {
  const heldRef = useRef<Held>(null);
  const [cmd, setCmd] = useState<{ n: number; kind: "tower" | "scatter" | "shake" }>({ n: 0, kind: "scatter" });
  TOTAL_HOLDER.n = cubes.length;
  const starts = useMemo(() => scatterLayout(cubes.length), [cubes.length]);
  const btn = "rounded-full border border-[#1c1b2e]/15 bg-white px-3.5 py-1.5 text-[13px] font-medium hover:border-[#1c1b2e] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c5cff]";

  return (
    <div>
      <div className="h-[380px] sm:h-[460px] overflow-hidden rounded-[28px] touch-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,.15))" }}>
        <Canvas shadows="soft" camera={{ position: [0, 5.2, 10.5], fov: 34 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
          <CameraFit />
          <ambientLight intensity={1.1} />
          <directionalLight castShadow position={[4, 8, 5]} intensity={1.6} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} />
          <directionalLight position={[-6, 4, -2]} intensity={0.5} color="#ffe3ee" />
          <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ friction: 0.9, restitution: 0.05 }} iterations={12}>
            <Table />
            <Wall position={[-7.5, 3, 0]} args={[1, 12, 20]} />
            <Wall position={[7.5, 3, 0]} args={[1, 12, 20]} />
            <Wall position={[0, 3, -4]} args={[30, 12, 1]} />
            <Wall position={[0, 3, 4]} args={[30, 12, 1]} />
            {cubes.map((c, i) => <Block key={c.label} cube={c} i={i} start={starts[i]} heldRef={heldRef} cmd={cmd} />)}
            <Drag heldRef={heldRef} />
          </Physics>
        </Canvas>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#7a7690]">
        <div className="flex flex-wrap items-center gap-4">
          {legend.map((l) => <span key={l.cat} className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{ background: l.color }} />{l.cat}</span>)}
          <span>큐브를 잡아 원하는 대로 쌓아보세요.</span>
        </div>
        <div className="flex gap-2">
          <button className={btn} onClick={() => setCmd((c) => ({ n: c.n + 1, kind: "tower" }))}>탑으로 쌓기</button>
          <button className={btn} onClick={() => setCmd((c) => ({ n: c.n + 1, kind: "scatter" }))}>제자리로</button>
          <button className={btn} onClick={() => setCmd((c) => ({ n: c.n + 1, kind: "shake" }))}>흩뿌리기</button>
        </div>
      </div>
    </div>
  );
}
