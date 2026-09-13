"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

const EASE = "cubic-bezier(.2,.7,.1,1)";

/** Fade/slide in when scrolled into view. direction mimics the template's fadeIn("left"|"right"|"up"). */
export function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const off = from === "up" ? "translateY(40px)" : from === "left" ? "translateX(-60px)" : "translateX(60px)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : off,
        transition: `opacity 1s ${EASE} ${delay}ms, transform 1s ${EASE} ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/** react-tilt style 3D tilt with a glare. */
export function Tilt({ children, className = "", max = 12, scale = 1.03 }: { children: ReactNode; className?: string; max?: number; scale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg) scale(${scale})`;
    el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => {
    ref.current!.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative will-change-transform ${className}`}
      style={{ transition: `transform .4s ${EASE}`, transformStyle: "preserve-3d" }}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(520px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,.55), transparent 60%)" }}
      />
    </div>
  );
}

/** Section heading pair like the template's <p>sub</p><h2>Title.</h2> */
export function SectionHead({ sub, title }: { sub: string; title: string }) {
  return (
    <div>
      <p className="text-[14px] font-medium uppercase tracking-[.14em] text-[#7a7690]">{sub}</p>
      <h2 className="mt-2 text-[40px] font-black tracking-[-0.03em] text-[#1c1b2e] sm:text-[56px]">{title}</h2>
    </div>
  );
}
