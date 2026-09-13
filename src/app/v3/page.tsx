"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { activities, awards, career, certifications, profile, projects } from "@/data/portfolio";
import { slugMap } from "@/components/ProjectsSection";

const Toy = dynamic(() => import("@/components/v3/Toy"), {
  ssr: false,
  loading: () => <div className="h-[300px] sm:h-[340px] rounded-xl bg-neutral-900/[.04] dark:bg-white/[.04]" />,
});

const EASE = "cubic-bezier(.2,.8,.2,1)";

/* ---------- small pieces ---------- */

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("theme"); } catch {}
    const d = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = useCallback(() => {
    setDark((d) => {
      const n = !d;
      document.documentElement.classList.toggle("dark", n);
      try { localStorage.setItem("theme", n ? "dark" : "light"); } catch {}
      return n;
    });
  }, []);
  return { dark, toggle };
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Seoul" }));
    f();
    const id = setInterval(f, 1000 * 20);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link group inline-flex items-center gap-1">
      {children}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M7 17 17 7M8 7h9v9" /></svg>
    </a>
  );
}

function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setDone(true); setTimeout(() => setDone(false), 1600); } catch { location.href = `mailto:${email}`; }
  };
  return (
    <button onClick={copy} className="link relative inline-flex items-center gap-2 text-left" aria-live="polite">
      <span className="transition-opacity duration-300" style={{ opacity: done ? 0.35 : 1 }}>{email}</span>
      <span className="text-[12px] text-neutral-500 dark:text-neutral-400 transition-all duration-300" style={{ opacity: done ? 1 : 0, transform: done ? "none" : "translateY(3px)", transitionTimingFunction: EASE }}>복사됨</span>
    </button>
  );
}

/* ---------- project list with keyboard nav + cursor preview ---------- */

function ProjectList() {
  const list = projects.filter((p) => p.period);
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const reduce = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const tick = () => {
      const el = preview.current;
      if (el) {
        cur.current.x += (target.current.x - cur.current.x) * (reduce ? 1 : 0.18);
        cur.current.y += (target.current.y - cur.current.y) * (reduce ? 1 : 0.18);
        el.style.transform = `translate(${cur.current.x + 18}px, ${cur.current.y - 90}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce]);

  const onMove = (e: React.MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };
  const onKey = (e: React.KeyboardEvent<HTMLAnchorElement>, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const n = e.key === "ArrowDown" ? Math.min(list.length - 1, i + 1) : Math.max(0, i - 1);
    (e.currentTarget.parentElement?.parentElement?.children[n]?.querySelector("a") as HTMLElement | null)?.focus();
  };
  const p = active !== null ? list[active] : null;

  return (
    <div onMouseMove={onMove}>
      <ol className="-mx-3">
        {list.map((pr, i) => {
          const slug = slugMap[pr.title];
          const year = pr.period?.slice(0, 4);
          const on = active === i;
          return (
            <li key={pr.title}>
              <Link
                href={slug ? `/projects/${slug}` : "/#projects"}
                onMouseEnter={() => { setActive(i); const r = preview.current; if (r) { cur.current = { ...target.current }; } }}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(null)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex items-baseline gap-4 rounded-lg px-3 py-2.5 outline-none transition-colors duration-200 hover:bg-neutral-900/[.04] focus-visible:bg-neutral-900/[.06] dark:hover:bg-white/[.05] dark:focus-visible:bg-white/[.08]"
                style={{ transitionTimingFunction: EASE }}
              >
                <span className="flex-1 min-w-0 truncate transition-transform duration-300 group-hover:translate-x-1" style={{ transitionTimingFunction: EASE }}>{pr.title}</span>
                <span className="hidden sm:block text-[13px] text-neutral-500 dark:text-neutral-400 truncate max-w-[42%]" style={{ opacity: on ? 1 : 0.7 }}>{pr.role?.replace(" Developer", "").replace(" 개발", "")}</span>
                <span className="tabular-nums text-[13px] text-neutral-500 dark:text-neutral-400">{year}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      {/* cursor-following preview */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden sm:block"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-[260px] rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-[0_30px_60px_-24px_rgba(0,0,0,.35)] ring-1 ring-black/10 dark:ring-white/10 transition-all duration-300"
          style={{ opacity: p?.image ? 1 : 0, transform: p?.image ? "scale(1) rotate(-1.5deg)" : "scale(.92) rotate(0deg)", transitionTimingFunction: EASE }}
        >
          {p?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt="" className="block w-full h-[150px] object-cover bg-neutral-100 dark:bg-neutral-800" />
          )}
          {p && <div className="px-3 py-2 text-[12px] leading-snug text-neutral-600 dark:text-neutral-300 line-clamp-2">{p.description}</div>}
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function V3Page() {
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111113] dark:bg-[#0e0e10] dark:text-[#f4f4f5] antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Pretendard, "Noto Sans KR", "Segoe UI", sans-serif', letterSpacing: "-0.011em" }}>
      <style>{`
        .link { position: relative; color: inherit; text-decoration: none; }
        .link::after { content: ""; position: absolute; left: 0; right: 0; bottom: -2px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform .35s ${EASE}; }
        .link:hover::after, .link:focus-visible::after { transform: scaleX(1); transform-origin: left; }
        .link:focus-visible { outline: none; }
        h2 { font-size: 13px; font-weight: 500; color: #8a8a90; letter-spacing: .01em; margin: 0 0 14px; }
        .dark h2 { color: #8f8f96; }
        @keyframes in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .in { animation: in .7s ${EASE} both; }
        @media (prefers-reduced-motion: reduce) { .in { animation: none; } .link::after { transition: none; } }
      `}</style>

      <main className="mx-auto max-w-[640px] px-6 pt-16 pb-24 flex flex-col gap-14 text-[15px] leading-relaxed">

        {/* header */}
        <header className="in flex items-start justify-between gap-6" style={{ animationDelay: "0ms" }}>
          <div className="flex flex-col gap-1">
            <div className="text-[17px] font-semibold tracking-tight">{profile.name}</div>
            <div className="text-neutral-500 dark:text-neutral-400">Android Developer · {career[0].company.replace("(주)", "")}</div>
          </div>
          <div className="flex items-center gap-3 text-[13px] text-neutral-500 dark:text-neutral-400">
            <span>서울 <Clock /></span>
            <button onClick={toggle} aria-label="테마 전환" className="grid h-8 w-8 place-items-center rounded-full hover:bg-neutral-900/[.06] dark:hover:bg-white/[.08] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ transition: `transform .6s ${EASE}`, transform: dark ? "rotate(180deg)" : "rotate(0deg)" }}>
                {dark ? <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
              </svg>
            </button>
          </div>
        </header>

        {/* toy */}
        <section className="in" style={{ animationDelay: "80ms" }}>
          <Toy dark={dark} />
        </section>

        {/* intro */}
        <section className="in flex flex-col gap-4" style={{ animationDelay: "160ms" }}>
          <p className="text-[19px] leading-snug tracking-tight font-medium" style={{ textWrap: "pretty" }}>
            모바일로 연결하고, 사용자 경험으로 완성합니다.
          </p>
          <p className="text-neutral-600 dark:text-neutral-300" style={{ textWrap: "pretty" }}>
            안드로이드 실무 경험을 기반으로 안정적이고 완성도 높은 서비스를 만듭니다. 화면 하나보다 서비스 전체를 이해하는 시야를 중요하게 생각하고, 문제는 끝까지 파고듭니다. 지금은 메가스터디 스마트러닝 Android 앱에서 북마크·재생 정책·GA4를 정리했고, 마이페이지를 Compose + MVI로 새로 짓고 있습니다.
          </p>
        </section>

        {/* career */}
        <section className="in" style={{ animationDelay: "240ms" }}>
          <h2>경력</h2>
          <ul className="flex flex-col gap-3">
            {career.map((c) => (
              <li key={c.company} className="grid grid-cols-[112px_1fr] gap-4 items-baseline">
                <span className="tabular-nums text-[13px] text-neutral-500 dark:text-neutral-400">{c.period.replace(" ~ 재직중", " — ").replace(/ \(.*\)/, "").replace(" ~ ", " — ")}</span>
                <div>
                  <div>{c.company} <span className="text-neutral-500 dark:text-neutral-400">· {c.type}</span></div>
                  {c.projects[0] && <div className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">{c.projects.length > 1 ? `${c.projects.length}개 프로젝트` : c.projects[0]}</div>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* projects */}
        <section className="in" style={{ animationDelay: "320ms" }}>
          <div className="flex items-baseline justify-between">
            <h2>프로젝트</h2>
            <span className="text-[12px] text-neutral-400 dark:text-neutral-500 hidden sm:block">↑↓ 이동 · Enter 열기</span>
          </div>
          <ProjectList />
        </section>

        {/* activities & awards */}
        <section className="in grid grid-cols-1 sm:grid-cols-2 gap-10" style={{ animationDelay: "400ms" }}>
          <div>
            <h2>활동</h2>
            <ul className="flex flex-col gap-2 text-[14px]">
              {activities.slice(0, 4).map((a) => (
                <li key={a.title} className="flex justify-between gap-3">
                  <span className="truncate">{a.title}</span>
                  <span className="tabular-nums text-[13px] text-neutral-500 dark:text-neutral-400 shrink-0">{a.period?.slice(0, 4)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>수상 · 자격</h2>
            <ul className="flex flex-col gap-2 text-[14px]">
              {awards.map((a) => (
                <li key={a.competition} className="flex justify-between gap-3">
                  <span className="truncate">{a.competition.replace(/^\d{4} /, "")}</span>
                  <span className="text-[13px] text-neutral-500 dark:text-neutral-400 shrink-0">{a.prize}</span>
                </li>
              ))}
              {certifications.slice(0, 1).map((c) => (
                <li key={c.name} className="flex justify-between gap-3">
                  <span className="truncate">{c.name}</span>
                  <span className="tabular-nums text-[13px] text-neutral-500 dark:text-neutral-400 shrink-0">{c.date.slice(0, 4)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* contact */}
        <section className="in" style={{ animationDelay: "480ms" }}>
          <h2>연락</h2>
          <ul className="flex flex-col gap-2">
            <li><CopyEmail email={profile.contact.email!} /></li>
            <li><Ext href={profile.contact.github!}>github.com/sangyoon98</Ext></li>
            <li><Ext href={profile.contact.blog!}>sangyoon98.tistory.com</Ext></li>
            <li><Ext href={profile.contact.linkedin!}>LinkedIn</Ext></li>
            <li><Link href="/guestbook" className="link">Crew Talk 남기기</Link></li>
          </ul>
        </section>

        <footer className="in text-[12px] text-neutral-400 dark:text-neutral-500 flex justify-between" style={{ animationDelay: "560ms" }}>
          <span>© 2026 {profile.name}</span>
          <Link href="/" className="link">이전 버전</Link>
        </footer>
      </main>
    </div>
  );
}
