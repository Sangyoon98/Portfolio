import { education } from "@/data/portfolio";

export default function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="bg-[#f4f4f5] dark:bg-white/[0.04] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="education-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Education
        </h2>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={`${edu.school}-${index}`}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
            >
              <div className="sm:w-40 flex-shrink-0 text-sm text-black/50 dark:text-white/50">
                {edu.period}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{edu.school}</p>
                {edu.major && (
                  <p className="text-sm text-black/70 dark:text-white/70 mt-1">
                    주전공: {edu.major}
                  </p>
                )}
                {edu.doubleMajor && (
                  <p className="text-sm text-black/70 dark:text-white/70">
                    복수전공: {edu.doubleMajor}
                  </p>
                )}
                {edu.gpa && (
                  <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                    학점 {edu.gpa}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
