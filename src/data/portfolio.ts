export type Contact = {
  email?: string;
  github?: string;
  linkedin?: string;
  blog?: string;
  notion?: string;
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  tech?: string[];
  links?: ProjectLink[];
  period?: string;
  role?: string;
};

export type Activity = {
  title: string;
  org?: string;
  period?: string;
  description?: string;
};

export const profile = {
  name: "채상윤",
  headline: "프론트엔드 중심 풀스택 개발자",
  summary:
    "사용성 높은 인터페이스와 성능 최적화에 관심이 많고, 제품 임팩트를 만드는 문제 해결을 좋아합니다.",
  contact: {
    email: "you@example.com",
    github: "https://github.com/your",
    linkedin: "https://linkedin.com/in/your",
    blog: "https://your-blog.com",
    notion: "https://sangyoon98.notion.site/portfolio?pvs=74",
  } as Contact,
};

export const skills: SkillCategory[] = [
  { category: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express / Nest", "REST / GraphQL"] },
  { category: "Infra", items: ["Vercel", "AWS", "CI/CD"] },
  { category: "Testing", items: ["Jest", "Testing Library", "Playwright"] },
];

export const projects: Project[] = [
  {
    title: "프로젝트 A",
    description:
      "핵심 문제를 정의하고 성능과 사용성을 개선한 프로젝트. 사용자 전환율 상승에 기여.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    links: [
      { label: "GitHub", href: "#" },
      { label: "Demo", href: "#" },
    ],
    period: "2024",
    role: "Frontend",
  },
  {
    title: "프로젝트 B",
    description:
      "데이터 시각화 대시보드를 구축해 운영 지표를 실시간으로 모니터링.",
    tech: ["React", "Node.js", "Charting"],
    links: [{ label: "GitHub", href: "#" }],
    period: "2023",
    role: "Fullstack",
  },
];

export const activities: Activity[] = [
  { title: "교육 과정 X", org: "기관명", period: "2023", description: "프론트엔드 집중 과정 수료" },
  { title: "해커톤 Y", org: "주최처", period: "2024", description: "서비스 프로토타입 제작 및 수상" },
  { title: "오픈소스 기여", org: "GitHub", period: "상시", description: "문서/버그 수정 및 피처 PR" },
];

