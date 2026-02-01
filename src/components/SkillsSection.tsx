"use client";

import { skills, SkillLevel } from "@/data/portfolio";

function getChipHoverStyle(level: SkillLevel): string {
  switch (level) {
    case "expert":
      return "group-hover:bg-orange-50 group-hover:text-orange-700 group-hover:border-orange-200 dark:group-hover:bg-orange-950/30 dark:group-hover:text-orange-300 dark:group-hover:border-orange-800/40";
    case "proficient":
      return "group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 dark:group-hover:bg-blue-950/30 dark:group-hover:text-blue-300 dark:group-hover:border-blue-800/40";
    case "familiar":
      return "group-hover:bg-gray-100 group-hover:text-gray-600 group-hover:border-gray-300 dark:group-hover:bg-gray-800/50 dark:group-hover:text-gray-300 dark:group-hover:border-gray-600/40";
  }
}

function getLevelLabel(level: SkillLevel): { icon: string; text: string } {
  switch (level) {
    case "expert":
      return { icon: "🔥", text: "많이 써본 스택" };
    case "proficient":
      return { icon: "🛠️", text: "꽤 써본 스택" };
    case "familiar":
      return { icon: "🌱", text: "써본 스택" };
  }
}

function sortByLevel(items: { name: string; level: SkillLevel }[]) {
  const order: Record<SkillLevel, number> = {
    expert: 0,
    proficient: 1,
    familiar: 2,
  };
  return [...items].sort((a, b) => order[a.level] - order[b.level]);
}

function SkillChip({ name, level }: { name: string; level: SkillLevel }) {
  const { icon, text } = getLevelLabel(level);

  return (
    <span className="relative group">
      <span
        className={`px-3 py-1 text-sm rounded-md border cursor-default transition-all bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70 border-black/10 dark:border-white/10 ${getChipHoverStyle(level)}`}
      >
        {name}
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 bg-gray-800 dark:bg-gray-700 text-white shadow-lg">
        <span className="flex items-center gap-1.5">
          <span>{icon}</span>
          <span>{text}</span>
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-700" />
      </span>
    </span>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="bg-[#f4f4f5] dark:bg-white/[0.04] scroll-mt-14"
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
                {sortByLevel(skillGroup.items).map((skill) => (
                  <SkillChip
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
