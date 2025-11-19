"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/portfolio";

// 소개 섹션 컴포넌트
export default function AboutSection() {
  const strengths = [
    {
      icon: "📱",
      title: "안드로이드 실무 경험",
      shortDescription: "다양한 프로젝트를 통해 쌓은 실전 경험과 노하우",
      detailedDescription:
        "안드로이드 실무 경험을 기반으로 안정적이고 완성도 높은 서비스를 개발해왔습니다.",
    },
    {
      icon: "🎨",
      title: "사용자친화적인 UI/UX",
      shortDescription: "사용자 관점에서 생각하고 개선하는 디자인 마인드",
      detailedDescription:
        "사용자 친화적인 UI·UX를 고민하고 개선하는 것을 가장 중요한 가치로 삼습니다.",
    },
    {
      icon: "🔍",
      title: "서비스 전체를 이해하는 시야",
      shortDescription: "프론트엔드부터 백엔드까지 전체 아키텍처를 고려",
      detailedDescription:
        "웹 프론트엔드, 백엔드, iOS까지 다양한 기술 스택을 경험하며 서비스 전체를 이해하는 시야를 키웠습니다.",
    },
    {
      icon: "💪",
      title: "끝까지 파고드는 집요함",
      shortDescription: "문제 해결을 위해 포기하지 않는 끈기와 열정",
      detailedDescription:
        "문제 해결 과정에서 끝까지 파고드는 집요함과 협업 속 원활한 커뮤니케이션을 강점으로 합니다.",
    },
  ];

  return (
    <motion.section
      id="about"
      aria-labelledby="about-title"
      className="bg-[#f4f4f5] dark:bg-white/[0.04] scroll-mt-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        {/* 타이틀 - Technical Skills와 동일한 스타일 */}
        <div className="text-center mb-12">
          <h2
            id="about-title"
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
          >
            About Me
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto mb-4"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* 프로필 이미지 */}
          <div className="flex-shrink-0">
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

          {/* 소개 내용 */}
          <div className="flex flex-col flex-1">
            {/* 이름 */}
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
              Web / App Developer
              <br />
              {profile.name}
            </h3>

            {/* 소셜 링크 아이콘 */}
            <div className="flex items-center gap-3 mb-8">
              {profile.contact?.github && (
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-5 h-5"
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
                </a>
              )}
              {profile.contact?.blog && (
                <a
                  href={profile.contact.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="Tistory Blog"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </a>
              )}
              {profile.contact?.email && (
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="Email"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 나의 장점 - 그래픽 스타일 */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((strength, index) => {
            return (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <motion.div
                  className="relative rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100 dark:border-purple-800/30 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* 배경 원형 효과 */}
                  <div className="absolute inset-0 bg-white/30 dark:bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 top-0 left-1/2 w-32 h-32 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />

                  {/* 컨텐츠 */}
                  <div className="relative flex flex-col items-center p-6 text-center min-h-[12rem]">
                    {/* 아이콘 */}
                    <motion.div
                      className="text-5xl mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {strength.icon}
                    </motion.div>

                    {/* 제목 */}
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {strength.title}
                    </h4>

                    {/* 기본 상태: 짧은 설명 */}
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed px-2">
                      {strength.shortDescription}
                    </p>

                    {/* 호버 시 상세 설명 */}
                    <div className="mt-4 w-full overflow-hidden max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <div className="w-full h-px bg-purple-200 dark:bg-purple-800 mb-4" />
                      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-2">
                        {strength.detailedDescription}
                      </p>
                    </div>
                  </div>

                  {/* 호버 오버레이 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-100/80 to-transparent dark:from-purple-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
