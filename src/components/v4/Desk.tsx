"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, RoundedBox } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * "My desk": three devices, one per platform, sized by how much I've shipped on it.
 * Each screen is drawn from real data. Hover lifts a device and shows a summary; click filters projects.
 */

export type Platform = {
  key: "android" | "ios" | "web";
  label: string;
  stack: string[];
  count: number;
  since: string;
  projects: string[];
  color: string;
};

const FONT = '-apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';
const INK = "#1c1b2e";
const MUTE = "#7a7690";

function tex(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}
function chips(ctx: CanvasRenderingContext2D, items: string[], x: number, y: number, maxW: number, size: number) {
  ctx.font = `600 ${size}px ${FONT}`;
  let cx = x, cy = y;
  for (const it of items) {
    const w = ctx.measureText(it).width + size * 1.4;
    if (cx + w > x + maxW) { cx = x; cy += size * 2.3; }
    rr(ctx, cx, cy, w, size * 1.9, size, "rgba(28,27,46,.08)");
    ctx.fillStyle = INK;
    ctx.fillText(it, cx + size * 0.7, cy + size * 1.32);
    cx += w + size * 0.6;
  }
  return cy + size * 2.3;
}

function phoneScreen(p: Platform) {
  const W = 360, H = 740, d = 2;
  const c = document.createElement("canvas");
  c.width = W * d; c.height = H * d;
  const ctx = c.getContext("2d")!;
  ctx.scale(d, d);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#ffffff"); g.addColorStop(1, p.color);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = MUTE; ctx.font = `600 13px ${FONT}`; ctx.fillText(p.label.toUpperCase(), 28, 76);
  ctx.fillStyle = INK; ctx.font = `800 64px ${FONT}`; ctx.fillText(String(p.count), 26, 146);
  const cw = ctx.measureText(String(p.count)).width;
  ctx.font = `500 18px ${FONT}`; ctx.fillText("개 프로젝트", 26 + cw + 8, 146);
  ctx.fillStyle = MUTE; ctx.font = `400 14px ${FONT}`; ctx.fillText(`${p.since} — 현재`, 28, 176);
  const y = chips(ctx, p.stack, 28, 212, W - 56, 13);
  rr(ctx, 20, y + 18, W - 40, 10 + p.projects.length * 44, 18, "rgba(255,255,255,.85)");
  p.projects.forEach((t, i) => {
    ctx.fillStyle = INK; ctx.font = `600 15px ${FONT}`; ctx.fillText(t, 38, y + 18 + 30 + i * 44);
    ctx.fillStyle = "rgba(28,27,46,.08)"; if (i < p.projects.length - 1) ctx.fillRect(38, y + 18 + 44 + i * 44, W - 76, 1);
  });
  rr(ctx, W / 2 - 60, H - 26, 120, 5, 3, "rgba(28,27,46,.25)");
  return tex(c);
}

function laptopScreen(p: Platform) {
  const W = 1200, H = 750, d = 1.5;
  const c = document.createElement("canvas");
  c.width = W * d; c.height = H * d;
  const ctx = c.getContext("2d")!;
  ctx.scale(d, d);
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H);
  // browser chrome
  ctx.fillStyle = "#f1f0f8"; ctx.fillRect(0, 0, W, 64);
  ["#ff6b6b", "#ffd166", "#6ee7b7"].forEach((col, i) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(28 + i * 22, 32, 7, 0, Math.PI * 2); ctx.fill(); });
  rr(ctx, 120, 16, W - 240, 32, 16, "#ffffff");
  ctx.fillStyle = MUTE; ctx.font = `500 15px ${FONT}`; ctx.fillText("sangyoon.dev / web", 140, 38);
  // content
  const g = ctx.createLinearGradient(0, 64, W, H);
  g.addColorStop(0, "#ffffff"); g.addColorStop(1, p.color);
  ctx.fillStyle = g; ctx.fillRect(0, 64, W, H - 64);
  ctx.fillStyle = MUTE; ctx.font = `600 18px ${FONT}`; ctx.fillText(p.label.toUpperCase(), 72, 140);
  ctx.fillStyle = INK; ctx.font = `800 120px ${FONT}`; ctx.fillText(String(p.count), 68, 262);
  const cw = ctx.measureText(String(p.count)).width;
  ctx.font = `500 30px ${FONT}`; ctx.fillText("개 프로젝트", 68 + cw + 12, 262);
  ctx.fillStyle = MUTE; ctx.font = `400 22px ${FONT}`; ctx.fillText(`${p.since} — 현재`, 72, 306);
  chips(ctx, p.stack, 72, 350, 520, 20);
  rr(ctx, 660, 120, 470, 60 + p.projects.length * 70, 24, "rgba(255,255,255,.85)");
  ctx.fillStyle = MUTE; ctx.font = `600 15px ${FONT}`; ctx.fillText("PROJECTS", 690, 160);
  p.projects.forEach((t, i) => { ctx.fillStyle = INK; ctx.font = `600 24px ${FONT}`; ctx.fillText(t, 690, 208 + i * 70); });
  return tex(c);
}

/* ---------------- devices ---------------- */

function useHoverLift(hover: boolean, base: [number, number, number], lift = 0.22) {
  const g = useRef<THREE.Group>(null!);
  useFrame(() => {
    const k = 0.12;
    g.current.position.y += ((hover ? base[1] + lift : base[1]) - g.current.position.y) * k;
    const s = THREE.MathUtils.lerp(g.current.scale.x, hover ? 1.04 : 1, k);
    g.current.scale.setScalar(s);
  });
  return g;
}

function Label({ p, hover, y }: { p: Platform; hover: boolean; y: number }) {
  return (
    <Html position={[0, y, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
      <div
        style={{
          transform: `translateY(${hover ? 0 : 8}px) scale(${hover ? 1 : 0.94})`,
          opacity: hover ? 1 : 0.75,
          transition: "all .35s cubic-bezier(.2,.7,.1,1)",
          background: "rgba(255,255,255,.9)",
          backdropFilter: "blur(10px)",
          border: `1.5px solid ${hover ? INK : "rgba(28,27,46,.12)"}`,
          borderRadius: 999,
          padding: "7px 14px",
          fontSize: 13,
          fontWeight: 600,
          color: INK,
          whiteSpace: "nowrap",
          fontFamily: FONT,
          boxShadow: "0 12px 30px -14px rgba(60,50,120,.4)",
        }}
      >
        {p.label} · {p.count}개 {hover ? `· ${p.stack.slice(0, 3).join(", ")} · 클릭해서 보기` : ""}
      </div>
    </Html>
  );
}

function Phone({ p, position, rotation, size, onSelect }: { p: Platform; position: [number, number, number]; rotation: [number, number, number]; size: number; onSelect: () => void }) {
  const [hover, setHover] = useState(false);
  const g = useHoverLift(hover, position);
  const screen = useMemo(() => phoneScreen(p), [p]);
  useEffect(() => () => screen.dispose(), [screen]);
  const w = 1.5 * size, h = 3.1 * size, dpt = 0.14 * size;
  return (
    <group ref={g} position={position} rotation={rotation}>
      <group
        position={[0, h / 2, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
      >
        <RoundedBox args={[w, h, dpt]} radius={0.12 * size} smoothness={6}>
          <meshStandardMaterial color="#e9e6f7" metalness={0.3} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0, dpt / 2 + 0.001]}>
          <planeGeometry args={[w - 0.12 * size, h - 0.14 * size]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
      </group>
      <Label p={p} hover={hover} y={h + 0.25} />
    </group>
  );
}

function Laptop({ p, position, rotation, onSelect }: { p: Platform; position: [number, number, number]; rotation: [number, number, number]; onSelect: () => void }) {
  const [hover, setHover] = useState(false);
  const g = useHoverLift(hover, position, 0.16);
  const screen = useMemo(() => laptopScreen(p), [p]);
  useEffect(() => () => screen.dispose(), [screen]);
  const W = 3.4, D = 2.2, SH = 2.1;
  return (
    <group ref={g} position={position} rotation={rotation}>
      <group
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
      >
        {/* base */}
        <RoundedBox args={[W, 0.12, D]} radius={0.05} smoothness={4} position={[0, 0.06, 0]}>
          <meshStandardMaterial color="#e3e0f2" metalness={0.35} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.125, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[W - 0.5, D - 0.9]} />
          <meshStandardMaterial color="#d6d2ea" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.125, 0.85]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.1, 0.6]} />
          <meshStandardMaterial color="#cfcbe6" roughness={0.9} />
        </mesh>
        {/* lid hinged at back edge */}
        <group position={[0, 0.12, -D / 2]} rotation={[-0.32, 0, 0]}>
          <RoundedBox args={[W, SH, 0.08]} radius={0.05} smoothness={4} position={[0, SH / 2, 0]}>
            <meshStandardMaterial color="#e3e0f2" metalness={0.35} roughness={0.4} />
          </RoundedBox>
          <mesh position={[0, SH / 2, 0.041]}>
            <planeGeometry args={[W - 0.16, SH - 0.16]} />
            <meshBasicMaterial map={screen} toneMapped={false} />
          </mesh>
        </group>
      </group>
      <Label p={p} hover={hover} y={SH + 0.4} />
    </group>
  );
}

function Parallax({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null!);
  const { pointer, viewport } = useThree();
  // the desk is ~8.4 units wide; shrink it on narrow screens so all three devices stay in frame
  const fit = Math.min(1, viewport.getCurrentViewport(undefined, [0, 1, 0]).width / 8.6);
  useFrame(() => {
    g.current.rotation.y += (pointer.x * 0.14 - g.current.rotation.y) * 0.06;
    g.current.rotation.x += (-pointer.y * 0.05 - g.current.rotation.x) * 0.06;
  });
  return <group ref={g} scale={fit}>{children}</group>;
}

export function DeskCanvas({ platforms, onSelect }: { platforms: Platform[]; onSelect: (key: Platform["key"]) => void }) {
  const android = platforms.find((p) => p.key === "android")!;
  const ios = platforms.find((p) => p.key === "ios")!;
  const web = platforms.find((p) => p.key === "web")!;
  return (
    <Canvas camera={{ position: [0, 2.4, 9], fov: 34 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} onCreated={({ camera }) => camera.lookAt(0, 1.35, 0)}>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 7, 6]} intensity={1.7} />
      <directionalLight position={[-6, 3, 2]} intensity={0.7} color="#ffe3ee" />
      <Suspense fallback={null}>
        <Parallax>
          <Laptop p={web} position={[-2.35, 0, -0.9]} rotation={[0, 0.42, 0]} onSelect={() => onSelect("web")} />
          <Phone p={android} position={[0.55, 0, 0.7]} rotation={[-0.08, -0.12, 0]} size={1} onSelect={() => onSelect("android")} />
          <Phone p={ios} position={[2.55, 0, -0.1]} rotation={[-0.06, -0.42, 0]} size={0.78} onSelect={() => onSelect("ios")} />
          <ContactShadows position={[0, 0.001, 0]} opacity={0.28} scale={14} blur={2.6} far={4} color="#3a2f7a" />
        </Parallax>
      </Suspense>
    </Canvas>
  );
}
