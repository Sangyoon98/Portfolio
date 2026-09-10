"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Html, Line, RoundedBox, Stars } from "@react-three/drei";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { profile } from "@/data/portfolio";
import { LINES, MAP_MAX_X, MAP_MIN_X, STATIONS, type LineKey, type Station } from "./stations";

type Mode = "home" | "map";

/* ---------------- Phone home screen (drawn into a canvas texture) ---------------- */

const SCREEN_W = 360;
const SCREEN_H = 760;
const APPS = [
  { label: "소개", color: "#2b6cff", action: "about" },
  { label: "경력", color: "#00a84d", action: "map" },
  { label: "프로젝트", color: "#a6ff4d", action: "map" },
  { label: "스킬", color: "#b56bff", action: "about" },
  { label: "수상", color: "#ffd23d", action: "about" },
  { label: "Crew Talk", color: "#23c8a2", action: "guestbook" },
  { label: "연락", color: "#ff4d7a", action: "about" },
  { label: "더보기", color: "#2e3038", action: "about" },
] as const;
type AppAction = (typeof APPS)[number]["action"];

const ICON = 64;
const GRID_X0 = 28;
const GRID_Y0 = 210;
const GRID_GAP_X = 84;
const GRID_GAP_Y = 104;

function iconRect(i: number) {
  return { x: GRID_X0 + (i % 4) * GRID_GAP_X, y: GRID_Y0 + Math.floor(i / 4) * GRID_GAP_Y, w: ICON, h: ICON };
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.closePath();
}

function drawHomeScreen(hover: number) {
  const dpr = 2;
  const c = document.createElement("canvas");
  c.width = SCREEN_W * dpr;
  c.height = SCREEN_H * dpr;
  const ctx = c.getContext("2d")!;
  ctx.scale(dpr, dpr);

  const bg = ctx.createLinearGradient(0, 0, SCREEN_W, SCREEN_H);
  bg.addColorStop(0, "#1a1c24");
  bg.addColorStop(1, "#0f1015");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

  const font = '-apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';

  // widget
  ctx.fillStyle = "#1c1d22";
  roundRect(ctx, 24, 56, SCREEN_W - 48, 92, 22);
  ctx.fill();
  ctx.fillStyle = "#2a2c34";
  ctx.beginPath();
  ctx.arc(70, 102, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f2f2f0";
  ctx.font = `600 18px ${font}`;
  ctx.fillText(profile.name, 112, 96);
  ctx.fillStyle = "#a6ff4d";
  ctx.beginPath();
  ctx.arc(118, 119, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#a9aab0";
  ctx.font = `400 12px ${font}`;
  ctx.fillText("메가스터디교육 · 재직 중", 128, 123);

  // app grid
  APPS.forEach((app, i) => {
    const r = iconRect(i);
    const s = i === hover ? 1.08 : 1;
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    ctx.fillStyle = app.color;
    roundRect(ctx, cx - (r.w * s) / 2, cy - (r.h * s) / 2, r.w * s, r.h * s, 18);
    ctx.fill();
    ctx.fillStyle = app.color === "#a6ff4d" || app.color === "#ffd23d" ? "#0e0f12" : "#ffffff";
    ctx.font = `700 22px ${font}`;
    ctx.textAlign = "center";
    ctx.fillText(app.label.slice(0, 1), cx, cy + 8);
    ctx.fillStyle = "#e9e9e6";
    ctx.font = `400 12px ${font}`;
    ctx.fillText(app.label, cx, r.y + r.h + 20);
    ctx.textAlign = "left";
  });

  // hint + nav bar
  ctx.fillStyle = "#6f7076";
  ctx.font = `400 12px ${font}`;
  ctx.textAlign = "center";
  ctx.fillText("경력 또는 프로젝트를 눌러 노선도 열기", SCREEN_W / 2, 470);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,.35)";
  roundRect(ctx, SCREEN_W / 2 - 60, SCREEN_H - 28, 120, 5, 3);
  ctx.fill();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function hitApp(uv: THREE.Vector2) {
  const px = uv.x * SCREEN_W;
  const py = (1 - uv.y) * SCREEN_H;
  return APPS.findIndex((_, i) => {
    const r = iconRect(i);
    return px >= r.x && px <= r.x + r.w && py >= r.y - 4 && py <= r.y + r.h + 24;
  });
}

function Phone({ mode, onApp }: { mode: Mode; onApp: (a: AppAction) => void }) {
  const group = useRef<THREE.Group>(null!);
  const [hover, setHover] = useState(-1);
  const texture = useMemo(() => drawHomeScreen(hover), [hover]);
  useEffect(() => () => texture.dispose(), [texture]);

  const target = useMemo(() => ({ pos: new THREE.Vector3(), rot: new THREE.Euler(), scale: 1 }), []);

  useFrame((state, dt) => {
    const k = 1 - Math.exp(-dt * 5);
    if (mode === "home") {
      target.pos.set(0, 0, 0);
      target.rot.set(-state.pointer.y * 0.35, state.pointer.x * 0.5, 0);
      target.scale = 1;
    } else {
      target.pos.set(MAP_MIN_X - 3.4, -0.2, 0.8);
      target.rot.set(0.1, 0.55, -0.05);
      target.scale = 0.55;
    }
    group.current.position.lerp(target.pos, k);
    group.current.rotation.x += (target.rot.x - group.current.rotation.x) * k;
    group.current.rotation.y += (target.rot.y - group.current.rotation.y) * k;
    group.current.rotation.z += (target.rot.z - group.current.rotation.z) * k;
    const s = group.current.scale.x + (target.scale - group.current.scale.x) * k;
    group.current.scale.setScalar(s);
  });

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (mode !== "home" || !e.uv) return;
    setHover(hitApp(e.uv));
  };
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (mode !== "home" || !e.uv) return;
    const i = hitApp(e.uv);
    if (i >= 0) onApp(APPS[i].action);
  };

  return (
    <group ref={group}>
      <RoundedBox args={[1.72, 3.5, 0.16]} radius={0.14} smoothness={6}>
        <meshStandardMaterial color="#111318" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <mesh
        position={[0, 0, 0.081]}
        onPointerMove={onMove}
        onPointerOut={() => setHover(-1)}
        onClick={onClick}
      >
        <planeGeometry args={[1.58, 3.34]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* camera bump */}
      <mesh position={[-0.55, 1.35, -0.09]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 24]} />
        <meshStandardMaterial color="#1c1e26" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ---------------- Subway map ---------------- */

function linePoints(key: LineKey) {
  const l = LINES[key];
  const xs = STATIONS.filter((s) => s.lines.includes(key)).map((s) => s.x);
  const min = Math.min(...xs) - 1.2;
  const max = Math.max(...xs) + 1.2;
  const pts: THREE.Vector3[] = [];
  const n = 40;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = min + (max - min) * t;
    // gentle wave so lines read as rails, not rulers
    const wobble = key === "android" ? 0 : Math.sin(t * Math.PI * 2 + (key === "ios" ? 1 : 2.5)) * 0.15;
    pts.push(new THREE.Vector3(x, l.y + wobble, l.z));
  }
  return new THREE.CatmullRomCurve3(pts).getPoints(160);
}

function StationMarker({ s, active }: { s: Station; active: boolean }) {
  const ring = useRef<THREE.Mesh>(null!);
  const transfer = s.lines.length > 1;
  const base = LINES[s.lines[0]];
  const color = transfer ? "#ffffff" : base.color;

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime % 1.8) / 1.8;
    ring.current.scale.setScalar(1 + t * 2.2);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.6;
  });

  return (
    <group>
      {s.lines.length > 1 &&
        s.lines.slice(1).map((k) => (
          <Line
            key={k}
            points={[
              [s.x, base.y, base.z],
              [s.x, LINES[k].y, LINES[k].z],
            ]}
            color="#ffffff"
            lineWidth={2}
            transparent
            opacity={0.5}
          />
        ))}
      {s.lines.map((k) => (
        <mesh key={k} position={[s.x, LINES[k].y, LINES[k].z]}>
          <sphereGeometry args={[k === s.lines[0] ? (transfer || s.kind === "company" ? 0.2 : 0.13) : 0.1, 24, 24]} />
          <meshStandardMaterial
            color={k === s.lines[0] ? color : LINES[k].color}
            emissive={active ? color : "#000000"}
            emissiveIntensity={active ? 0.6 : 0}
            roughness={0.3}
          />
        </mesh>
      ))}
      {s.current && (
        <mesh ref={ring} position={[s.x, base.y, base.z]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.24, 0.3, 48]} />
          <meshBasicMaterial color="#00a84d" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
      <Html position={[s.x, base.y + (s.kind === "company" ? 0.55 : -0.5), base.z]} center zIndexRange={[10, 0]}>
        <div
          style={{
            whiteSpace: "nowrap",
            fontSize: s.kind === "company" ? 14 : 12,
            fontWeight: s.kind === "company" ? 700 : 500,
            color: active ? "#ffffff" : "rgba(255,255,255,.55)",
            transform: `scale(${active ? 1.15 : 1})`,
            transition: "all .25s",
            textShadow: "0 2px 8px rgba(0,0,0,.8)",
            pointerEvents: "none",
          }}
        >
          {s.name}
        </div>
      </Html>
    </group>
  );
}

function SubwayMap({ activeIndex }: { activeIndex: number }) {
  const curves = useMemo(
    () => (Object.keys(LINES) as LineKey[]).map((k) => ({ key: k, pts: linePoints(k) })),
    [],
  );
  return (
    <group position={[0, -0.3, 0]}>
      {curves.map(({ key, pts }) => (
        <Line key={key} points={pts} color={LINES[key].color} lineWidth={key === "android" ? 7 : 5} />
      ))}
      {STATIONS.map((s, i) => (
        <StationMarker key={s.name} s={s} active={i === activeIndex} />
      ))}
      {/* year ticks */}
      {Array.from({ length: 12 }, (_, i) => 2015 + i).map((y) => {
        const x = STATIONS.find((s) => Math.floor(s.year) === y)?.x;
        if (x === undefined) return null;
        return (
          <Html key={y} position={[x, -1.9, 0]} center zIndexRange={[5, 0]}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontVariantNumeric: "tabular-nums", pointerEvents: "none" }}>{y}</div>
          </Html>
        );
      })}
    </group>
  );
}

/* ---------------- Camera rig ---------------- */

function Rig({ mode, progress }: { mode: Mode; progress: number }) {
  const { camera } = useThree();
  const look = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 3.5);
    if (mode === "home") {
      targetPos.set(0, 0.2, 6.5);
      targetLook.set(0, 0, 0);
    } else {
      const tx = MAP_MIN_X + (MAP_MAX_X - MAP_MIN_X) * progress;
      targetPos.set(tx + 0.6, 1.6, 6.2);
      targetLook.set(tx, -0.3, 0);
    }
    camera.position.lerp(targetPos, k);
    look.lerp(targetLook, k);
    camera.lookAt(look);
  });
  return null;
}

/* ---------------- Root ---------------- */

export default function LabScene() {
  const [mode, setMode] = useState<Mode>("home");
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (mode !== "map") return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setProgress((p) => Math.min(1, Math.max(0, p + (e.deltaY + e.deltaX) * 0.0007)));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("home");
      if (e.key === "ArrowRight") setProgress((p) => Math.min(1, p + 0.05));
      if (e.key === "ArrowLeft") setProgress((p) => Math.max(0, p - 0.05));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "map") {
      setActive(-1);
      return;
    }
    const tx = MAP_MIN_X + (MAP_MAX_X - MAP_MIN_X) * progress;
    let best = -1;
    let bestD = Infinity;
    STATIONS.forEach((s, i) => {
      const d = Math.abs(s.x - tx);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(bestD < 0.9 ? best : -1);
  }, [mode, progress]);

  const onApp = (a: AppAction) => {
    if (a === "map") {
      setProgress(0);
      setMode("map");
    } else if (a === "guestbook") {
      window.location.href = "/guestbook";
    } else {
      window.location.href = "/";
    }
  };

  const station = active >= 0 ? STATIONS[active] : null;

  return (
    <div className="fixed inset-0 bg-[#0b0d12] text-white select-none">
      <Canvas camera={{ position: [0, 0.2, 6.5], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={["#0b0d12"]} />
        <fog attach="fog" args={["#0b0d12", 12, 30]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 6]} intensity={2.2} />
        <directionalLight position={[-6, -2, 4]} intensity={0.6} color="#7aa2f7" />
        <Stars radius={60} depth={40} count={1800} factor={3} fade speed={0.4} />
        <Phone mode={mode} onApp={onApp} />
        {mode === "map" && <SubwayMap activeIndex={active} />}
        <ContactShadows position={[0, -2.2, 0]} opacity={0.5} blur={2.5} scale={30} far={4} />
        <Rig mode={mode} progress={progress} />
      </Canvas>

      {/* overlay UI */}
      <div className="pointer-events-none absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-semibold tracking-tight">{profile.name} · Lab</div>
            <div className="text-xs text-white/40 mt-1">Three.js 프로토타입 · 폰 런처 + 경력 노선도</div>
          </div>
          <Link href="/" className="pointer-events-auto text-xs text-white/60 hover:text-white underline underline-offset-4">
            일반 포트폴리오로 →
          </Link>
        </div>

        {mode === "home" ? (
          <div className="text-center text-xs text-white/40">마우스를 움직여 기기를 기울이고, 화면의 앱을 눌러보세요</div>
        ) : (
          <div className="flex items-end justify-between gap-6">
            <div className="pointer-events-auto flex flex-col gap-3 max-w-md">
              <button
                onClick={() => setMode("home")}
                className="self-start text-xs text-white/60 hover:text-white flex items-center gap-2"
              >
                ← 홈으로 (Esc)
              </button>
              <div
                className="rounded-2xl bg-white/[0.06] backdrop-blur border border-white/10 p-5 transition-opacity duration-300"
                style={{ opacity: station ? 1 : 0.35 }}
              >
                {station ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      {station.lines.map((k) => (
                        <span key={k} className="w-2.5 h-2.5 rounded-full" style={{ background: LINES[k].color }} />
                      ))}
                      <span className="text-[11px] text-white/50">
                        {station.kind === "company" ? "회사" : "프로젝트"} · {Math.floor(station.year)}
                        {station.current ? " · 현재" : ""}
                      </span>
                    </div>
                    <div className="text-lg font-semibold">{station.name}</div>
                    {station.desc && <p className="text-sm text-white/65 mt-1 leading-relaxed">{station.desc}</p>}
                  </>
                ) : (
                  <div className="text-sm text-white/50">스크롤하면 노선을 따라 이동합니다</div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 text-xs text-white/40">
              <div className="flex gap-4">
                {(Object.keys(LINES) as LineKey[]).map((k) => (
                  <span key={k} className="flex items-center gap-1.5">
                    <span className="w-4 h-1.5 rounded-full" style={{ background: LINES[k].color }} />
                    {LINES[k].label}
                  </span>
                ))}
              </div>
              <div className="w-64 h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-white/70 transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
              </div>
              <div>2015 → 2026 · 스크롤 / ← →</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
