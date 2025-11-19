"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  slug: string;
};

// 프로젝트 카드 컴포넌트
export default function ProjectCard({ project, slug }: ProjectCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/projects/${slug}`}>
        <motion.article
          className="h-full flex flex-col rounded-lg border border-black/5 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/[0.02] cursor-pointer group"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          {/* 프로젝트 이미지 */}
          {project.image && (
            <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          )}

          {/* 프로젝트 정보 */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
                {project.featured && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-300">
                    Featured
                  </span>
                )}
              </h3>
              {project.period && (
                <span className="text-xs text-black/60 dark:text-white/60 whitespace-nowrap">
                  {project.period}
                </span>
              )}
            </div>

            <div className="mb-3 flex flex-wrap gap-2 text-xs text-black/60 dark:text-white/60">
              {project.role && <span>역할: {project.role}</span>}
              {project.company && <span>회사: {project.company}</span>}
              {project.status && (
                <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-300">
                  {project.status}
                </span>
              )}
            </div>

            <p className="text-sm text-black/70 dark:text-white/70 mb-4 flex-grow">
              {project.description}
            </p>

            {/* 기술 스택 */}
            {project.tech && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/[0.05] px-2 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/[0.05] px-2 py-1 text-xs text-black/60 dark:text-white/60">
                    +{project.tech.length - 4} more
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-wrap gap-3 text-sm">
                {project.links?.map((link) => (
                  <span
                    key={`${project.title}-${link.label}`}
                    className="text-blue-600 dark:text-blue-400 font-medium"
                  >
                    {link.label} →
                  </span>
                ))}
              </div>
              <span className="text-xs text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors">
                클릭하여 상세보기
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
