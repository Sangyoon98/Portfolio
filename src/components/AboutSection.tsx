"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import { profile } from "@/data/portfolio";

// 소개 섹션 컴포넌트
export default function AboutSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
        <SectionTitle id="about-title" title="About Me" className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-8 items-start">
          {/* 프로필 이미지 */}
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

          {/* 소개 내용 */}
          <div>
            <h3 className="text-xl font-semibold mb-8">
              모바일 개발자 {profile.name}
            </h3>

            {/* 나의 장점 - 그래픽 스타일 */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {strengths.map((strength, index) => {
                const isExpanded = expandedIndex === index;
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
                      className="relative rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100 dark:border-purple-800/30 overflow-hidden cursor-pointer"
                      animate={{
                        height: isExpanded ? "auto" : "12rem",
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      whileHover={!isExpanded ? { scale: 1.05, y: -5 } : {}}
                      onClick={() =>
                        setExpandedIndex(isExpanded ? null : index)
                      }
                    >
                      {/* 배경 원형 효과 */}
                      <div className="absolute inset-0 bg-white/30 dark:bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 top-0 left-1/2 w-32 h-32 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />

                      {/* 컨텐츠 */}
                      <div className="relative flex flex-col items-center p-6 text-center min-h-[12rem]">
                        {/* 아이콘 */}
                        <motion.div
                          className="text-5xl mb-4"
                          animate={{ scale: isExpanded ? 1.1 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {strength.icon}
                        </motion.div>

                        {/* 제목 */}
                        <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2">
                          {strength.title}
                        </h4>

                        {/* 호버 시 짧은 설명 */}
                        {!isExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {strength.shortDescription}
                            </p>
                          </motion.div>
                        )}

                        {/* 클릭 시 상세 설명 */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 w-full"
                            >
                              <div className="w-full h-px bg-purple-200 dark:bg-purple-800 mb-4" />
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed px-2">
                                {strength.detailedDescription}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* 호버 오버레이 */}
                      {!isExpanded && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-purple-100/80 to-transparent dark:from-purple-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
