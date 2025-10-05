import AnimatedSection from "@/components/AnimatedSection";
import { profile, skills, projects, activities } from "@/data/portfolio";
import Image from "next/image";
import Link from "next/link";
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
              {profile.headline}
            </h1>
            <RichText
              text={profile.summary}
              className="mt-6 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-3xl leading-relaxed"
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
              About Me
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
                <h3 className="text-xl font-semibold mb-4">모바일 개발자 {profile.name}</h3>
                <RichText
                  text={profile.detailedSummary || profile.summary}
                  className="text-base sm:text-lg text-black/80 dark:text-white/80 leading-7 max-w-3xl"
                />
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-base font-semibold mb-3">Mobile</h4>
                    <p className="text-sm text-black/70 dark:text-white/70">Android, Kotlin, iOS, SwiftUI</p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-3">Backend</h4>
                    <p className="text-sm text-black/70 dark:text-white/70">Java, Spring Boot, Python, Flask</p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-3">Frontend</h4>
                    <p className="text-sm text-black/70 dark:text-white/70">React, TypeScript, TailwindCSS</p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-3">Database</h4>
                    <p className="text-sm text-black/70 dark:text-white/70">MySQL, MongoDB, Firebase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 스킬 */}
        <AnimatedSection
          id="skills"
          aria-labelledby="skills-title"
          className="bg-white dark:bg-white/[0.02]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <div className="text-center mb-12">
              <h2
                id="skills-title"
                className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
              >
                Technical Skills
              </h2>
              <div className="w-16 h-1 bg-purple-500 mx-auto mb-4"></div>
              <p className="text-base text-black/70 dark:text-white/70">
                지속적인 학습을 통해 쌓아온 기술 스택들입니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Mobile Development */}
              <div className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-black/5 dark:border-white/10 h-80 min-h-80 max-h-80 flex flex-col">
                <h3 className="text-lg font-semibold mb-6 text-center">Mobile</h3>
                <div className="flex flex-col items-center space-y-3 justify-center">
                  <img 
                    src="https://skills.syvixor.com/api/icons?perline=3&i=kotlin,jetpackcompose,android" 
                    alt="Android Development Skills"
                    className="h-16 object-contain rounded-lg"
                  />
                  <img 
                    src="https://skills.syvixor.com/api/icons?perline=3&i=swift,swiftui,ios" 
                    alt="iOS Development Skills"
                    className="h-16 object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Frontend Development */}
              <div className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-black/5 dark:border-white/10 h-80 min-h-80 max-h-80 flex flex-col">
                <h3 className="text-lg font-semibold mb-6 text-center">Frontend</h3>
                <div className="flex flex-col items-center space-y-3 justify-center">
                  <img 
                    src="https://skills.syvixor.com/api/icons?perline=3&i=html,css3,js" 
                    alt="Frontend Core Skills"
                    className="h-16 object-contain rounded-lg"
                  />
                  <img 
                    src="https://skills.syvixor.com/api/icons?perline=3&i=ts,react,vue" 
                    alt="Frontend Framework Skills"
                    className="h-16 object-contain rounded-lg"
                  />
                  <img 
                    src="https://skills.syvixor.com/api/icons?perline=3&i=tailwind,styledcomponents" 
                    alt="Frontend Styling Skills"
                    className="h-16 object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Backend Development */}
              <div className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-black/5 dark:border-white/10 h-80 min-h-80 max-h-80 flex flex-col">
                <h3 className="text-lg font-semibold mb-6 text-center">Backend</h3>
                <div className="flex flex-col items-center space-y-3 justify-center">
                  <img 
                    src="https://skills.syvixor.com/api/icons?perline=3&i=java,spring,springboot" 
                    alt="Java Backend Skills"
                    className="h-16 object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Database */}
              <div className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-black/5 dark:border-white/10 h-80 min-h-80 max-h-80 flex flex-col">
                <h3 className="text-lg font-semibold mb-6 text-center">Database</h3>
                <div className="flex flex-col items-center space-y-3 justify-center">
                  <img 
                    src="https://skills.syvixor.com/api/icons?perline=3&i=mysql,firebase" 
                    alt="Database Skills"
                    className="h-16 object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Tools & Collaboration */}
              <div className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-black/5 dark:border-white/10 h-80 min-h-80 max-h-80 flex flex-col">
                <h3 className="text-lg font-semibold mb-6 text-center">Tools & Collaboration</h3>
                <div className="flex flex-col items-center space-y-3 justify-center">
                  <img 
                    src="https://skills.syvixor.com/api/icons?perline=3&i=git,github,bitbucket" 
                    alt="Version Control Skills"
                    className="h-16 object-contain rounded-lg"
                  />
                  <img 
                    src="https://skills.syvixor.com/api/icons?perline=3&i=jira,slack,notion" 
                    alt="Collaboration Tools"
                    className="h-16 object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 프로젝트 */}
        <AnimatedSection
          id="projects"
          aria-labelledby="projects-title"
          className="bg-[#f4f4f5] dark:bg-white/[0.04]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <h2
              id="projects-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
            >
              Projects
            </h2>
            <p className="mt-2 text-base text-black/70 dark:text-white/70">
              직접 개발하고 배포한 프로젝트들입니다.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {projects.map((p) => {
                const slugMap: { [key: string]: string } = {
                  "Trever (Trade-Ever)": "trever",
                  "타보니까 (TarboniCar)": "tarbonicar",
                  "인사이드무비 (InsideMovie)": "inside-movie",
                  "콩오더 (KongOrder)": "kongorder",
                  "휴런 Strocare Suite Mobile": "strocare",
                  "강남 Nutrition Care": "kangnam-nutrition",
                  "점심시간이야기": "lunch-time",
                  "로아랑 (LoaRang)": "loarang",
                  "Farm2Seoul": "farm2seoul",
                  "Udo-Olleh": "udo-olleh",
                  "강남대 뭐먹지?": "kangnam-food",
                  "용인고 App": "yongin-high",
                };
                const slug = slugMap[p.title] || "project";
                
                return (
                  <Link key={p.title} href={`/projects/${slug}`}>
                    <article className="rounded-lg border border-black/5 dark:border-white/10 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg/10 bg-white/70 dark:bg-white/[0.02] cursor-pointer group">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {p.title}
                      {p.featured && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-300">
                          Featured
                        </span>
                      )}
                    </h3>
                    {p.period && (
                      <span className="text-xs text-black/60 dark:text-white/60 whitespace-nowrap">
                        {p.period}
                      </span>
                    )}
                  </div>
                  <div className="mb-3 flex flex-wrap gap-2 text-xs text-black/60 dark:text-white/60">
                    {p.role && <span>역할: {p.role}</span>}
                    {p.company && <span>회사: {p.company}</span>}
                    {p.status && (
                      <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-300">
                        {p.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-black/70 dark:text-white/70 mb-4">
                    {p.description}
                  </p>
                  {p.tech && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {p.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/[0.05] px-2 py-1 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 4 && (
                        <span className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/[0.05] px-2 py-1 text-xs text-black/60 dark:text-white/60">
                          +{p.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-3 text-sm">
                          {p.links && p.links.map((l) => (
                            <span
                              key={`${p.title}-${l.label}`}
                              className="text-blue-600 dark:text-blue-400 font-medium"
                            >
                              {l.label} →
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors">
                          클릭하여 상세보기
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* 교육 및 활동 */}
        <AnimatedSection
          id="education"
          aria-labelledby="education-title"
          className="bg-white dark:bg-white/[0.02]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <h2
              id="education-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
            >
              교육 및 대외활동
            </h2>
            <p className="mt-2 text-base text-black/70 dark:text-white/70">
              지속적인 학습과 성장을 위한 교육 과정과 대외활동 경험입니다.
            </p>
            <div className="mt-8 space-y-6">
              {activities.map((a, idx) => (
                <div
                  key={`${a.title}-${idx}`}
                  className="flex items-start gap-4 p-6 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-lg">🎓</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-base font-semibold">{a.title}</p>
                      <span className="text-xs text-black/60 dark:text-white/60 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {a.period}
                      </span>
                    </div>
                    <p className="text-sm text-black/70 dark:text-white/70 mb-2">
                      {a.org}
                    </p>
                    {a.description && (
                      <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                        {a.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 연락처 */}
        <AnimatedSection
          id="contact"
          aria-labelledby="contact-title"
          className="bg-[#f4f4f5] dark:bg-white/[0.04]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <h2
              id="contact-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
            >
              Contact Me
            </h2>
            <p className="mt-2 text-base text-black/70 dark:text-white/70">
              새로운 기회와 협업에 항상 열려있습니다. 언제든 연락 주세요!
            </p>
            
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {profile.contact.email && (
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:bg-white/90 dark:hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-lg">📧</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">이메일</p>
                    <p className="text-xs text-black/60 dark:text-white/60">{profile.contact.email}</p>
                  </div>
                </a>
              )}
              {profile.contact.github && (
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:bg-white/90 dark:hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-lg">🐙</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-xs text-black/60 dark:text-white/60">github.com/{new URL(profile.contact.github).pathname.replace("/", "")}</p>
                  </div>
                </a>
              )}
              {profile.contact.linkedin && (
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:bg-white/90 dark:hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-lg">💼</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-xs text-black/60 dark:text-white/60">linkedin.com{new URL(profile.contact.linkedin).pathname}</p>
                  </div>
                </a>
              )}
              {profile.contact.blog && (
                <a
                  href={profile.contact.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:bg-white/90 dark:hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-lg">📝</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Blog</p>
                    <p className="text-xs text-black/60 dark:text-white/60">{new URL(profile.contact.blog).host}</p>
                  </div>
                </a>
              )}
            </div>

            <div className="mt-12 p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
              <h3 className="text-lg font-semibold mb-4">함께 성장하고 싶습니다</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-4">
                새로운 도전과 학습에 열정적인 모바일 개발자입니다.
              </p>
              <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
                <li>• 복잡한 문제를 해결하는 과정을 즐깁니다</li>
                <li>• 새로운 기술 습득과 성장에 적극적입니다</li>
                <li>• 팀과 함께 더 나은 서비스를 만들어갑니다</li>
              </ul>
              <p className="mt-4 text-sm font-medium text-black/80 dark:text-white/80">
                언제든 연락 주세요! 좋은 기회로 만나뵙고 싶습니다. 👋
              </p>
            </div>

            {profile.contact.notion && (
              <div className="mt-6 text-center">
                <p className="text-sm text-black/60 dark:text-white/60">
                  상세 포트폴리오는{" "}
                  <a
                    href={profile.contact.notion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Notion
                  </a>
                  에서 확인할 수 있어요.
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </main>

      <footer className="mt-16 border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-base">{profile.name}</h3>
              <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                모바일로 연결하고, 사용자 경험으로 완성하는 개발자입니다. 새로운 기술을 학습하고 적용하는 것을 즐깁니다.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-center">
                <h4 className="text-sm font-medium mb-2">빠른 링크</h4>
                <div className="flex gap-4 text-xs">
                  <a href="#about" className="hover:underline underline-offset-4">About</a>
                  <a href="#skills" className="hover:underline underline-offset-4">Skills</a>
                  <a href="#projects" className="hover:underline underline-offset-4">Projects</a>
                  <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-medium mb-2">연락처</h4>
                <div className="text-xs text-black/60 dark:text-white/60">
                  {profile.contact.email}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/10 text-center">
            <p className="text-xs text-black/60 dark:text-white/60">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
