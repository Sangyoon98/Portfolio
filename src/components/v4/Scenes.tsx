"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, Float, MeshDistortMaterial, OrbitControls, Preload, RoundedBox } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------------- shared: text drawn to a canvas texture ---------------- */

function textTexture(text: string, opts: { w?: number; h?: number; bg?: string; fg?: string; size?: number; weight?: number } = {}) {
  const { w = 512, h = 512, bg = "transparent", fg = "#1c1b2e", size = 92, weight = 700 } = opts;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  if (bg !== "transparent") {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let s = size;
  ctx.font = `${weight} ${s}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
  while (ctx.measureText(text).width > w * 0.82 && s > 20) {
    s -= 4;
    ctx.font = `${weight} ${s}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
  }
  ctx.fillText(text, w / 2, h / 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/* ---------------- 1. Particles: soft drifting dots (light theme "stars") ---------------- */

function Dots({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // random point in a sphere shell
      const r = 1.2 + Math.random() * 1.6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      arr[i * 3 + 2] = r * Math.cos(ph);
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    ref.current.rotation.x -= dt / 14;
    ref.current.rotation.y -= dt / 20;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#8f7cff" size={0.012} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
      </points>
    </group>
  );
}

export function ParticlesCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
        <Suspense fallback={null}>
          <Dots />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}

/* ---------------- 2. Hero: floating phone with a drawn screen, auto-rotating ---------------- */

function drawScreen() {
  const W = 360, Hh = 760, dpr = 2;
  const c = document.createElement("canvas");
  c.width = W * dpr;
  c.height = Hh * dpr;
  const ctx = c.getContext("2d")!;
  ctx.scale(dpr, dpr);
  const g = ctx.createLinearGradient(0, 0, W, Hh);
  g.addColorStop(0, "#f3efff");
  g.addColorStop(1, "#e6f6ff");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, Hh);
  const font = '-apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';
  const rr = (x: number, y: number, w: number, h: number, r: number, fill: string) => { ctx.fillStyle = fill; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); };
  rr(24, 60, W - 48, 96, 22, "#ffffff");
  ctx.fillStyle = "#1c1b2e"; ctx.font = `700 20px ${font}`; ctx.fillText("채상윤", 44, 100);
  ctx.fillStyle = "#7a7690"; ctx.font = `400 13px ${font}`; ctx.fillText("Android Developer · Seoul", 44, 126);
  const colors = ["#7c5cff", "#ff8fb1", "#5ee0c7", "#ffc857", "#6cc4ff", "#b58cff", "#ff9f6e", "#8ee7a1"];
  const labels = ["소개", "경력", "프로젝트", "스킬", "수상", "Crew Talk", "연락", "더보기"];
  labels.forEach((l, i) => {
    const x = 32 + (i % 4) * 78, y = 200 + Math.floor(i / 4) * 100;
    rr(x, y, 60, 60, 18, colors[i]);
    ctx.fillStyle = "#1c1b2e"; ctx.font = `400 12px ${font}`; ctx.textAlign = "center"; ctx.fillText(l, x + 30, y + 78); ctx.textAlign = "left";
  });
  rr(24, 420, W - 48, 150, 22, "#ffffff");
  ctx.fillStyle = "#7a7690"; ctx.font = `600 11px ${font}`; ctx.fillText("NOW", 44, 448);
  ctx.fillStyle = "#1c1b2e"; ctx.font = `700 17px ${font}`; ctx.fillText("메가스터디 스마트러닝", 44, 476);
  ctx.fillStyle = "#7a7690"; ctx.font = `400 13px ${font}`; ctx.fillText("북마크 · 재생 정책 · GA4 · 마이페이지", 44, 500);
  ctx.fillText("Compose + MVI 개편 진행 중", 44, 520);
  rr(W / 2 - 60, Hh - 28, 120, 5, 3, "rgba(28,27,46,.25)");
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function Phone() {
  const tex = useMemo(() => drawScreen(), []);
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.9}>
      <group rotation={[0.15, -0.5, 0.05]}>
        <RoundedBox args={[1.72, 3.5, 0.16]} radius={0.14} smoothness={6}>
          <meshStandardMaterial color="#e9e6f7" metalness={0.35} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 0, 0.081]}>
          <planeGeometry args={[1.58, 3.34]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        <mesh position={[-0.55, 1.35, -0.09]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 24]} />
          <meshStandardMaterial color="#c9c4e6" metalness={0.6} roughness={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0.3, 7], fov: 35 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 6]} intensity={1.8} />
      <directionalLight position={[-5, -2, 3]} intensity={0.6} color="#ffd6e8" />
      <Suspense fallback={null}>
        <Phone />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} minPolarAngle={Math.PI / 2.6} maxPolarAngle={Math.PI / 1.7} />
      <Preload all />
    </Canvas>
  );
}

/* ---------------- 3. Tech balls: ONE canvas for all (browsers cap live WebGL contexts) ---------------- */

function Ball({ label, color, position }: { label: string; color: string; position: [number, number, number] }) {
  const tex = useMemo(() => textTexture(label, { fg: "#1c1b2e", size: 96, weight: 800 }), [label]);
  useEffect(() => () => tex.dispose(), [tex]);
  const mesh = useRef<THREE.Mesh>(null!);
  const hover = useRef(false);
  useFrame((_, dt) => {
    const m = mesh.current;
    m.rotation.y += dt * (hover.current ? 2.2 : 0.25);
    const s = THREE.MathUtils.lerp(m.scale.x, hover.current ? 1.15 : 1, 0.12);
    m.scale.setScalar(s);
  });
  return (
    <group position={position}>
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={mesh} onPointerOver={() => (hover.current = true)} onPointerOut={() => (hover.current = false)}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={color} polygonOffset polygonOffsetFactor={-5} flatShading roughness={0.55} />
          <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1.05} map={tex} />
        </mesh>
      </Float>
    </group>
  );
}

function BallGrid({ items }: { items: { label: string; color: string }[] }) {
  const { viewport } = useThree();
  const gap = 2.7;
  const cols = Math.max(2, Math.min(6, Math.floor(viewport.width / gap)));
  const rows = Math.ceil(items.length / cols);
  const scale = Math.min(1, viewport.height / (rows * gap), viewport.width / (cols * gap));
  return (
    <group scale={scale}>
      {items.map((it, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        return <Ball key={it.label} label={it.label} color={it.color} position={[(c - (cols - 1) / 2) * gap, ((rows - 1) / 2 - r) * gap, 0]} />;
      })}
    </group>
  );
}

export function TechCanvas({ items }: { items: { label: string; color: string }[] }) {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 20], zoom: 55 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 6]} intensity={1.6} />
      <Suspense fallback={null}>
        <BallGrid items={items} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

/* ---------------- 4. Contact orb: soft distorted blob ---------------- */

function Orb() {
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh scale={2.1}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial color="#c9b8ff" distort={0.42} speed={2} roughness={0.25} metalness={0.05} />
      </mesh>
    </Float>
  );
}

export function OrbCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 40 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-4, -2, 2]} intensity={0.9} color="#ffb3d1" />
      <Suspense fallback={null}>
        <Orb />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      <Preload all />
    </Canvas>
  );
}
