export type Contact = {
  email?: string;
  phone?: string;
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
  tagline: "모바일로 연결하고, 사용자 경험으로 완성하는 개발자",
  headline: "모바일로 연결하고, 사용자 경험으로 완성하는 개발자",
  summary:
    "- **안드로이드 실무 경험**을 기반으로 안정적이고 완성도 높은 서비스를 개발해왔습니다.\n- **사용자 친화적인 UI·UX**를 고민하고 개선하는 것을 가장 중요한 가치로 삼습니다.\n- 웹 프론트엔드, 백엔드, iOS까지 다양한 기술 스택을 경험하며 **서비스 전체를 이해하는 시야**를 키웠습니다.\n- 문제 해결 과정에서 **끝까지 파고드는 집요함**과 협업 속 **원활한 커뮤니케이션**을 강점으로 합니다.",
  avatar: "/profile.jpg", // public/profile.jpg로 교체하세요
  birthday: "1998-06-26",
  contact: {
    email: "qlrqod123123@naver.com",
    phone: "010-4736-3559",
    github: "https://github.com/sangyoon98",
    linkedin: "https://linkedin.com/in/sangyoon-chae-38bb14278",
    blog: "https://sangyoon98.tistory.com/",
    notion: "https://sangyoon98.notion.site/portfolio?pvs=74",
  } as Contact,
};

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express / Nest", "REST / GraphQL"],
  },
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
  {
    title: "교육 과정 X",
    org: "기관명",
    period: "2023",
    description: "프론트엔드 집중 과정 수료",
  },
  {
    title: "해커톤 Y",
    org: "주최처",
    period: "2024",
    description: "서비스 프로토타입 제작 및 수상",
  },
  {
    title: "오픈소스 기여",
    org: "GitHub",
    period: "상시",
    description: "문서/버그 수정 및 피처 PR",
  },
];
