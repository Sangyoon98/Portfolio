import { activities } from "@/data/portfolio";

export default function ActivitiesSection() {
  return (
    <section
      id="activities"
      aria-labelledby="activities-title"
      className="bg-white dark:bg-white/[0.02] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="activities-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Activities
        </h2>

        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div
              key={`${activity.title}-${index}`}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
            >
              <div className="sm:w-40 flex-shrink-0 text-sm text-black/50 dark:text-white/50">
                {activity.period}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{activity.title}</p>
                {activity.org && (
                  <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                    {activity.org}
                  </p>
                )}
                {activity.description && (
                  <p className="text-sm text-black/70 dark:text-white/70 mt-3 leading-relaxed">
                    {activity.description}
                  </p>
                )}
                {activity.highlights && activity.highlights.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {activity.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                        <span>{highlight}</span>
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
