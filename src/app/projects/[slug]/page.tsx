import { projects } from "@/data/portfolio";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const projectSlugMap: { [key: string]: string } = {
  "trever": "Trever (Trade-Ever)",
  "tarbonicar": "타보니까 (TarboniCar)",
  "inside-movie": "인사이드무비 (InsideMovie)",
  "kongorder": "콩오더 (KongOrder)",
  "strocare": "휴런 Strocare Suite Mobile",
  "kangnam-nutrition": "강남 Nutrition Care",
  "lunch-time": "점심시간이야기",
  "loarang": "로아랑 (LoaRang)",
  "farm2seoul": "Farm2Seoul",
  "udo-olleh": "Udo-Olleh",
  "kangnam-food": "강남대 뭐먹지?",
  "yongin-high": "용인고 App",
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectTitle = projectSlugMap[params.slug];
  const project = projects.find(p => p.title === projectTitle);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-white/[0.02]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-black/5 dark:border-white/10">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold tracking-tight">
            채상윤
          </Link>
          <Link 
            href="/#projects" 
            className="text-base hover:underline underline-offset-4"
          >
            ← 프로젝트 목록으로
          </Link>
        </nav>
      </header>

      {/* Project Content */}
      <main className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {project.title}
            </h1>
            {project.featured && (
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300">
                Featured
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-black/60 dark:text-white/60 mb-6">
            <span>기간: {project.period}</span>
            <span>역할: {project.role}</span>
            {project.company && <span>회사: {project.company}</span>}
          </div>

          <p className="text-lg text-black/80 dark:text-white/80 mb-8">
            {project.description}
          </p>
        </div>

        {/* Detailed Description */}
        {project.detailedDescription && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">프로젝트 상세</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-black/70 dark:text-white/70 leading-relaxed">
                {project.detailedDescription}
              </p>
            </div>
          </div>
        )}

        {/* Technologies */}
        {project.tech && project.tech.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">사용 기술</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/[0.05] px-3 py-1 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">관련 링크</h2>
            <div className="flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center rounded-lg bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-medium hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Back to Projects */}
        <div className="pt-8 border-t border-black/5 dark:border-white/10">
          <Link 
            href="/#projects"
            className="inline-flex items-center text-base hover:underline underline-offset-4"
          >
            ← 다른 프로젝트 보기
          </Link>
        </div>
      </main>
    </div>
  );
}
