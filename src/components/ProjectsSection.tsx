"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import SectionTitle from "@/components/SectionTitle";
import { projects } from "@/data/portfolio";

// 프로젝트 제목을 slug로 변환하는 함수
function getProjectSlug(title: string): string {
  const slugMap: { [key: string]: string } = {
    "삼품관리(33Auto)": "33auto",
    "Trever (Trade-Ever)": "trever",
    "타보니까 (TarboniCar)": "tarbonicar",
    "인사이드무비 (InsideMovie)": "inside-movie",
    "콩오더 (KongOrder)": "kongorder",
    "휴런 Strocare Suite Mobile": "strocare",
    "강남 Nutrition Care": "kangnam-nutrition",
    점심시간이야기: "lunch-time",
    "로아랑 (LoaRang)": "loarang",
    Farm2Seoul: "farm2seoul",
    "Udo-Olleh": "udo-olleh",
    "강남대 뭐먹지?": "kangnam-food",
    "용인고 App": "yongin-high",
  };
  return slugMap[title] || "project";
}

// 프로젝트 섹션 컴포넌트
export default function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      aria-labelledby="projects-title"
      className="bg-[#f4f4f5] dark:bg-white/[0.04] min-h-screen scroll-mt-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <SectionTitle
          id="projects-title"
          title="Projects"
          description="직접 개발하고 배포한 프로젝트들입니다."
          className="mb-8"
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              slug={getProjectSlug(project.title)}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

