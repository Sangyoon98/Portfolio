export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* 헤더 내비게이션 */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-black/5 dark:border-white/10">
        <nav className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#top" className="text-sm font-semibold tracking-tight">
            Sangyoon
          </a>
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <a href="#about" className="hover:underline underline-offset-4">
                소개
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:underline underline-offset-4">
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
              <a href="#contact" className="hover:underline underline-offset-4">
                연락처
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* 메인 섹션들 */}
      <main id="top" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 히어로 */}
        <section aria-labelledby="hero-title" className="py-16 sm:py-24">
          <h1
            id="hero-title"
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            안녕하세요, {"채상윤"} 입니다.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-black/70 dark:text-white/70 max-w-2xl">
            한 문장으로 역할/관심사/가치 제안 요약. 예: 프론트엔드 중심의 풀스택
            개발자이며, 사용성 높은 인터페이스와 성능 최적화에 관심이 있습니다.
          </p>
        </section>

        {/* 소개 */}
        <section
          id="about"
          aria-labelledby="about-title"
          className="py-12 border-t border-black/5 dark:border-white/10"
        >
          <h2 id="about-title" className="text-xl font-semibold tracking-tight">
            소개
          </h2>
          <p className="mt-3 text-sm text-black/80 dark:text-white/80 leading-6 max-w-3xl">
            경력 요약, 관심 분야, 강점 등 3~4문장으로 간결하게 소개를
            적어주세요.
          </p>
        </section>

        {/* 스킬 */}
        <section
          id="skills"
          aria-labelledby="skills-title"
          className="py-12 border-t border-black/5 dark:border-white/10"
        >
          <h2
            id="skills-title"
            className="text-xl font-semibold tracking-tight"
          >
            스킬
          </h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              "TypeScript",
              "React / Next.js",
              "Node.js",
              "Tailwind CSS",
              "React Query",
              "Jest / Testing Library",
              "AWS / Vercel",
              "CI/CD",
            ].map((skill) => (
              <div
                key={skill}
                className="rounded-md border border-black/5 dark:border-white/10 px-3 py-2 text-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* 프로젝트 */}
        <section
          id="projects"
          aria-labelledby="projects-title"
          className="py-12 border-t border-black/5 dark:border-white/10"
        >
          <h2
            id="projects-title"
            className="text-xl font-semibold tracking-tight"
          >
            프로젝트
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <article
                key={i}
                className="rounded-lg border border-black/5 dark:border-white/10 p-4"
              >
                <h3 className="font-semibold">프로젝트 제목 {i}</h3>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                  프로젝트 간단 설명(문제/해결/성과). 사용 기술: Next.js, TS 등
                </p>
                <div className="mt-3 flex gap-3 text-sm">
                  <a href="#" className="underline underline-offset-4">
                    GitHub
                  </a>
                  <a href="#" className="underline underline-offset-4">
                    Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 교육 및 활동 */}
        <section
          id="education"
          aria-labelledby="education-title"
          className="py-12 border-t border-black/5 dark:border-white/10"
        >
          <h2
            id="education-title"
            className="text-xl font-semibold tracking-tight"
          >
            교육 및 활동
          </h2>
          <ul className="mt-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-black/30 dark:bg-white/40" />
                <div>
                  <p className="text-sm font-medium">교육/활동명 {i}</p>
                  <p className="text-xs text-black/60 dark:text-white/60">
                    기관 · 연도 · 간단 설명
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 연락처 */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="py-12 border-t border-black/5 dark:border-white/10"
        >
          <h2
            id="contact-title"
            className="text-xl font-semibold tracking-tight"
          >
            연락처
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href="mailto:your@email.com"
              className="rounded-md border border-black/5 dark:border-white/10 p-3 text-sm hover:bg-black/5 dark:hover:bg-white/5"
            >
              이메일: your@email.com
            </a>
            <a
              href="https://linkedin.com/in/your"
              target="_blank"
              className="rounded-md border border-black/5 dark:border-white/10 p-3 text-sm hover:bg-black/5 dark:hover:bg-white/5"
            >
              LinkedIn: /in/your
            </a>
            <a
              href="https://github.com/your"
              target="_blank"
              className="rounded-md border border-black/5 dark:border-white/10 p-3 text-sm hover:bg-black/5 dark:hover:bg-white/5"
            >
              GitHub: @your
            </a>
            <a
              href="https://your-blog.com"
              target="_blank"
              className="rounded-md border border-black/5 dark:border-white/10 p-3 text-sm hover:bg-black/5 dark:hover:bg-white/5"
            >
              Blog: your-blog.com
            </a>
          </div>
        </section>
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
