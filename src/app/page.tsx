import AnimatedSection from "@/components/AnimatedSection";
import { profile, skills, projects, activities } from "@/data/portfolio";
import Image from "next/image";
import RichText from "@/components/RichText";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* 헤더 내비게이션 */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-black/5 dark:border-white/10">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="text-base font-semibold tracking-tight">
            {profile.name}
          </a>
          <div className="flex items-center gap-4">
            <ul className="hidden sm:flex items-center gap-5 text-base">
              <li>
                <a href="#about" className="hover:underline underline-offset-4">
                  소개
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:underline underline-offset-4"
                >
                  스킬
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:underline underline-offset-4"
                >
                  프로젝트
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  className="hover:underline underline-offset-4"
                >
                  교육·활동
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:underline underline-offset-4"
                >
                  연락처
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* 메인 섹션들 */}
      <main id="top" className="w-full">
        {/* 히어로 */}
        <AnimatedSection
          aria-labelledby="hero-title"
          className="relative flex items-center bg-white dark:bg-white/[0.02]"
        >
          {/* Animated gradient background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div
              className="aurora-blob absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-60 dark:opacity-40"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(99,102,241,0.35), transparent 60%), radial-gradient(circle at 70% 30%, rgba(16,185,129,0.35), transparent 55%), radial-gradient(circle at 30% 70%, rgba(244,114,182,0.35), transparent 55%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-28">
            <h1
              id="hero-title"
              className="text-4xl sm:text-6xl font-semibold tracking-tight"
            >
              {profile.tagline}
            </h1>
            <RichText
              text={profile.summary}
              className="mt-4 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-3xl"
            />
          </div>
        </AnimatedSection>

        {/* 소개 */}
        <AnimatedSection
          id="about"
          aria-labelledby="about-title"
          className="bg-white dark:bg-white/[0.02]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <h2
              id="about-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
            >
              소개
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-[220px,1fr] gap-8 items-start">
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-44 max-w-[220px] rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 bg-white/50 dark:bg-white/[0.03]">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={`${profile.name} 프로필 사진`}
                      width={0}
                      height={0}
                      sizes="176px"
                      style={{ width: "100%", height: "auto" }}
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-sm text-black/60 dark:text-white/60">
                      No Image
                    </div>
                  )}
                </div>
              </div>
              <div>
                <RichText
                  text={profile.summary}
                  className="text-base sm:text-lg text-black/80 dark:text-white/80 leading-7 max-w-3xl"
                />
                <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {profile.birthday && (
                    <div>
                      <dt className="text-black/60 dark:text-white/60">
                        생년월일
                      </dt>
                      <dd className="font-medium">{profile.birthday}</dd>
                    </div>
                  )}
                  {profile.contact.email && (
                    <div>
                      <dt className="text-black/60 dark:text-white/60">
                        이메일
                      </dt>
                      <dd className="font-medium">
                        <a
                          href={`mailto:${profile.contact.email}`}
                          className="underline underline-offset-4"
                        >
                          {profile.contact.email}
                        </a>
                      </dd>
                    </div>
                  )}
                  {profile.contact.phone && (
                    <div>
                      <dt className="text-black/60 dark:text-white/60">
                        전화번호
                      </dt>
                      <dd className="font-medium">
                        <a
                          href={`tel:${profile.contact.phone}`}
                          className="underline underline-offset-4"
                        >
                          {profile.contact.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 스킬 */}
        <AnimatedSection
          id="skills"
          aria-labelledby="skills-title"
          className="bg-[#f4f4f5] dark:bg-white/[0.04]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <h2
              id="skills-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
            >
              스킬
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((group) => (
                <div
                  key={group.category}
                  className="rounded-lg border border-black/5 dark:border-white/10 p-4 bg-white/60 dark:bg-white/[0.02]"
                >
                  <h3 className="text-base font-semibold mb-3">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 px-2.5 py-1 text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 프로젝트 */}
        <AnimatedSection
          id="projects"
          aria-labelledby="projects-title"
          className="bg-white dark:bg-white/[0.02]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <h2
              id="projects-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
            >
              프로젝트
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {projects.map((p) => (
                <article
                  key={p.title}
                  className="rounded-lg border border-black/5 dark:border-white/10 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg/10 bg-white/70 dark:bg-white/[0.02]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    {p.period && (
                      <span className="text-xs text-black/60 dark:text-white/60 whitespace-nowrap">
                        {p.period}
                      </span>
                    )}
                  </div>
                  {p.role && (
                    <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                      역할: {p.role}
                    </p>
                  )}
                  <p className="mt-3 text-sm sm:text-base text-black/70 dark:text-white/70">
                    {p.description}
                  </p>
                  {p.tech?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 px-2 py-0.5 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {p.links?.length ? (
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      {p.links.map((l) => (
                        <a
                          key={`${p.title}-${l.label}`}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 교육 및 활동 */}
        <AnimatedSection
          id="education"
          aria-labelledby="education-title"
          className="bg-[#f4f4f5] dark:bg-white/[0.04]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <h2
              id="education-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
            >
              교육 및 활동
            </h2>
            <ul className="mt-6 space-y-4">
              {activities.map((a, idx) => (
                <li
                  key={`${a.title}-${idx}`}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 h-2 w-2 rounded-full bg-black/30 dark:bg-white/40" />
                  <div>
                    <p className="text-base font-medium">{a.title}</p>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      {[a.org, a.period].filter(Boolean).join(" · ")}
                    </p>
                    {a.description && (
                      <p className="text-sm text-black/70 dark:text-white/70 mt-1">
                        {a.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* 연락처 */}
        <AnimatedSection
          id="contact"
          aria-labelledby="contact-title"
          className="bg-white dark:bg-white/[0.02]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <h2
              id="contact-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
            >
              연락처
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {profile.contact.email && (
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="rounded-md border border-black/5 dark:border-white/10 p-4 text-base hover:bg-black/5 dark:hover:bg-white/5"
                >
                  이메일: {profile.contact.email}
                </a>
              )}
              {profile.contact.linkedin && (
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-black/5 dark:border-white/10 p-4 text-base hover:bg-black/5 dark:hover:bg-white/5"
                >
                  LinkedIn: {new URL(profile.contact.linkedin).pathname}
                </a>
              )}
              {profile.contact.github && (
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-black/5 dark:border-white/10 p-4 text-base hover:bg-black/5 dark:hover:bg-white/5"
                >
                  GitHub:{" "}
                  {new URL(profile.contact.github).pathname.replace("/", "@")}
                </a>
              )}
              {profile.contact.blog && (
                <a
                  href={profile.contact.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-black/5 dark:border-white/10 p-4 text-base hover:bg-black/5 dark:hover:bg-white/5"
                >
                  Blog: {new URL(profile.contact.blog).host}
                </a>
              )}
            </div>
            {profile.contact.notion && (
              <p className="mt-4 text-sm text-black/60 dark:text-white/60">
                상세 포트폴리오는{" "}
                <a
                  href={profile.contact.notion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Notion
                </a>
                에서 확인할 수 있어요.
              </p>
            )}
          </div>
        </AnimatedSection>
      </main>

      <footer className="mt-16 border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-xs text-black/60 dark:text-white/60">
          <span>© {new Date().getFullYear()} Your Name</span>
          <a href="#top" className="underline underline-offset-4">
            맨 위로
          </a>
        </div>
      </footer>
    </div>
  );
}
