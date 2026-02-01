import { certifications } from "@/data/portfolio";

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="bg-[#f4f4f5] dark:bg-white/[0.04] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="certifications-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Certifications
        </h2>

        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={`${cert.name}-${index}`}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
            >
              <div className="sm:w-40 flex-shrink-0 text-sm text-black/50 dark:text-white/50">
                {cert.date}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">
                  {cert.name}
                  {cert.grade && (
                    <span className="ml-2 text-sm font-normal text-purple-600 dark:text-purple-400">
                      {cert.grade}
                    </span>
                  )}
                </p>
                <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                  {cert.organization}
                </p>
                <p className="text-xs text-black/40 dark:text-white/40 mt-1">
                  등록번호: {cert.registrationNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
