"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  slug: string;
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

// 프로젝트 카드 컴포넌트
export default function ProjectCard({ project, slug }: ProjectCardProps) {
  const router = useRouter();
  const roleTags = getRoleTags(project.role);

  const handleCardClick = () => {
    router.push(`/projects/${slug}`);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.article
        className="h-full flex flex-col rounded-lg border border-black/5 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/[0.02] cursor-pointer group"
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        onClick={handleCardClick}
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
            </h3>
            {project.period && (
              <span className="text-xs text-black/60 dark:text-white/60 whitespace-nowrap">
                {project.period}
              </span>
            )}
          </div>

          <div className="mb-3 flex flex-wrap gap-2 items-center">
            {roleTags.length > 0 && (
              <>
                {roleTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-2.5 py-1 text-xs font-medium text-purple-800 dark:text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
            {project.company && (
              <span className="text-xs text-black/60 dark:text-white/60">
                {project.company}
              </span>
            )}
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

          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-2 text-sm mt-auto">
              {project.links
                .filter((link) => !link.label.includes("상세"))
                .map((link) => {
                  const isGithub = link.label.toLowerCase().includes("github");
                  const isPlayStore = link.label.toLowerCase().includes("play");

                  return (
                    <a
                      key={`${project.title}-${link.label}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors ${
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
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}
