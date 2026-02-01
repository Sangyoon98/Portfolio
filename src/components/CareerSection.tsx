import { career } from "@/data/portfolio";

export default function CareerSection() {
  return (
    <section
      id="career"
      aria-labelledby="career-title"
      className="bg-white dark:bg-white/[0.02] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="career-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Career
        </h2>

        <div className="space-y-8">
          {career.map((job, index) => (
            <div
              key={`${job.company}-${index}`}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
            >
              <div className="sm:w-40 flex-shrink-0 text-sm text-black/50 dark:text-white/50">
                {job.period}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-lg">{job.company}</p>
                <p className="text-sm text-black/70 dark:text-white/70 mt-1">
                  {job.position} · {job.type}
                </p>
                {job.projects.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {job.projects.map((project, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
