"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { activities, career, education, profile, projects, skills } from "@/data/portfolio";
import { slugMap } from "@/components/ProjectsSection";
import { Reveal, SectionHead, Tilt } from "@/components/v4/fx";

const ParticlesCanvas = dynamic(() => import("@/components/v4/Scenes").then((m) => m.ParticlesCanvas), { ssr: false });
const DeskCanvas = dynamic(() => import("@/components/v4/Desk").then((m) => m.DeskCanvas), { ssr: false });
import type { Platform } from "@/components/v4/Desk";
const Playground = dynamic(() => import("@/components/v4/Playground"), { ssr: false, loading: () => <div className="h-[380px] sm:h-[460px] rounded-[28px] bg-white/30" /> });
const OrbCanvas = dynamic(() => import("@/components/v4/Scenes").then((m) => m.OrbCanvas), { ssr: false });

const FONT = '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Pretendard, "Noto Sans KR", "Segoe UI", sans-serif';
const PALETTE = ["#cdbfff", "#ffc2d6", "#b8f0e3", "#ffe3a3", "#bfe4ff", "#dcc9ff", "#ffd2bd", "#c9f3d3"];

const SERVICES = [
  { title: "Android 개발", desc: "Kotlin · Compose · MVI · Clean Architecture", icon: "M6 3h12v18H6z M9 20h6" },
  { title: "iOS 개발", desc: "SwiftUI · Alamofire", icon: "M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" },
  { title: "Web · Backend", desc: "React · TypeScript · Spring Boot", icon: "M3 5h18v12H3z M3 21h18" },
  { title: "협업 · 도구", desc: "Git · Figma · Jira · AI 개발 도구", icon: "M12 3l9 5-9 5-9-5 9-5z M3 13l9 5 9-5" },
];

const SECTION = "mx-auto max-w-[1180px] px-6 sm:px-10";

type PKey = Platform["key"];
function platformsOf(role?: string): PKey[] {
  const r = (role ?? "").toLowerCase();
  const out: PKey[] = [];
  if (r.includes("android")) out.push("android");
  if (r.includes("ios")) out.push("ios");
  if (/frontend|backend|fullstack|web/.test(r)) out.push("web");
  return out.length ? out : ["android"];
}
const CAT_COLOR: Record<string, string> = { Android: "#cdbfff", iOS: "#ffc2d6", Web: "#b8f0e3", "Database & Infra": "#ffe3a3", "Collaboration & Tools": "#bfe4ff" };

export default function V4Page() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [filter, setFilter] = useState<"all" | PKey>("all");

  const shipped = useMemo(() => projects.filter((p) => p.period), []);
  const platforms = useMemo<Platform[]>(() => {
    const mk = (key: PKey, label: string, cat: string, color: string): Platform => {
      const list = shipped.filter((p) => platformsOf(p.role).includes(key));
      const years = list.map((p) => parseInt(p.period!.slice(0, 4), 10));
      const stack = (skills.find((s) => s.category === cat)?.items ?? []).filter((s) => s.level !== "familiar").slice(0, key === "web" ? 5 : 5).map((s) => s.name);
      return { key, label, stack, count: list.length, since: String(Math.min(...years)), projects: list.slice(0, key === "android" ? 4 : 3).map((p) => p.title), color };
    };
    return [mk("android", "Android", "Android", "#e6dcff"), mk("ios", "iOS", "iOS", "#ffe0ea"), mk("web", "Web · Backend", "Web", "#d9f5ec")];
  }, [shipped]);
  const visible = filter === "all" ? shipped : shipped.filter((p) => platformsOf(p.role).includes(filter));
  const pick = (key: PKey) => { setFilter(key); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); };

  const QUOTA: Record<string, number> = { Android: 8, iOS: 3, Web: 4, "Database & Infra": 2, "Collaboration & Tools": 3 };
  const cubes = skills.flatMap((c) => c.items.filter((s) => s.level !== "familiar").slice(0, QUOTA[c.category] ?? 0).map((s) => ({ label: s.name, cat: c.category, color: CAT_COLOR[c.category] ?? "#e5e5ef" })));
  const legend = Object.entries(CAT_COLOR).map(([cat, color]) => ({ cat, color }));
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    location.href = `mailto:${profile.contact.email}?subject=${encodeURIComponent("포트폴리오를 보고 연락드립니다")}&body=${body}`;
  };

  const timeline = [
    ...career.map((c) => ({ title: c.company, sub: c.type, period: c.period.replace(" ~ 재직중", " — 현재").replace(/ \(.*\)/, "").replace(" ~ ", " — "), points: c.projects.slice(0, 3), color: "#7c5cff", initial: c.company.replace("(주)", "").slice(0, 1) })),
    { title: activities[0].title, sub: activities[0].org ?? "", period: activities[0].period?.replace(" ~ ", " — ") ?? "", points: ["Android · iOS · Frontend 3개 플랫폼 프로젝트 2건"], color: "#ff8fb1", initial: "현" },
    { title: education[0].school, sub: `${education[0].major} · ${education[0].doubleMajor} 복수전공`, period: education[0].period.replace(" ~ ", " — ").replace(" (졸업)", ""), points: [`GPA ${education[0].gpa}`], color: "#5ee0c7", initial: "강" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f6f6fb] text-[#1c1b2e] antialiased" style={{ fontFamily: FONT, letterSpacing: "-0.01em" }}>
      <ParticlesCanvas />

      {/* soft blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#dcd2ff] blur-[120px] opacity-70" />
      <div aria-hidden className="pointer-events-none absolute top-[40vh] -right-40 h-[480px] w-[480px] rounded-full bg-[#ffd6e6] blur-[120px] opacity-60" />

      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-40 bg-[#f6f6fb]/70 backdrop-blur-xl">
        <nav className={`${SECTION} flex h-16 items-center justify-between`}>
          <Link href="/v4" className="flex items-center gap-3 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1c1b2e] text-white text-sm">채</span>
            채상윤 <span className="hidden text-[#7a7690] font-medium sm:inline">| Android Developer</span>
          </Link>
          <div className="hidden gap-8 text-[15px] text-[#7a7690] sm:flex">
            <a href="#about" className="hover:text-[#1c1b2e]">소개</a>
            <a href="#work" className="hover:text-[#1c1b2e]">경력</a>
            <a href="#skills" className="hover:text-[#1c1b2e]">기술</a>
            <a href="#projects" className="hover:text-[#1c1b2e]">프로젝트</a>
            <a href="#contact" className="hover:text-[#1c1b2e]">연락</a>
          </div>
        </nav>
      </header>

      {/* hero */}
      <section className="relative h-screen min-h-[640px]">
        <div className={`${SECTION} absolute inset-x-0 top-[120px] flex gap-5`}>
          <div className="flex flex-col items-center">
            <span className="h-5 w-5 rounded-full bg-[#7c5cff]" />
            <span className="h-40 w-1 rounded-full sm:h-80" style={{ background: "linear-gradient(#7c5cff, rgba(124,92,255,0))" }} />
          </div>
          <div>
            <h1 className="break-keep text-[40px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[64px] lg:text-[76px]">
              안녕하세요, <span className="text-[#7c5cff]">채상윤</span>입니다
            </h1>
            <p className="mt-4 max-w-[560px] text-[17px] leading-relaxed text-[#3a3750] sm:text-[24px] sm:leading-snug">
              Android가 주력이고, iOS와 웹까지 만듭니다. <br className="hidden sm:block" />
              지금은 메가스터디교육에서 스마트러닝 앱을 개발합니다.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[62vh] sm:h-[70vh]">
          <DeskCanvas platforms={platforms} onSelect={pick} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center text-[13px] text-[#7a7690]"><span className="rounded-full bg-white/80 px-4 py-1.5 backdrop-blur">기기 하나가 플랫폼 하나, 크기가 경험량. 눌러서 그 플랫폼 프로젝트 보기</span></div>
        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <a href="#about" className="flex h-[60px] w-[34px] items-start justify-center rounded-3xl border-2 border-[#1c1b2e]/40 p-2">
            <span className="h-3 w-3 rounded-full bg-[#1c1b2e]/70" style={{ animation: "v4-bounce 1.6s infinite" }} />
          </a>
        </div>
      </section>
      <style>{`
        @keyframes v4-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(22px); } }
        @keyframes v4-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(124,92,255,.35); } 70% { box-shadow: 0 0 0 12px rgba(124,92,255,0); } }
        .tl::before { content:""; position:absolute; left:27px; top:0; bottom:0; width:3px; background:#e4e0f5; }
        @media (min-width:768px) { .tl::before { left:50%; margin-left:-1.5px; } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>

      {/* about */}
      <section id="about" className={`${SECTION} relative pt-24 pb-10`}>
        <Reveal><SectionHead sub="Introduction" title="소개" /></Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-[720px] text-[17px] leading-[1.8] text-[#3a3750]">
            안드로이드 실무 경험을 기반으로 안정적이고 완성도 높은 서비스를 만들어 왔습니다. 웹 프론트엔드, 백엔드, iOS까지 경험하며 서비스 전체를 이해하는 시야를 키웠고, 사용자 친화적인 UI·UX를 고민하는 것을 가장 중요한 가치로 삼습니다. 문제 해결에서는 끝까지 파고드는 집요함을, 협업에서는 원활한 커뮤니케이션을 강점으로 합니다.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} from="up">
              <Tilt className="rounded-[22px] p-[2px]" max={16}>
                <div className="rounded-[20px] p-[2px]" style={{ background: `linear-gradient(135deg, ${PALETTE[i]}, ${PALETTE[(i + 3) % PALETTE.length]})` }}>
                  <div className="flex min-h-[260px] flex-col items-center justify-center gap-5 rounded-[18px] bg-white/90 px-8 py-10 text-center shadow-[0_20px_50px_-30px_rgba(60,50,120,.35)]">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl" style={{ background: PALETTE[i] }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1c1b2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                    </span>
                    <div className="text-[20px] font-bold">{s.title}</div>
                    <div className="text-[14px] text-[#7a7690]">{s.desc}</div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* experience timeline */}
      <section id="work" className={`${SECTION} relative pt-24 pb-10`}>
        <Reveal className="text-center"><SectionHead sub="What I have done so far" title="경력" /></Reveal>
        <div className="tl relative mt-16 flex flex-col gap-10">
          {timeline.map((t, i) => (
            <div key={t.title} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
              <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-[18px] font-bold shadow-[0_10px_30px_-12px_rgba(60,50,120,.4)] md:absolute md:left-1/2 md:-ml-7" style={{ color: t.color, boxShadow: `0 0 0 4px ${t.color}33`, animation: i === 0 ? "v4-pulse 2.4s infinite" : undefined }}>{t.initial}</div>
              <Reveal from={i % 2 ? "right" : "left"} className={`w-full md:w-[calc(50%-48px)] ${i % 2 ? "" : ""}`}>
                <Tilt max={4} scale={1.01} className="rounded-[20px]">
                  <div className="rounded-[20px] bg-white p-7 shadow-[0_24px_60px_-36px_rgba(60,50,120,.45)]" style={{ borderTop: `4px solid ${t.color}` }}>
                    <div className="text-[13px] font-semibold text-[#7a7690]" style={{ fontVariantNumeric: "tabular-nums" }}>{t.period}</div>
                    <div className="mt-2 text-[22px] font-bold">{t.title}</div>
                    <div className="text-[15px] text-[#7a7690]">{t.sub}</div>
                    <ul className="mt-4 flex list-disc flex-col gap-1.5 pl-5 text-[14px] leading-relaxed text-[#3a3750]">
                      {t.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </Tilt>
              </Reveal>
              <div className="hidden md:block md:w-[calc(50%-48px)]" />
            </div>
          ))}
        </div>
      </section>

      {/* skills playground */}
      <section id="skills" className={`${SECTION} relative pt-24 pb-10`}>
        <Reveal><SectionHead sub="Tech stack" title="기술" /></Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-[720px] text-[17px] leading-[1.8] text-[#3a3750]">
            익숙한 도구들을 큐브로 올려두었습니다. 마음대로 잡아 던지고 쌓아보세요. 색은 분야입니다.
          </p>
        </Reveal>
        <div className="mt-10">
          <Playground cubes={cubes} legend={legend} />
        </div>
      </section>

      {/* projects */}
      <section id="projects" className={`${SECTION} relative pt-24 pb-10`}>
        <Reveal><SectionHead sub="My work" title="프로젝트" /></Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-[720px] text-[17px] leading-[1.8] text-[#3a3750]">
            실제 사용자에게 출시한 서비스와 팀 프로젝트입니다. 카드를 누르면 상세 페이지로, 아이콘을 누르면 GitHub 또는 스토어로 이동합니다.
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-2">
          {([["all", "전체"], ["android", "Android"], ["ios", "iOS"], ["web", "Web · Backend"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${filter === k ? "bg-[#1c1b2e] text-white" : "bg-white text-[#3a3750] hover:bg-[#ece9f8]"}`}>
              {l} <span className="opacity-60">{k === "all" ? shipped.length : platforms.find((p) => p.key === k)?.count}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => {
            const slug = slugMap[p.title];
            const gh = p.links?.find((l) => l.label.toLowerCase().includes("github"));
            const store = p.links?.find((l) => l.label.toLowerCase().includes("play"));
            return (
              <Reveal key={p.title} delay={(i % 3) * 120}>
                <Tilt className="rounded-[22px]" max={14}>
                  <div className="relative rounded-[22px] bg-white p-5 shadow-[0_24px_60px_-36px_rgba(60,50,120,.45)]">
                    <Link href={slug ? `/projects/${slug}` : "/#projects"} className="block">
                      <div className="relative h-[210px] w-full overflow-hidden rounded-2xl bg-[#efedf8]">
                        {p.image ? <Image src={p.image} alt={p.title} fill sizes="400px" className="object-cover" /> : <div className="grid h-full place-items-center text-[#7a7690]">{p.title}</div>}
                      </div>
                      <div className="mt-5">
                        <div className="text-[22px] font-bold">{p.title}</div>
                        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-[#7a7690]">{p.description}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-[13px] font-medium">
                        {(p.tech ?? []).slice(0, 3).map((t, k) => <span key={t} style={{ color: ["#7c5cff", "#e0568a", "#1fa88d"][k % 3] }}>#{t.split(" - ")[0].split(",")[0]}</span>)}
                      </div>
                    </Link>
                    <div className="absolute right-8 top-8 z-10 flex gap-2">
                      {gh && <a href={gh.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full bg-[#1c1b2e] text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.7c0 .3.2.6.7.5A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10z" /></svg></a>}
                      {store && <a href={store.href} target="_blank" rel="noopener noreferrer" aria-label="Google Play" className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1c1b2e] shadow"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5c0-.6.3-1.1.8-1.4L13.7 12 3.8 21.9c-.5-.3-.8-.8-.8-1.4zM16.8 15.1 6 21.3l8.5-8.5 2.3 2.3zM20.2 10.8c.3.3.6.7.6 1.2s-.2.9-.6 1.2l-2.3 1.3-2.5-2.5 2.5-2.5 2.3 1.3zM6 2.7l10.8 6.2-2.3 2.3L6 2.7z" /></svg></a>}
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* contact */}
      <section id="contact" className={`${SECTION} relative flex flex-col gap-10 pt-24 pb-24 lg:flex-row`}>
        <Reveal from="left" className="flex-[0.75] rounded-[26px] bg-white p-8 shadow-[0_30px_80px_-40px_rgba(60,50,120,.5)]">
          <SectionHead sub="Get in touch" title="연락" />
          <form onSubmit={send} className="mt-8 flex flex-col gap-6">
            <label className="flex flex-col gap-2"><span className="text-[15px] font-medium">이름</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="어떻게 불러드릴까요?" className="rounded-xl bg-[#f3f2fa] px-5 py-4 outline-none ring-[#7c5cff] focus:ring-2" /></label>
            <label className="flex flex-col gap-2"><span className="text-[15px] font-medium">이메일</span><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="답장 받을 주소" className="rounded-xl bg-[#f3f2fa] px-5 py-4 outline-none ring-[#7c5cff] focus:ring-2" /></label>
            <label className="flex flex-col gap-2"><span className="text-[15px] font-medium">메시지</span><textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="어떤 이야기를 하고 싶으신가요?" className="resize-none rounded-xl bg-[#f3f2fa] px-5 py-4 outline-none ring-[#7c5cff] focus:ring-2" /></label>
            <button type="submit" className="self-start rounded-xl bg-[#1c1b2e] px-8 py-3.5 font-bold text-white shadow-[0_16px_40px_-16px_rgba(28,27,46,.6)] transition-colors hover:bg-[#7c5cff]">보내기</button>
          </form>
          <div className="mt-8 flex flex-wrap gap-4 text-[14px] text-[#7a7690]">
            <a href={`mailto:${profile.contact.email}`} className="hover:text-[#1c1b2e]">{profile.contact.email}</a>
            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#1c1b2e]">GitHub</a>
            <a href={profile.contact.blog} target="_blank" rel="noopener noreferrer" className="hover:text-[#1c1b2e]">Blog</a>
            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#1c1b2e]">LinkedIn</a>
            <Link href="/guestbook" className="hover:text-[#1c1b2e]">Crew Talk</Link>
          </div>
        </Reveal>
        <div className="h-[380px] flex-1 lg:h-auto lg:min-h-[560px]">
          <OrbCanvas />
        </div>
      </section>

      <footer className={`${SECTION} pb-10 text-center text-[13px] text-[#7a7690]`}>© 2026 {profile.name} · <Link href="/" className="hover:text-[#1c1b2e]">이전 버전</Link></footer>
    </div>
  );
}
