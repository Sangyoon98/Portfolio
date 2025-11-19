"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";
import RichText from "@/components/RichText";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";

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

export default function ProjectPage({ params }: ProjectPageProps) {
  // Next.js 15에서 params는 Promise이므로 React.use()로 unwrap
  const { slug } = use(params);
  const projectTitle = projectSlugMap[slug];
  const project = projects.find((p) => p.title === projectTitle);

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
        {/* Project Image */}
        {project.image && (
          <motion.div
            className="mb-8 rounded-lg overflow-hidden border border-black/5 dark:border-white/10 bg-gray-100 dark:bg-gray-800"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        )}

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
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
        </motion.div>

        {/* Detailed Description */}
        {project.detailedDescription && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">프로젝트 상세</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="text-black/70 dark:text-white/70 leading-relaxed">
                <RichText text={project.detailedDescription} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Technologies */}
        {project.tech && project.tech.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">사용 기술</h2>
            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {project.tech.map((tech) => (
                <motion.span
                  key={tech}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/[0.05] px-3 py-1 text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Additional Images */}
        {project.images && project.images.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4">프로젝트 이미지</h2>
            <ImageGallery images={project.images} title={project.title} />
          </motion.div>
        )}

        {/* Presentation */}
        {project.presentation && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">발표자료</h2>
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
          </motion.div>
        )}

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4">관련 링크</h2>
            <motion.div
              className="flex flex-wrap gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.6,
                  },
                },
              }}
            >
              {project.links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex items-center rounded-lg bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-medium hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Back to Projects */}
        <motion.div
          className="pt-8 border-t border-black/5 dark:border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center text-base hover:underline underline-offset-4"
          >
            ← 다른 프로젝트 보기
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
