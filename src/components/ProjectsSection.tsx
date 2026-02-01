import Link from "next/link";
import { projects } from "@/data/portfolio";

const slugMap: { [key: string]: string } = {
  "삼품관리(33Auto)": "33auto",
  "Trever (Trade-Ever)": "trever",
  "타보니까 (TarboniCar)": "tarbonicar",
  "인사이드무비 (InsideMovie)": "inside-movie",
  "콩오더 (KongOrder)": "kongorder",
  "휴런 Strocare Suite Mobile": "strocare",
  "강남 Nutrition Care": "kangnam-nutrition",
  점심시간이야기: "lunch-time",
  "로아랑 (LoaRang)": "loarang",
  Farm2Seoul: "farm2seoul",
  "Udo-Olleh": "udo-olleh",
  "강남대 뭐먹지?": "kangnam-food",
  "용인고 App": "yongin-high",
};

function getProjectSlug(title: string): string {
  return slugMap[title] || "project";
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="bg-white dark:bg-white/[0.02] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="projects-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Projects
        </h2>

        <div className="space-y-12">
          {projects.map((project) => (
            <article key={project.title} className="group">
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                <div className="sm:w-44 flex-shrink-0 text-sm text-black/50 dark:text-white/50 whitespace-nowrap">
                  {project.period}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/projects/${getProjectSlug(project.title)}`}
                    className="inline-flex items-center gap-2 font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {project.title}
                    <svg
                      className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  {project.company && project.company !== "SIM" && (
                    <span className="ml-2 text-sm text-black/50 dark:text-white/50">
                      {project.company}
                    </span>
                  )}
                  {project.role && (
                    <div className="mt-1 text-sm text-black/60 dark:text-white/60">
                      {project.role}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-black/70 dark:text-white/70 leading-relaxed">
                    {project.overview || project.description}
                  </p>
                  {project.achievements && project.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {project.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.tech && project.tech.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="px-2 py-0.5 text-xs text-black/40 dark:text-white/40">
                          +{project.tech.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
