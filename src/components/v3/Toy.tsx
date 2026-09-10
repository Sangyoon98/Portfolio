"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Physics, useBox, usePlane, type PublicApi } from "@react-three/cannon";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * A small physics toy: skill blocks stacked in a tower.
 * Drag a block to throw it, click to nudge, "reset" restacks.
 * Monochrome on purpose — it should read as part of the text page, not a hero.
 */

const BLOCKS: { label: string; w: number; dark?: boolean }[] = [
  { label: "Kotlin", w: 1.6, dark: true },
  { label: "Compose", w: 1.9 },
  { label: "MVI", w: 1.1 },
  { label: "Coroutines", w: 2.2 },
  { label: "Hilt", w: 1.1 },
  { label: "Retrofit", w: 1.7 },
  { label: "Clean Arch", w: 2.1 },
  { label: "SwiftUI", w: 1.6 },
  { label: "React", w: 1.3 },
  { label: "Room", w: 1.2 },
];
const H = 0.6;
const D = 0.9;

// tower layout: rows of 2-3 blocks, offset like bricks
function layout(): [number, number, number][] {
  const rows: number[][] = [[0, 1], [2, 3, 4], [5, 6], [7, 8, 9]];
  const out: [number, number, number][] = [];
  rows.forEach((row, r) => {
    const total = row.reduce((s, i) => s + BLOCKS[i].w, 0) + (row.length - 1) * 0.08;
    let x = -total / 2;
    row.forEach((i) => {
      out[i] = [x + BLOCKS[i].w / 2, H / 2 + r * (H + 0.02), 0];
      x += BLOCKS[i].w + 0.08;
    });
  });
  return out;
}
const START = layout();

type Held = { api: PublicApi; pos: THREE.Vector3 } | null;

// label drawn onto a canvas texture (no webfont, no extra GL context)
function labelTexture(text: string, w: number, h: number, face: string, ink: string, alpha = 1) {
  const S = 160;
  const c = document.createElement("canvas");
  c.width = Math.round(w * S);
  c.height = Math.round(h * S);
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = face;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = ink;
  ctx.globalAlpha = alpha;
  ctx.font = `600 ${Math.round(0.34 * S * (h / 0.6))}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, c.width / 2, c.height / 2 + 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function Block({
  i,
  dark,
  heldRef,
  resetKey,
}: {
  i: number;
  dark: boolean;
  heldRef: React.MutableRefObject<Held>;
  resetKey: number;
}) {
  const b = BLOCKS[i];
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: [b.w, H, D],
    position: START[i],
    angularDamping: 0.4,
    linearDamping: 0.05,
    material: { friction: 0.6, restitution: 0.15 },
  }));
  const pos = useMemo(() => new THREE.Vector3(...START[i]), [i]);
  useEffect(() => api.position.subscribe((p) => pos.set(p[0], p[1], p[2])), [api, pos]);

  useEffect(() => {
    if (!resetKey) return;
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
    api.rotation.set(0, 0, 0);
    api.position.set(...START[i]);
  }, [resetKey, api, i]);

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    heldRef.current = { api, pos };
    api.wakeUp();
  };
  const onUp = (e: ThreeEvent<PointerEvent>) => {
    if (heldRef.current?.api === api) {
      heldRef.current = null;
      // a tiny flick so a plain click still does something
      if (e.type === "pointerup") api.applyImpulse([0, 1.2, 0], [0, 0, 0]);
    }
  };

  const face = b.dark ? (dark ? "#f4f4f5" : "#111113") : dark ? "#26262b" : "#ffffff";
  const ink = b.dark ? (dark ? "#111113" : "#f4f4f5") : dark ? "#f4f4f5" : "#111113";
  const mats = useMemo(() => {
    const plain = new THREE.MeshStandardMaterial({ color: face, roughness: 0.85 });
    const front = new THREE.MeshStandardMaterial({ map: labelTexture(b.label, b.w, H, face, ink), roughness: 0.85 });
    const top = new THREE.MeshStandardMaterial({ map: labelTexture(b.label, b.w, D, face, ink, 0.45), roughness: 0.85 });
    // order: +x, -x, +y, -y, +z, -z
    return [plain, plain, top, plain, front, plain];
  }, [b.label, b.w, face, ink]);
  useEffect(() => () => mats.forEach((m) => { m.map?.dispose(); m.dispose(); }), [mats]);

  return (
    <mesh
      ref={ref as React.RefObject<THREE.Mesh>}
      material={mats}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerOver={() => (document.body.style.cursor = "grab")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <boxGeometry args={[b.w, H, D]} />
    </mesh>
  );
}

function Floor({ dark }: { dark: boolean }) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0], material: { friction: 0.8 } }));
  return (
    <mesh ref={ref as React.RefObject<THREE.Mesh>}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color={dark ? "#0e0e10" : "#fafafa"} roughness={1} />
    </mesh>
  );
}

function Wall({ position, args }: { position: [number, number, number]; args: [number, number, number] }) {
  useBox(() => ({ type: "Static", position, args }));
  return null;
}

// drives the held block toward the pointer, projected on the z=0 plane
function Drag({ heldRef }: { heldRef: React.MutableRefObject<Held> }) {
  const { camera, pointer, gl } = useThree();
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    const up = () => (heldRef.current = null);
    gl.domElement.addEventListener("pointerup", up);
    gl.domElement.addEventListener("pointerleave", up);
    return () => {
      gl.domElement.removeEventListener("pointerup", up);
      gl.domElement.removeEventListener("pointerleave", up);
    };
  }, [gl, heldRef]);
  useFrame(() => {
    const h = heldRef.current;
    if (!h) return;
    ray.setFromCamera(pointer, camera);
    if (!ray.ray.intersectPlane(plane, target)) return;
    target.y = Math.max(0.4, target.y);
    const k = 12;
    h.api.velocity.set((target.x - h.pos.x) * k, (target.y - h.pos.y) * k, (0 - h.pos.z) * k);
    h.api.angularVelocity.set(0, 0, 0);
  });
  return null;
}

export default function Toy({ dark }: { dark: boolean }) {
  const heldRef = useRef<Held>(null);
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="relative">
      <div className="h-[300px] sm:h-[340px] rounded-xl overflow-hidden touch-none" style={{ cursor: "default" }}>
        <Canvas camera={{ position: [0, 3.2, 9.5], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} onCreated={({ camera }) => camera.lookAt(0, 1.1, 0)}>
          <ambientLight intensity={dark ? 0.9 : 1.1} />
          <directionalLight
            position={[4, 8, 5]}
            intensity={dark ? 1.6 : 2}
          />
          <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ friction: 0.6, restitution: 0.15 }} iterations={10}>
            <Floor dark={dark} />
            <Wall position={[-7.5, 3, 0]} args={[1, 12, 20]} />
            <Wall position={[7.5, 3, 0]} args={[1, 12, 20]} />
            <Wall position={[0, 3, -3.5]} args={[30, 12, 1]} />
            <Wall position={[0, 3, 3.5]} args={[30, 12, 1]} />
            {BLOCKS.map((_, i) => (
              <Block key={i} i={i} dark={dark} heldRef={heldRef} resetKey={resetKey} />
            ))}
            <Drag heldRef={heldRef} />
          </Physics>
        </Canvas>
      </div>
      <div className="mt-2 flex items-center justify-between text-[13px] text-neutral-500 dark:text-neutral-400">
        <span>블록을 잡아 던져보세요. 주력 스택이 바닥을 받치고 있습니다.</span>
        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="rounded-md px-2 py-1 -mr-2 hover:bg-neutral-900/[.06] dark:hover:bg-white/[.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 transition-colors"
        >
          다시 쌓기
        </button>
      </div>
    </div>
  );
}
