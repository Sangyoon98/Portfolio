import AnimatedSection from "@/components/AnimatedSection";
import RichText from "@/components/RichText";
import { profile } from "@/data/portfolio";

// 히어로 섹션 컴포넌트
export default function HeroSection() {
  return (
    <AnimatedSection
      aria-labelledby="hero-title"
      className="relative flex items-center bg-white dark:bg-white/[0.02]"
    >
      {/* 배경 그라데이션 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="aurora-blob absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-60 dark:opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,102,241,0.35), transparent 60%), radial-gradient(circle at 70% 30%, rgba(16,185,129,0.35), transparent 55%), radial-gradient(circle at 30% 70%, rgba(244,114,182,0.35), transparent 55%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-28">
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
      </div>
    </AnimatedSection>
  );
}

