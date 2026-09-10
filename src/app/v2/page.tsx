"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { awards, career, certifications, education, profile, projects, skills } from "@/data/portfolio";
import { CountUp, Magnetic, Reveal, Spotlight, Tilt, Words, lerp, useScrollProgress } from "@/components/v2/fx";

const FONT =
  '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Pretendard, "Noto Sans KR", "Segoe UI", sans-serif';

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform duration-300 group-hover:translate-x-0.5">
    <path d="m9 5 7 7-7 7" />
  </svg>
);

function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-1 text-[17px] font-medium ${dark ? "text-[#7d7aff]" : "text-[#5856d6]"} hover:underline underline-offset-4`}>
      {children}
      <Arrow />
    </Link>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`text-[13px] font-semibold tracking-wide ${dark ? "text-[#86868b]" : "text-[#6e6e73]"}`}>{children}</div>;
}

/* ---------- Scroll-zoom hero card ---------- */

function HeroCard() {
  const { ref, p } = useScrollProgress<HTMLDivElement>();
  const scale = lerp(0.78, 1, Math.min(1, p / 0.6));
  const radius = lerp(56, 28, Math.min(1, p / 0.6));
  const imgY = lerp(40, -40, p);
  const textO = Math.min(1, Math.max(0, (p - 0.35) / 0.3));
  const featured = projects[0];

  return (
    <div ref={ref} className="relative h-[190vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <div
          className="relative grid w-full max-w-[1200px] grid-cols-1 overflow-hidden bg-black text-[#f5f5f7] md:h-[560px] md:grid-cols-2"
          style={{ transform: `scale(${scale})`, borderRadius: radius, willChange: "transform", boxShadow: "0 60px 120px -50px rgba(0,0,0,.45)" }}
        >
          <div className="flex flex-col justify-between gap-10 p-8 md:p-16">
            <div className="flex items-center gap-2.5 text-sm text-[#86868b]">
              <span className="h-2 w-2 rounded-full bg-[#30d158] shadow-[0_0_0_4px_rgba(48,209,88,.2)]" />
              지금은 {career[0].company.replace("(주)", "")}에서 일하고 있습니다
            </div>
            <div className="flex flex-col gap-4" style={{ opacity: textO, transform: `translateY(${(1 - textO) * 16}px)`, transition: "opacity .2s, transform .2s" }}>
              <Eyebrow dark>Now · {career[0].period.replace(" ~ 재직중", " —")}</Eyebrow>
              <div className="text-3xl font-bold leading-[1.15] tracking-[-0.03em] md:text-[40px]">
                {featured.title}
                <br />
                Android 앱을 만듭니다.
              </div>
              <p className="max-w-[440px] text-[17px] leading-relaxed text-[#86868b]">{featured.description}</p>
              <TextLink href="/projects/megastudy-smart-learning" dark>
                자세히 보기
              </TextLink>
            </div>
          </div>
          <div className="relative h-[320px] md:h-auto">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="600px"
              priority
              className="object-cover"
              style={{ transform: `translateY(${imgY}px) scale(1.12)`, willChange: "transform" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0)_45%)] max-md:bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0)_45%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function V2Page() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const android = skills.find((s) => s.category === "Android")?.items ?? [];
  const chips = [...android.filter((s) => s.level === "expert").slice(0, 4), ...android.filter((s) => s.level !== "expert").slice(0, 3)];
  const others = skills.filter((s) => s.category !== "Android").flatMap((s) => s.items).filter((s) => s.level === "proficient").slice(0, 3);
  const totalSkills = skills.reduce((n, c) => n + c.items.length, 0);
  const firstYear = Math.min(...projects.map((p) => parseInt(p.period?.slice(0, 4) ?? "9999", 10)).filter(Number.isFinite));

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] tracking-[-0.01em] antialiased" style={{ fontFamily: FONT }}>
      <style>{`
        @keyframes v2-word { from { opacity: 0; transform: translateY(110%); filter: blur(8px); } to { opacity: 1; transform: none; filter: blur(0); } }
        @keyframes v2-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .v2-card { background:#fff; border-radius:28px; transition: transform .5s cubic-bezier(.2,.7,.1,1), box-shadow .5s; }
        .v2-card:hover { transform: translateY(-4px); box-shadow: 0 30px 60px -30px rgba(0,0,0,.2); }
      `}</style>

      {/* Nav */}
      <header className={`fixed inset-x-0 top-0 z-50 h-12 backdrop-blur-xl transition-colors duration-300 ${scrolled ? "bg-[rgba(251,251,253,.82)] border-b border-black/[.06]" : "bg-transparent"}`}>
        <nav className="mx-auto flex h-full max-w-[980px] items-center justify-between px-6 text-xs">
          <Link href="/v2" className="text-[15px] font-bold tracking-tight">Sangyoon</Link>
          <div className="hidden gap-9 text-black/80 md:flex">
            <a href="#glance" className="hover:text-black">한눈에</a>
            <a href="#projects" className="hover:text-black">프로젝트</a>
            <Link href="/guestbook" className="hover:text-black">Crew Talk</Link>
            <Link href="/" className="hover:text-black">v1</Link>
          </div>
          <Magnetic>
            <a href={`mailto:${profile.contact.email}`} className="rounded-full bg-[#1d1d1f] px-3.5 py-1.5 text-white transition-colors hover:bg-[#5856d6]">연락하기</a>
          </Magnetic>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-6 pt-36 pb-6 text-center">
        <div className="text-[13px] font-semibold text-[#6e6e73]" style={{ animation: "v2-fade .8s ease both" }}>Android Developer · {profile.location}</div>
        <h1 className="max-w-[1000px] text-[44px] font-bold leading-[1.06] tracking-[-0.04em] md:text-[80px]">
          <Words text="모바일로 연결하고," />
          <br />
          <Words text="사용자 경험으로 완성합니다." step={70} />
        </h1>
        <p className="max-w-[680px] text-lg leading-snug text-[#6e6e73] md:text-2xl" style={{ animation: "v2-fade .9s ease .5s both" }}>
          안드로이드 실무 경험을 기반으로 안정적이고 완성도 높은 서비스를 만드는 {profile.name}입니다.
        </p>
        <div className="mt-1 flex gap-8" style={{ animation: "v2-fade .9s ease .7s both" }}>
          <TextLink href="#projects">프로젝트 보기</TextLink>
          <TextLink href="#glance">한눈에 보기</TextLink>
        </div>
        <div className="mt-6 text-xs text-[#86868b]" style={{ animation: "v2-fade 1s ease 1.4s both" }}>스크롤 ↓</div>
      </section>

      <HeroCard />

      {/* Bento */}
      <section id="glance" className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pb-32 pt-8">
        <Reveal className="flex items-end justify-between">
          <h2 className="text-4xl font-bold tracking-[-0.03em] md:text-5xl">한눈에 보기.</h2>
          <span className="hidden text-[17px] text-[#6e6e73] md:block">카드 위에서 커서를 움직여보세요.</span>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[200px]">
          <Reveal className="md:col-span-7 md:row-span-2" delay={0}>
            <Spotlight className="v2-card flex h-full flex-col justify-between overflow-hidden p-9">
              <Eyebrow>경력</Eyebrow>
              <div>
                {career.map((c) => (
                  <div key={c.company} className="grid grid-cols-1 gap-1 border-t border-black/[.08] py-4 md:grid-cols-[200px_1fr] md:gap-5">
                    <div className="text-[15px] font-semibold text-[#6e6e73]" style={{ fontVariantNumeric: "tabular-nums" }}>{c.period.replace(" ~ 재직중", " — 현재").replace(/ \(.*\)/, "").replace(" ~ ", " — ")}</div>
                    <div>
                      <div className="text-xl font-bold">{c.company}</div>
                      <div className="mt-1 text-[15px] text-[#6e6e73]">{c.type}</div>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-1 gap-1 border-t border-black/[.08] py-4 md:grid-cols-[200px_1fr] md:gap-5">
                  <div className="text-[15px] font-semibold text-[#6e6e73]" style={{ fontVariantNumeric: "tabular-nums" }}>{education[0].period.replace(" ~ ", " — ").replace(" (졸업)", "")}</div>
                  <div>
                    <div className="text-xl font-bold">{education[0].school}</div>
                    <div className="mt-1 text-[15px] text-[#6e6e73]">{education[0].major} · {education[0].doubleMajor} 복수전공 · {education[0].gpa}</div>
                  </div>
                </div>
              </div>
            </Spotlight>
          </Reveal>

          <Reveal className="md:col-span-5" delay={80}>
            <Spotlight className="v2-card flex h-full items-end justify-between overflow-hidden p-9">
              <div>
                <Eyebrow>Android 개발 시작</Eyebrow>
                <div className="mt-3 text-[64px] font-extrabold leading-none tracking-[-0.04em]">
                  <CountUp to={firstYear} />
                </div>
              </div>
              <div className="text-right text-[15px] leading-snug text-[#6e6e73]">고교 앱 출시부터<br />실무 {career.length}개 회사까지</div>
            </Spotlight>
          </Reveal>

          <Reveal className="md:col-span-5" delay={160}>
            <Spotlight className="v2-card flex h-full items-end justify-between overflow-hidden p-9">
              <div>
                <Eyebrow>출시 프로젝트</Eyebrow>
                <div className="mt-3 text-[64px] font-extrabold leading-none tracking-[-0.04em]">
                  <CountUp to={projects.length} />
                </div>
              </div>
              <div className="text-right text-[15px] leading-snug text-[#6e6e73]">Android · iOS · Web<br />전 플랫폼</div>
            </Spotlight>
          </Reveal>

          <Reveal className="md:col-span-8" delay={240}>
            <Spotlight className="v2-card flex h-full flex-col justify-between gap-5 overflow-hidden p-9">
              <Eyebrow>스킬</Eyebrow>
              <div className="flex flex-wrap gap-2">
                {chips.map((s) => (
                  <span key={s.name} className={`rounded-full px-3.5 py-2 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5 ${s.level === "expert" ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7]"}`}>{s.name}</span>
                ))}
                {others.map((s) => (
                  <span key={s.name} className="rounded-full bg-[#f5f5f7] px-3.5 py-2 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5">{s.name}</span>
                ))}
                <span className="rounded-full bg-[#f5f5f7] px-3.5 py-2 text-sm font-medium text-[#6e6e73]">+{totalSkills - chips.length - others.length}</span>
              </div>
            </Spotlight>
          </Reveal>

          <Reveal className="md:col-span-4" delay={320}>
            <Spotlight className="v2-card flex h-full flex-col justify-between gap-4 overflow-hidden p-9">
              <Eyebrow>수상 · 자격</Eyebrow>
              <div className="flex flex-col gap-1.5 text-[15px]">
                {awards.slice(0, 2).map((a) => (
                  <div key={a.competition} className="truncate">{a.competition.replace(/^\d{4} /, "").split(" ").slice(0, 3).join(" ")} <span className="text-[#6e6e73]">{a.prize}</span></div>
                ))}
                <div>{certifications[0].name} <span className="text-[#6e6e73]">{certifications[0].date.slice(0, 4)}</span></div>
              </div>
            </Spotlight>
          </Reveal>

          <Reveal className="md:col-span-6" delay={400}>
            <Spotlight className="v2-card flex h-full flex-col justify-between gap-3 overflow-hidden p-9">
              <div className="flex items-center justify-between">
                <Eyebrow>Crew Talk</Eyebrow>
                <TextLink href="/guestbook">글 남기기</TextLink>
              </div>
              <div className="text-[22px] font-medium leading-snug">함께 일했던 분들의 한마디를 남겨주세요.</div>
              <div className="text-sm text-[#6e6e73]">동료 · 팀원 · 멘티 누구든 환영합니다</div>
            </Spotlight>
          </Reveal>

          <Reveal className="md:col-span-6" delay={480}>
            <Spotlight className="v2-card flex h-full flex-col justify-between gap-3 overflow-hidden p-9">
              <Eyebrow>연락</Eyebrow>
              <div className="flex flex-col gap-2 text-[17px]">
                <a href={`mailto:${profile.contact.email}`} className="flex justify-between hover:text-[#5856d6]"><span>{profile.contact.email}</span><span className="text-[#6e6e73]">Mail</span></a>
                <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="flex justify-between hover:text-[#5856d6]"><span>{profile.contact.github?.replace("https://", "")}</span><span className="text-[#6e6e73]">GitHub</span></a>
                <a href={profile.contact.blog} target="_blank" rel="noopener noreferrer" className="flex justify-between hover:text-[#5856d6]"><span>{profile.contact.blog?.replace("https://", "").replace(/\/$/, "")}</span><span className="text-[#6e6e73]">Blog</span></a>
              </div>
            </Spotlight>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pb-32">
        <Reveal className="flex items-end justify-between">
          <h2 className="text-4xl font-bold tracking-[-0.03em] md:text-5xl">프로젝트.</h2>
          <TextLink href="/#projects">{projects.length}개 전체 보기</TextLink>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal className="md:col-span-2">
            <Tilt href="/projects/megastudy-smart-learning" max={4} className="flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[28px] bg-black p-10 text-[#f5f5f7] md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <Eyebrow dark>2026 · Android · 재직 중</Eyebrow>
                  <div className="mt-2.5 text-3xl font-bold tracking-[-0.03em] md:text-[40px]">{projects[0].title}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {projects[0].tech?.slice(1, 4).map((t) => (
                    <span key={t} className="rounded-full bg-white/[.12] px-3.5 py-2 text-sm font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <p className="max-w-[560px] text-[17px] leading-relaxed text-[#86868b]">{projects[0].description}</p>
              <div className="-mb-12 mt-6 h-[220px] w-full max-w-[760px] self-center rounded-t-[20px] border border-b-0 border-white/10 bg-[#1c1c1e] transition-transform duration-700 group-hover:-translate-y-2" />
            </Tilt>
          </Reveal>
          {projects.slice(1, 5).map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100}>
              <Tilt href={p.links?.find((l) => l.label.includes("상세"))?.href ?? "/#projects"} className="flex min-h-[300px] flex-col justify-between rounded-[28px] bg-white p-10">
                <div>
                  <Eyebrow>{p.period?.slice(0, 4)} · {p.role}</Eyebrow>
                  <div className="mt-2 text-[28px] font-bold tracking-[-0.03em]">{p.title}</div>
                </div>
                <p className="text-base leading-relaxed text-[#6e6e73]">{p.description}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/[.08] py-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 text-xs text-[#6e6e73] md:flex-row md:justify-between">
          <span>© 2026 {profile.name} · Built with Next.js</span>
          <div className="flex gap-6">
            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-black">GitHub</a>
            <a href={profile.contact.blog} target="_blank" rel="noopener noreferrer" className="hover:text-black">Blog</a>
            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
