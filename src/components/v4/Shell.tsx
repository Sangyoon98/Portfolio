"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Shared chrome for the v4 concept: light lavender ground, dark ink, violet accent. */

export const V4 = {
  font: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Pretendard, "Noto Sans KR", "Segoe UI", sans-serif',
  section: "mx-auto max-w-[1180px] px-6 sm:px-10",
  card: "rounded-[22px] bg-white shadow-[0_24px_60px_-36px_rgba(60,50,120,.45)]",
  input:
    "w-full rounded-xl bg-[#f3f2fa] px-5 py-3.5 text-[15px] outline-none ring-[#7c5cff] placeholder:text-[#a2a0b3] focus:ring-2 transition-shadow",
  btn: "inline-flex items-center justify-center gap-2 rounded-full bg-[#1c1b2e] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#7c5cff] disabled:opacity-50 disabled:cursor-not-allowed",
  btnGhost:
    "inline-flex items-center justify-center gap-2 rounded-full border border-[#1c1b2e]/15 bg-white px-5 py-2.5 text-[14px] font-medium text-[#1c1b2e] transition-colors hover:border-[#1c1b2e] disabled:opacity-50 disabled:cursor-not-allowed",
  pill: "inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold",
  eyebrow: "text-[13px] font-semibold uppercase tracking-[.14em] text-[#7a7690]",
};

export function V4Nav({ back }: { back?: { href: string; label: string } }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#f6f6fb]/75 backdrop-blur-xl">
      <nav className={`${V4.section} flex h-16 items-center justify-between`}>
        <Link href="/" className="flex items-center gap-3 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1c1b2e] text-sm text-white">채</span>
          채상윤 <span className="hidden font-medium text-[#7a7690] sm:inline">| Android Developer</span>
        </Link>
        <div className="flex items-center gap-8 text-[15px] text-[#7a7690]">
          <div className="hidden gap-8 sm:flex">
            <Link href="/#about" className="hover:text-[#1c1b2e]">소개</Link>
            <Link href="/#work" className="hover:text-[#1c1b2e]">경력</Link>
            <Link href="/#skills" className="hover:text-[#1c1b2e]">기술</Link>
            <Link href="/#projects" className="hover:text-[#1c1b2e]">프로젝트</Link>
            <Link href="/guestbook" className="hover:text-[#1c1b2e]">방명록</Link>
          </div>
          {back && (
            <Link href={back.href} className="rounded-full bg-[#1c1b2e] px-3.5 py-1.5 text-[13px] text-white transition-colors hover:bg-[#7c5cff]">
              ← {back.label}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export function V4Shell({ children, back }: { children: ReactNode; back?: { href: string; label: string } }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f6f6fb] text-[#1c1b2e] antialiased" style={{ fontFamily: V4.font, letterSpacing: "-0.01em" }}>
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#dcd2ff] opacity-70 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-[40vh] h-[480px] w-[480px] rounded-full bg-[#ffd6e6] opacity-60 blur-[120px]" />
      <V4Nav back={back} />
      <main className={`${V4.section} relative pb-24 pt-28`}>{children}</main>
      <footer className={`${V4.section} pb-10 text-center text-[13px] text-[#7a7690]`}>© 2026 채상윤</footer>
    </div>
  );
}

export function V4Head({ sub, title, children }: { sub: string; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className={V4.eyebrow}>{sub}</p>
      <h1 className="break-keep text-[40px] font-black leading-[1.08] tracking-[-0.03em] sm:text-[56px]">{title}</h1>
      {children}
    </div>
  );
}
