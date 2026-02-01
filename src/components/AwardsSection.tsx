import { awards } from "@/data/portfolio";

export default function AwardsSection() {
  return (
    <section
      id="awards"
      aria-labelledby="awards-title"
      className="bg-white dark:bg-white/[0.02] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="awards-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Awards
        </h2>

        <div className="space-y-6">
          {awards.map((award, index) => (
            <div
              key={`${award.competition}-${index}`}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
            >
              <div className="sm:w-40 flex-shrink-0 text-sm text-black/50 dark:text-white/50">
                {award.date}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">
                  <span className="text-purple-600 dark:text-purple-400">
                    {award.prize}
                  </span>
                </p>
                <p className="text-sm text-black/80 dark:text-white/80 mt-1">
                  {award.competition}
                </p>
                <p className="text-sm text-black/50 dark:text-white/50 mt-1">
                  {award.organization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
