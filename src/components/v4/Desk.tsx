"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, RoundedBox } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

/**
 * A small room. On the desk: one device per platform, sized by how much I've shipped on it.
 * Screens are drawn from real data. Hover lifts a device; click filters the project list.
 * ROOM_SLOTS are empty anchors for later props (hobbies etc.) — drop a mesh in via `extras`.
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

/**
 * Anchor points (x, y, z) beside the devices for future props (a hobby model, a mascot…). y is the ground.
 * Usage: pass a mesh via `extras` and set `position={ROOM_SLOTS.left}` — keep props under ~1.2 units tall so the devices stay the focus.
 */
export const ROOM_SLOTS = {
  left: [-5.2, 1.0, 0.6] as [number, number, number],
  right: [5.0, 1.0, 0.4] as [number, number, number],
  backLeft: [-4.6, 1.0, -1.6] as [number, number, number],
  backRight: [4.6, 1.0, -1.5] as [number, number, number],
};

const DESK_Y = 1.0;
const FONT = '-apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';
const INK = "#1c1b2e";
const MUTE = "#7a7690";

/* ---------------- canvas helpers ---------------- */

function tex(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
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
    const w = ctx.measureText(it).width + size * 1.5;
    if (cx + w > x + maxW) { cx = x; cy += size * 2.4; }
    rr(ctx, cx, cy, w, size * 2, size, "rgba(28,27,46,.08)");
    ctx.fillStyle = INK;
    ctx.fillText(it, cx + size * 0.75, cy + size * 1.4);
    cx += w + size * 0.6;
  }
  return cy + size * 2.4;
}
/** shared "big number + label" block; returns next y */
function headline(ctx: CanvasRenderingContext2D, p: Platform, x: number, y: number, big: number) {
  ctx.fillStyle = MUTE; ctx.font = `700 ${big * 0.22}px ${FONT}`; ctx.fillText(p.label.toUpperCase(), x, y);
  ctx.fillStyle = INK; ctx.font = `800 ${big}px ${FONT}`; ctx.fillText(String(p.count), x - big * 0.04, y + big * 0.98);
  const cw = ctx.measureText(String(p.count)).width;
  ctx.font = `600 ${big * 0.3}px ${FONT}`; ctx.fillText("개 프로젝트", x + cw + big * 0.08, y + big * 0.98);
  ctx.fillStyle = MUTE; ctx.font = `500 ${big * 0.24}px ${FONT}`; ctx.fillText(`${p.since} — 현재`, x, y + big * 1.4);
  return y + big * 1.75;
}
function projectList(ctx: CanvasRenderingContext2D, items: string[], x: number, y: number, w: number, size: number) {
  const row = size * 2.6;
  rr(ctx, x, y, w, row * items.length + size, size * 1.1, "rgba(255,255,255,.88)");
  items.forEach((t, i) => {
    ctx.fillStyle = INK; ctx.font = `600 ${size}px ${FONT}`;
    ctx.fillText(t, x + size, y + size * 0.6 + row * i + size * 1.05);
    if (i < items.length - 1) { ctx.fillStyle = "rgba(28,27,46,.08)"; ctx.fillRect(x + size, y + size * 0.6 + row * (i + 1) - size * 0.2, w - size * 2, 1.5); }
  });
}

/** Phone screen with a black bezel baked in; `island` draws an iPhone-style pill. */
function phoneScreen(p: Platform, island: boolean) {
  const W = 390, H = 820, d = 2, bez = island ? 14 : 10, rad = island ? 56 : 34;
  const c = document.createElement("canvas");
  c.width = W * d; c.height = H * d;
  const ctx = c.getContext("2d")!;
  ctx.scale(d, d);
  rr(ctx, 0, 0, W, H, rad + bez, "#0b0b10");
  ctx.save();
  ctx.beginPath(); ctx.roundRect(bez, bez, W - bez * 2, H - bez * 2, rad); ctx.clip();
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#ffffff"); g.addColorStop(1, p.color);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const y0 = headline(ctx, p, 34, island ? 150 : 120, 104);
  const y1 = chips(ctx, p.stack.slice(0, 4), 34, y0, W - 68, 19);
  projectList(ctx, p.projects.slice(0, 3), 24, y1 + 14, W - 48, 19);
  rr(ctx, W / 2 - 64, H - 30, 128, 6, 3, "rgba(28,27,46,.3)");
  ctx.restore();
  if (island) rr(ctx, W / 2 - 62, 34, 124, 36, 18, "#0b0b10");
  else { ctx.fillStyle = "#0b0b10"; ctx.beginPath(); ctx.arc(W / 2, 40, 9, 0, Math.PI * 2); ctx.fill(); }
  return tex(c);
}

/** MacBook lid: black bezel, rounded screen, notch. */
function laptopScreen(p: Platform) {
  const W = 1440, H = 920, d = 1.25, bez = 22;
  const c = document.createElement("canvas");
  c.width = W * d; c.height = H * d;
  const ctx = c.getContext("2d")!;
  ctx.scale(d, d);
  rr(ctx, 0, 0, W, H, 40, "#0b0b10");
  ctx.save();
  ctx.beginPath(); ctx.roundRect(bez, bez, W - bez * 2, H - bez * 2, 22); ctx.clip();
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H);
  // browser chrome
  ctx.fillStyle = "#eeecf6"; ctx.fillRect(0, 0, W, 78);
  ["#ff6b6b", "#ffd166", "#6ee7b7"].forEach((col, i) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(52 + i * 26, 48, 8, 0, Math.PI * 2); ctx.fill(); });
  rr(ctx, 200, 27, W - 400, 42, 21, "#ffffff");
  ctx.fillStyle = MUTE; ctx.font = `500 19px ${FONT}`; ctx.textAlign = "center"; ctx.fillText("sangyoon.dev / web", W / 2, 55); ctx.textAlign = "left";
  const g = ctx.createLinearGradient(0, 78, W, H);
  g.addColorStop(0, "#ffffff"); g.addColorStop(1, p.color);
  ctx.fillStyle = g; ctx.fillRect(0, 78, W, H - 78);
  const y0 = headline(ctx, p, 90, 200, 190);
  chips(ctx, p.stack.slice(0, 5), 90, y0, 620, 28);
  projectList(ctx, p.projects.slice(0, 3), 800, 190, 550, 30);
  ctx.restore();
  rr(ctx, W / 2 - 80, 0, 160, 40, 14, "#0b0b10"); // notch
  return tex(c);
}

/** Keyboard + trackpad drawn onto the MacBook base. */
function keyboardTexture() {
  const W = 1024, H = 640;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#d8d5e6"; ctx.fillRect(0, 0, W, H);
  rr(ctx, 90, 40, W - 180, 300, 16, "#c9c5dc");
  const cols = 14, rows = 5, kw = (W - 220) / cols, kh = 48;
  for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) {
    const wide = r === rows - 1 && k > 3 && k < 10;
    if (wide && k !== 4) continue;
    rr(ctx, 110 + k * kw + 3, 56 + r * (kh + 8), (wide ? kw * 6 : kw) - 6, kh, 6, "#eeecf6");
  }
  rr(ctx, W / 2 - 170, 380, 340, 220, 22, "#cfcbe0");
  return tex(c);
}

/* ---------------- shared behaviour ---------------- */

function useHoverLift(hover: boolean, base: [number, number, number], lift = 0.2) {
  const g = useRef<THREE.Group>(null!);
  useFrame(() => {
    const k = 0.12;
    g.current.position.y += ((hover ? base[1] + lift : base[1]) - g.current.position.y) * k;
    const s = THREE.MathUtils.lerp(g.current.scale.x, hover ? 1.035 : 1, k);
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
          opacity: hover ? 1 : 0.8,
          transition: "all .35s cubic-bezier(.2,.7,.1,1)",
          background: "rgba(255,255,255,.92)",
          backdropFilter: "blur(10px)",
          border: `1.5px solid ${hover ? INK : "rgba(28,27,46,.12)"}`,
          borderRadius: 999,
          padding: "8px 15px",
          fontSize: 14,
          fontWeight: 600,
          color: INK,
          whiteSpace: "nowrap",
          fontFamily: FONT,
          boxShadow: "0 12px 30px -14px rgba(60,50,120,.4)",
        }}
      >
        {p.label} · {p.count}개{hover ? ` · ${p.stack.slice(0, 3).join(", ")} · 클릭해서 보기` : ""}
      </div>
    </Html>
  );
}

type DeviceProps = { p: Platform; position: [number, number, number]; rotation: [number, number, number]; onSelect: () => void };

function useDeviceHover(onSelect: () => void) {
  const [hover, setHover] = useState(false);
  const handlers = {
    onPointerOver: (e: { stopPropagation: () => void }) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; },
    onPointerOut: () => { setHover(false); document.body.style.cursor = ""; },
    onClick: (e: { stopPropagation: () => void }) => { e.stopPropagation(); onSelect(); },
  };
  return { hover, handlers };
}

/* ---------------- devices ---------------- */

function AndroidPhone({ p, position, rotation, onSelect }: DeviceProps) {
  const { hover, handlers } = useDeviceHover(onSelect);
  const g = useHoverLift(hover, position);
  const screen = useMemo(() => phoneScreen(p, false), [p]);
  useEffect(() => () => screen.dispose(), [screen]);
  const w = 1.55, h = 3.25, dpt = 0.14;
  return (
    <group ref={g} position={position} rotation={rotation}>
      <group position={[0, h / 2, 0]} {...handlers}>
        <RoundedBox args={[w, h, dpt]} radius={0.13} smoothness={6} castShadow receiveShadow>
          <meshStandardMaterial color="#ddd8f0" roughness={0.95} />
        </RoundedBox>
        <mesh position={[0, 0, dpt / 2 + 0.001]}>
          <planeGeometry args={[w - 0.06, h - 0.06]} />
          <meshBasicMaterial map={screen} toneMapped={false} transparent />
        </mesh>
      </group>
      <Label p={p} hover={hover} y={h + 0.12} />
    </group>
  );
}

function IPhone({ p, position, rotation, onSelect }: DeviceProps) {
  const { hover, handlers } = useDeviceHover(onSelect);
  const g = useHoverLift(hover, position);
  const screen = useMemo(() => phoneScreen(p, true), [p]);
  useEffect(() => () => screen.dispose(), [screen]);
  const w = 1.22, h = 2.5, dpt = 0.12;
  return (
    <group ref={g} position={position} rotation={rotation}>
      <group position={[0, h / 2, 0]} {...handlers}>
        {/* titanium-ish frame with big corner radius */}
        <RoundedBox args={[w, h, dpt]} radius={0.2} smoothness={8} castShadow receiveShadow>
          <meshStandardMaterial color="#eadfe9" roughness={0.9} />
        </RoundedBox>
        <mesh position={[0, 0, dpt / 2 + 0.001]}>
          <planeGeometry args={[w - 0.04, h - 0.04]} />
          <meshBasicMaterial map={screen} toneMapped={false} transparent />
        </mesh>
        {/* side buttons */}
        <mesh position={[-w / 2 - 0.01, 0.55, 0]}><boxGeometry args={[0.02, 0.22, 0.05]} /><meshStandardMaterial color="#d8cfd8" /></mesh>
        <mesh position={[-w / 2 - 0.01, 0.2, 0]}><boxGeometry args={[0.02, 0.32, 0.05]} /><meshStandardMaterial color="#d8cfd8" /></mesh>
        <mesh position={[w / 2 + 0.01, 0.35, 0]}><boxGeometry args={[0.02, 0.45, 0.05]} /><meshStandardMaterial color="#d8cfd8" /></mesh>
      </group>
      <Label p={p} hover={hover} y={h + 0.12} />
    </group>
  );
}

function MacBook({ p, position, rotation, onSelect }: DeviceProps) {
  const { hover, handlers } = useDeviceHover(onSelect);
  const g = useHoverLift(hover, position, 0.14);
  const screen = useMemo(() => laptopScreen(p), [p]);
  const keys = useMemo(() => keyboardTexture(), []);
  useEffect(() => () => { screen.dispose(); keys.dispose(); }, [screen, keys]);
  const W = 3.7, D = 2.45, T = 0.09, SH = 2.36, LT = 0.06;
  return (
    <group ref={g} position={position} rotation={rotation}>
      <group {...handlers}>
        {/* base */}
        <RoundedBox args={[W, T, D]} radius={0.04} smoothness={4} position={[0, T / 2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#d7d3e6" roughness={0.9} />
        </RoundedBox>
        <mesh position={[0, T + 0.001, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[W - 0.2, D - 0.3]} />
          <meshStandardMaterial map={keys} roughness={0.9} />
        </mesh>
        {/* lid, hinged at the back edge, tilted open */}
        <group position={[0, T, -D / 2 + 0.03]} rotation={[-0.36, 0, 0]}>
          <RoundedBox args={[W, SH, LT]} radius={0.05} smoothness={4} position={[0, SH / 2, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#d7d3e6" roughness={0.9} />
          </RoundedBox>
          <mesh position={[0, SH / 2, LT / 2 + 0.001]}>
            <planeGeometry args={[W - 0.08, SH - 0.08]} />
            <meshBasicMaterial map={screen} toneMapped={false} transparent />
          </mesh>
        </group>
      </group>
      <Label p={p} hover={hover} y={SH + 0.3} />
    </group>
  );
}

/* ---------------- ground: nothing but a soft contact shadow, so the page is the background ---------------- */

function Ground() {
  return <ContactShadows position={[0, DESK_Y + 0.001, 0]} opacity={0.42} scale={14} blur={2.6} far={3.2} color="#3f3270" />;
}

function Parallax({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null!);
  const { pointer, viewport } = useThree();
  const fit = Math.min(1, viewport.width / 12.5);
  useFrame(() => {
    g.current.rotation.y += (pointer.x * 0.09 - g.current.rotation.y) * 0.06;
    g.current.rotation.x += (-pointer.y * 0.03 - g.current.rotation.x) * 0.06;
  });
  return <group ref={g} scale={fit}>{children}</group>;
}

export function DeskCanvas({ platforms, onSelect, extras }: { platforms: Platform[]; onSelect: (key: Platform["key"]) => void; extras?: ReactNode }) {
  const android = platforms.find((p) => p.key === "android")!;
  const ios = platforms.find((p) => p.key === "ios")!;
  const web = platforms.find((p) => p.key === "web")!;
  return (
    <Canvas shadows="soft" camera={{ position: [0.3, 3.4, 10.6], fov: 34 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} onCreated={({ camera }) => camera.lookAt(0, 1.95, -0.2)}>
      {/* studio light built from light panels — no HDR download */}
      <Environment resolution={128}>
        <Lightformer intensity={1.6} form="rect" position={[0, 6, -3]} scale={[12, 5, 1]} target={[0, 0, 0]} />
        <Lightformer intensity={0.9} form="rect" position={[-6, 3, 4]} scale={[4, 4, 1]} color="#ffe9f1" target={[0, 1, 0]} />
        <Lightformer intensity={0.7} form="rect" position={[6, 2, 4]} scale={[4, 3, 1]} color="#e6f0ff" target={[0, 1, 0]} />
      </Environment>
      <ambientLight intensity={0.35} />
      <directionalLight castShadow position={[-3, 7, 5]} intensity={1.3} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-8} />
      <Suspense fallback={null}>
        <Parallax>
          <Ground />
          <MacBook p={web} position={[-2.7, DESK_Y, -0.6]} rotation={[0, 0.34, 0]} onSelect={() => onSelect("web")} />
          <AndroidPhone p={android} position={[0.55, DESK_Y, 0.8]} rotation={[-0.1, -0.1, 0]} onSelect={() => onSelect("android")} />
          <IPhone p={ios} position={[2.75, DESK_Y, 0.15]} rotation={[-0.08, -0.4, 0]} onSelect={() => onSelect("ios")} />
          {extras}
        </Parallax>
      </Suspense>
    </Canvas>
  );
}
