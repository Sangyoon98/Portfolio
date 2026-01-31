import { skills } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="bg-white dark:bg-white/[0.02] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="skills-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Skills
        </h2>

        <div className="space-y-6">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <h3 className="text-sm font-semibold text-black/50 dark:text-white/50 uppercase tracking-wider mb-3">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1 text-sm rounded-md bg-black/5 dark:bg-white/10 text-black/80 dark:text-white/80"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

