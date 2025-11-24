"use client";

import { motion } from "framer-motion";
import RichText from "@/components/RichText";
import { profile } from "@/data/portfolio";

// 히어로 섹션 컴포넌트
export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex items-center min-h-screen scroll-mt-14"
    >
      {/* 배경 색상 */}
      <div className="absolute inset-0 bg-white dark:bg-white/[0.02] -z-20" />

      {/* 배경 그라데이션 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="aurora-blob absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full">
          {/* 라이트 모드용 배경 */}
          <div
            className="absolute inset-0 rounded-full opacity-100 dark:hidden"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99,102,241,0.5), transparent 60%), radial-gradient(circle at 70% 30%, rgba(16,185,129,0.5), transparent 55%), radial-gradient(circle at 30% 70%, rgba(244,114,182,0.5), transparent 55%)",
            }}
          />
          {/* 다크 모드용 배경 */}
          <div
            className="hidden dark:block absolute inset-0 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99,102,241,0.35), transparent 60%), radial-gradient(circle at 70% 30%, rgba(16,185,129,0.35), transparent 55%), radial-gradient(circle at 30% 70%, rgba(244,114,182,0.35), transparent 55%)",
            }}
          />
        </div>
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-28"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h1
          id="hero-title"
          className="text-4xl sm:text-6xl font-semibold tracking-tight"
        >
          {profile.headline}
        </h1>
        <RichText
          text={profile.summary}
          className="mt-6 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-3xl leading-relaxed"
        />
      </motion.div>
    </section>
  );
}
