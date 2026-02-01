"use client";

import { use } from "react";
import { projects } from "@/data/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import ReactMarkdown from "react-markdown";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const projectSlugMap: { [key: string]: string } = {
  "33auto": "삼품관리(33Auto)",
  trever: "Trever (Trade-Ever)",
  tarbonicar: "타보니까 (TarboniCar)",
  "inside-movie": "인사이드무비 (InsideMovie)",
  kongorder: "콩오더 (KongOrder)",
  strocare: "휴런 Strocare Suite Mobile",
  "kangnam-nutrition": "강남 Nutrition Care",
  "lunch-time": "점심시간이야기",
  loarang: "로아랑 (LoaRang)",
  farm2seoul: "Farm2Seoul",
  "udo-olleh": "Udo-Olleh",
  "kangnam-food": "강남대 뭐먹지?",
  "yongin-high": "용인고 App",
};

// 역할을 태그로 변환하는 함수
function getRoleTags(role?: string): string[] {
  if (!role) return [];
  const roleLower = role.toLowerCase();
  const tags: string[] = [];

  if (roleLower.includes("android")) tags.push("Android");
  if (roleLower.includes("ios")) tags.push("iOS");
  if (roleLower.includes("frontend") || roleLower.includes("fe"))
    tags.push("FE");
  if (roleLower.includes("backend") || roleLower.includes("be"))
    tags.push("BE");
  if (roleLower.includes("fullstack") || roleLower.includes("full stack"))
    tags.push("Fullstack");

  return tags;
}

// 섹션 컴포넌트
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
        {title}
      </h2>
      {children}
    </div>
  );
}

// 리스트 아이템 컴포넌트
function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-2">
      <span className="mt-2 w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0"></span>
      <span className="text-black/70 dark:text-white/70 leading-relaxed">
        {children}
      </span>
    </li>
  );
}

// Markdown 렌더링 컴포넌트
function MarkdownText({ text }: { text: string }) {
  return (
    <ReactMarkdown
      components={{
        strong: ({ children }) => (
          <strong className="font-semibold text-black dark:text-white">
            {children}
          </strong>
        ),
        p: ({ children }) => <span>{children}</span>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const projectTitle = projectSlugMap[slug];
  const project = projects.find((p) => p.title === projectTitle);

  if (!project) {
    notFound();
  }



  return (
    <div className="bg-white dark:bg-white/[0.02]">
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
        {/* Project Image */}
        {project.image && (
          <div className="mb-8 rounded-lg overflow-hidden border border-black/5 dark:border-white/10 bg-gray-100 dark:bg-gray-800">
            <div className="relative w-full aspect-auto">
              <Image
                src={project.image}
                alt={project.title}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 768px"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        )}

        {/* Title & Meta */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 items-center mb-4">
            {getRoleTags(project.role).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-800 dark:text-purple-300"
              >
                {tag}
              </span>
            ))}
            {project.status && (
              <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300">
                {project.status}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-black/60 dark:text-white/60 mb-6">
            {project.period && <span>📅 {project.period}</span>}
            {project.company && <span>🏢 {project.company}</span>}
            {project.role && <span>👤 {project.role}</span>}
          </div>

          <p className="text-lg text-black/80 dark:text-white/80">
            {project.description}
          </p>
        </div>

        {/* 프로젝트 개요 */}
        {project.overview && (
          <Section title="프로젝트 개요">
            <div className="bg-gray-50 dark:bg-white/[0.03] rounded-lg p-5 border border-black/5 dark:border-white/10">
              <p className="text-black/70 dark:text-white/70 leading-relaxed">
                {project.overview}
              </p>
            </div>
          </Section>
        )}

        {/* 담당 업무/기여 */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <Section title="담당 업무/기여">
            <ul className="space-y-1">
              {project.responsibilities.map((item, idx) => (
                <ListItem key={idx}>
                  <MarkdownText text={item} />
                </ListItem>
              ))}
            </ul>
          </Section>
        )}

        {/* 사용 기술 */}
        {project.techStack && project.techStack.length > 0 && (
          <Section title="사용 기술">
            <ul className="space-y-1">
              {project.techStack.map((item, idx) => (
                <ListItem key={idx}>
                  <MarkdownText text={item} />
                </ListItem>
              ))}
            </ul>
          </Section>
        )}

        {/* 주요 기능 */}
        {project.features && project.features.length > 0 && (
          <Section title="주요 기능">
            <ul className="space-y-1">
              {project.features.map((item, idx) => (
                <ListItem key={idx}>
                  <MarkdownText text={item} />
                </ListItem>
              ))}
            </ul>
          </Section>
        )}

        {/* 성과/수상/개선 */}
        {project.achievements && project.achievements.length > 0 && (
          <Section title="성과/수상/개선">
            <ul className="space-y-1">
              {project.achievements.map((item, idx) => (
                <ListItem key={idx}>
                  <MarkdownText text={item} />
                </ListItem>
              ))}
            </ul>
          </Section>
        )}

        {/* 팀 구성 */}
        {project.team && (
          <Section title="팀 구성">
            <div className="bg-gray-50 dark:bg-white/[0.03] rounded-lg p-5 border border-black/5 dark:border-white/10">
              <p className="text-black/70 dark:text-white/70">{project.team}</p>
            </div>
          </Section>
        )}

        {/* 개발 경험 */}
        {project.experience && project.experience.length > 0 && (
          <Section title="개발 경험">
            <ul className="space-y-1">
              {project.experience.map((item, idx) => (
                <ListItem key={idx}>
                  <MarkdownText text={item} />
                </ListItem>
              ))}
            </ul>
          </Section>
        )}

        {/* 기술 태그 */}
        {project.tech && project.tech.length > 0 && (
          <Section title="기술 스택">
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
          </Section>
        )}

        {/* 프로젝트 이미지 */}
        {project.images && project.images.length > 0 && (
          <Section title="프로젝트 이미지">
            <ImageGallery images={project.images} title={project.title} />
          </Section>
        )}

        {/* 발표자료 */}
        {project.presentation && (
          <Section title="발표자료">
            <a
              href={project.presentation}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              발표자료 다운로드 (PDF)
            </a>
          </Section>
        )}

        {/* 관련 링크 */}
        {project.links && project.links.length > 0 && (
          <Section title="관련 링크">
            <div className="flex flex-wrap gap-3">
              {project.links
                .filter((link) => !link.label.includes("상세"))
                .map((link) => {
                  const isGithub = link.label.toLowerCase().includes("github");
                  const isPlayStore = link.label.toLowerCase().includes("play");

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors hover:opacity-90 ${
                        isGithub
                          ? "bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700"
                          : isPlayStore
                            ? "bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-600"
                            : "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                      }`}
                    >
                      {isGithub && (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {isPlayStore && (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                      )}
                      <span>{link.label}</span>
                    </a>
                  );
                })}
            </div>
          </Section>
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
