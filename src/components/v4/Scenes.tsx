"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

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
