import AnimatedSection from "@/components/AnimatedSection";
import RichText from "@/components/RichText";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import { profile } from "@/data/portfolio";

// 소개 섹션 컴포넌트
export default function AboutSection() {
  const skillCategories = [
    { title: "Mobile", skills: "Android, Kotlin, iOS, SwiftUI" },
    { title: "Backend", skills: "Java, Spring Boot, Python, Flask" },
    { title: "Frontend", skills: "React, TypeScript, TailwindCSS" },
    { title: "Database", skills: "MySQL, MongoDB, Firebase" },
  ];

  return (
    <AnimatedSection
      id="about"
      aria-labelledby="about-title"
      className="bg-white dark:bg-white/[0.02]"
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
            <h3 className="text-xl font-semibold mb-4">
              모바일 개발자 {profile.name}
            </h3>
            <RichText
              text={profile.detailedSummary || profile.summary}
              className="text-base sm:text-lg text-black/80 dark:text-white/80 leading-7 max-w-3xl"
            />

            {/* 기술 카테고리 */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <h4 className="text-base font-semibold mb-3">
                    {category.title}
                  </h4>
                  <p className="text-sm text-black/70 dark:text-white/70">
                    {category.skills}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
