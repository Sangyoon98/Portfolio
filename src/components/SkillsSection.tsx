"use client";

import { motion } from "framer-motion";
import SkillCard from "@/components/SkillCard";

// 스킬 섹션 컴포넌트
export default function SkillsSection() {
  const skills = [
    {
      title: "Mobile",
      images: [
        {
          src: "https://skills.syvixor.com/api/icons?perline=3&i=kotlin,jetpackcompose,android",
          alt: "Android Development Skills",
        },
        {
          src: "https://skills.syvixor.com/api/icons?perline=3&i=swift,swiftui,ios",
          alt: "iOS Development Skills",
        },
      ],
    },
    {
      title: "Frontend",
      images: [
        {
          src: "https://skills.syvixor.com/api/icons?perline=3&i=html,css3,js",
          alt: "Frontend Core Skills",
        },
        {
          src: "https://skills.syvixor.com/api/icons?perline=3&i=ts,react,vue",
          alt: "Frontend Framework Skills",
        },
        {
          src: "https://skills.syvixor.com/api/icons?perline=3&i=tailwind,styledcomponents",
          alt: "Frontend Styling Skills",
        },
      ],
    },
    {
      title: "Backend",
      images: [
        {
          src: "https://skills.syvixor.com/api/icons?perline=3&i=java,spring,springboot",
          alt: "Java Backend Skills",
        },
      ],
    },
    {
      title: "Database",
      images: [
        {
          src: "https://skills.syvixor.com/api/icons?perline=3&i=mysql,firebase",
          alt: "Database Skills",
        },
      ],
    },
    {
      title: "Tools & Collaboration",
      images: [
        {
          src: "https://skills.syvixor.com/api/icons?perline=3&i=git,github,bitbucket",
          alt: "Version Control Skills",
        },
        {
          src: "https://skills.syvixor.com/api/icons?perline=3&i=jira,slack,notion",
          alt: "Collaboration Tools",
        },
      ],
    },
  ];

  return (
    <motion.section
      id="skills"
      aria-labelledby="skills-title"
      className="bg-white dark:bg-white/[0.02] min-h-screen scroll-mt-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
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
          {skills.map((skill) => (
            <SkillCard key={skill.title} title={skill.title} images={skill.images} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

