import AnimatedSection from "@/components/AnimatedSection";
import SectionTitle from "@/components/SectionTitle";
import { activities } from "@/data/portfolio";

// 교육 및 활동 섹션 컴포넌트
export default function EducationSection() {
  return (
    <AnimatedSection
      id="education"
      aria-labelledby="education-title"
      className="bg-white dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <SectionTitle
          id="education-title"
          title="교육 및 대외활동"
          description="지속적인 학습과 성장을 위한 교육 과정과 대외활동 경험입니다."
          className="mb-8"
        />

        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div
              key={`${activity.title}-${index}`}
              className="flex items-start gap-4 p-6 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-lg">🎓</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-base font-semibold">{activity.title}</p>
                  <span className="text-xs text-black/60 dark:text-white/60 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {activity.period}
                  </span>
                </div>
                <p className="text-sm text-black/70 dark:text-white/70 mb-2">
                  {activity.org}
                </p>
                {activity.description && (
                  <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                    {activity.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

