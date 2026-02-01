export type Contact = {
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  blog?: string;
  notion?: string;
};

export type SkillLevel = "expert" | "proficient" | "familiar";

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type SkillCategory = {
  category: string;
  items: Skill[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  overview?: string;
  responsibilities?: string[];
  techStack?: string[];
  features?: string[];
  achievements?: string[];
  experience?: string[];
  team?: string;
  tech?: string[];
  links?: ProjectLink[];
  period?: string;
  role?: string;
  company?: string;
  featured?: boolean;
  status?: string;
  highlights?: string[];
  image?: string;
  images?: string[];
  presentation?: string;
};

export type Activity = {
  title: string;
  org?: string;
  period?: string;
  description?: string;
  highlights?: string[];
};

export type Career = {
  company: string;
  position: string;
  type: string;
  period: string;
  projects: string[];
};

export type Education = {
  school: string;
  major?: string;
  doubleMajor?: string;
  period: string;
  gpa?: string;
};

export type Award = {
  competition: string;
  prize: string;
  date: string;
  organization: string;
};

export type Certification = {
  name: string;
  registrationNumber: string;
  organization: string;
  grade?: string;
  date: string;
};

export const profile = {
  name: "채상윤",
  tagline: "모바일로 연결하고, 사용자 경험으로 완성하는 개발자",
  headline: "안녕하세요! 채상윤입니다",
  summary:
    "모바일로 연결하고, 사용자 경험으로 완성하는 개발자입니다.\n안드로이드 실무 경험을 기반으로 안정적이고 완성도 높은 서비스를 개발해왔습니다.",
  detailedSummary:
    "**안드로이드 실무 경험**을 기반으로 안정적이고 완성도 높은 서비스를 개발해왔습니다.\n\n**사용자 친화적인 UI·UX**를 고민하고 개선하는 것을 가장 중요한 가치로 삼습니다.\n\n웹 프론트엔드, 백엔드, iOS까지 다양한 기술 스택을 경험하며 **서비스 전체를 이해하는 시야**를 키웠습니다.\n\n문제 해결 과정에서 **끝까지 파고드는 집요함**과 협업 속 **원활한 커뮤니케이션**을 강점으로 합니다.",
  avatar: "/profile.jpg",
  birthday: "1998-06-26",
  location: "서울, 대한민국",
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
    category: "Android",
    items: [
      { name: "Kotlin", level: "expert" },
      { name: "Java", level: "expert" },
      { name: "XML", level: "expert" },
      { name: "Jetpack Compose", level: "expert" },
      { name: "Coroutine", level: "expert" },
      { name: "Retrofit2", level: "expert" },
      { name: "Room", level: "expert" },
      { name: "Hilt", level: "proficient" },
      { name: "Data Binding", level: "expert" },
      { name: "ViewBinding", level: "expert" },
      { name: "Glide", level: "expert" },
      { name: "Flow", level: "proficient" },
      { name: "Coil", level: "familiar" },
      { name: "Ktor", level: "familiar" },
      { name: "Kotlin Multiplatform", level: "familiar" },
      { name: "Compose Multiplatform", level: "familiar" },
      { name: "Jetpack", level: "proficient" },
      { name: "Gson", level: "expert" },
      { name: "Navigation", level: "proficient" },
      { name: "Paging", level: "proficient" },
      { name: "LiveData", level: "expert" },
    ],
  },
  {
    category: "iOS",
    items: [
      { name: "SwiftUI", level: "proficient" },
      { name: "Swift", level: "proficient" },
      { name: "Alamofire", level: "proficient" },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "Spring Boot", level: "proficient" },
      { name: "Ktor", level: "familiar" },
      { name: "React", level: "proficient" },
      { name: "Vue", level: "familiar" },
      { name: "HTML", level: "expert" },
      { name: "Javascript", level: "proficient" },
      { name: "Typescript", level: "proficient" },
      { name: "Tailwind CSS", level: "proficient" },
      { name: "Styled Components", level: "familiar" },
      { name: "CSS", level: "expert" },
    ],
  },
  {
    category: "Database & Infra",
    items: [
      { name: "MySQL", level: "proficient" },
      { name: "Firebase", level: "expert" },
      { name: "Supabase", level: "familiar" },
      { name: "AWS EC2", level: "familiar" },
      { name: "Docker", level: "familiar" },
    ],
  },
  {
    category: "Collaboration & Tools",
    items: [
      { name: "Git", level: "expert" },
      { name: "Github", level: "expert" },
      { name: "Jira", level: "proficient" },
      { name: "Slack", level: "expert" },
      { name: "Asana", level: "proficient" },
      { name: "Notion", level: "expert" },
      { name: "Figma", level: "expert" },
      { name: "Bitbucket", level: "proficient" },
      { name: "Cursor", level: "proficient" },
      { name: "Claude Code", level: "proficient" },
      { name: "Codex CLI", level: "proficient" },
      { name: "OpenCode", level: "familiar" },
      { name: "Antigravity", level: "familiar" },
    ],
  },
];

export const career: Career[] = [
  {
    company: "(주)헬로비즈",
    position: "사원 (정규직)",
    type: "안드로이드 개발자",
    period: "2023.06. ~ 2024.05. (1년 0개월)",
    projects: [
      "뇌졸증 신속 AI 선별 솔루션 '휴런 Strocare Suite Mobile' 안드로이드 개발",
      "강남구어린이급식관리지원센터 아동 식단 관리 앱 '강남구 어린이급식관리지원센터 (시설앱, 부모앱)' 안드로이드 개발",
      "성북구어린이급식관리지원센터 아동 식단 관리 앱 '점심시간이야기 (시설앱, 부모앱)' 안드로이드 개발",
      "커피 픽업 전용 주문 앱 '콩오더, 콩오더 파트너스, 콩오더 파트너스(태블릿)' 안드로이드 개발",
    ],
  },
];

export const education: Education[] = [
  {
    school: "강남대학교 소프트웨어응용학부",
    major: "소프트웨어전공",
    doubleMajor: "가상현실전공",
    period: "2017.03. ~ 2023.02. (졸업)",
    gpa: "3.93 / 4.5",
  },
  {
    school: "용인고등학교",
    period: "2014.03. ~ 2017.02. (졸업)",
  },
];

export const awards: Award[] = [
  {
    competition:
      "2023 서울 열린데이터광장 공공데이터 활용 모바일 앱/웹 경진대회",
    prize: "장려상",
    date: "2023년 6월 30일",
    organization: "서울특별시",
  },
  {
    competition: "강남대학교 공과대학 소프트웨어응용학부 졸업작품전시회",
    prize: "최우수상",
    date: "2022년 12월 6일",
    organization: "강남대학교",
  },
  {
    competition: "제 21회 정보기술 및 응용 학술제",
    prize: "장려상",
    date: "2017년 5월 18일",
    organization: "강남대학교",
  },
];

export const certifications: Certification[] = [
  {
    name: "정보처리기사",
    registrationNumber: "25202260273K",
    organization: "한국산업인력공단",
    date: "2025년 9월 12일",
  },
  {
    name: "정보기술자격(ITQ)",
    registrationNumber: "A001-2022252-003118",
    organization: "한국생산성본부",
    grade: "OA Master",
    date: "2022년 12월 22일",
  },
  {
    name: "ICDL Start Certification",
    registrationNumber: "KR220000336S",
    organization: "한국생산성본부",
    date: "2022년 12월 22일",
  },
];

export const projects: Project[] = [
  {
    title: "삼품관리(33Auto)",
    description:
      "자동차 부품 관리 ERP로, Android / iOS / FrontEnd 개발을 담당했습니다.",
    overview:
      "현대오토에버 모빌리티 SW스쿨 웹/앱 2기 프로그램의 일환으로 개발된 자동차 부품 관리 ERP입니다. Android 전체 개발, iOS 전체 개발, FrontEnd 부품 마스터 / 인사관리 개발을 담당했습니다.",
    responsibilities: [
      "**Android 개발**: Jetpack Compose를 활용한 UI 개발, Retrofit을 사용한 REST API 통신, Clean Architecture 패턴 적용으로 유지보수성과 확장성을 고려한 구조 설계 및 구현을 담당했습니다.",
      "**iOS 개발**: SwiftUI를 활용한 모던한 UI 개발, Alamofire를 사용한 네트워크 통신, Clean Architecture 패턴 적용으로 플랫폼 간 일관된 아키텍처를 유지하며 개발했습니다.",
      "**FrontEnd 개발**: React와 TailwindCSS를 활용한 반응형 웹 개발, Feature-Sliced Design 아키텍처 패턴을 적용하여 부품 마스터 관리 및 인사관리 기능을 개발했습니다.",
    ],
    techStack: [
      "**Android**: Compose, Retrofit, Clean Architecture",
      "**iOS**: SwiftUI, Alamofire, Clean Architecture",
      "**FrontEnd**: React, TailwindCSS, Feature-Sliced Design",
    ],
    achievements: [
      "Clean Architecture를 Android, iOS, FrontEnd 전 플랫폼에 적용하여 일관된 코드 구조 확립",
      "Jetpack Compose와 SwiftUI를 활용한 선언형 UI 개발로 생산성 향상",
      "Feature-Sliced Design 아키텍처 패턴을 React에 적용하여 확장 가능한 프론트엔드 구조 설계",
    ],
    tech: [
      "Android - Compose, Retrofit, Clean Architecture",
      "iOS - SwiftUI, Alamofire, Clean Architecture",
      "FrontEnd - React, TailwindCSS, Feature-Sliced Design",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/33-Auto" },
      { label: "상세 보기", href: "/projects/33auto" },
    ],
    period: "2025.09. ~ 2025.11.",
    role: "Android / iOS / Frontend 개발",
    featured: true,
    image: "/projects/33auto/sampoom_title.png",
    presentation: "/projects/33auto/sampoom.pdf",
    images: [
      "/projects/33auto/ios/ios-23.png",
      "/projects/33auto/ios/ios-22.png",
      "/projects/33auto/ios/ios-21.png",
      "/projects/33auto/ios/ios-20.png",
      "/projects/33auto/ios/ios-19.png",
      "/projects/33auto/ios/ios-18.png",
      "/projects/33auto/ios/ios-17.png",
      "/projects/33auto/ios/ios-16.png",
      "/projects/33auto/ios/ios-15.png",
      "/projects/33auto/ios/ios-14.png",
      "/projects/33auto/ios/ios-13.png",
      "/projects/33auto/ios/ios-12.png",
      "/projects/33auto/ios/ios-11.png",
      "/projects/33auto/ios/ios-10.png",
      "/projects/33auto/ios/ios-09.png",
      "/projects/33auto/ios/ios-08.png",
      "/projects/33auto/ios/ios-07.png",
      "/projects/33auto/ios/ios-06.png",
      "/projects/33auto/ios/ios-05.png",
      "/projects/33auto/ios/ios-04.png",
      "/projects/33auto/ios/ios-03.png",
      "/projects/33auto/ios/ios-02.png",
      "/projects/33auto/ios/ios-01.png",
      "/projects/33auto/android/android-23.jpg",
      "/projects/33auto/android/android-22.jpg",
      "/projects/33auto/android/android-21.jpg",
      "/projects/33auto/android/android-20.jpg",
      "/projects/33auto/android/android-19.jpg",
      "/projects/33auto/android/android-18.jpg",
      "/projects/33auto/android/android-17.jpg",
      "/projects/33auto/android/android-16.jpg",
      "/projects/33auto/android/android-15.jpg",
      "/projects/33auto/android/android-14.jpg",
      "/projects/33auto/android/android-13.jpg",
      "/projects/33auto/android/android-12.jpg",
      "/projects/33auto/android/android-11.jpg",
      "/projects/33auto/android/android-10.jpg",
      "/projects/33auto/android/android-09.jpg",
      "/projects/33auto/android/android-08.jpg",
      "/projects/33auto/android/android-07.jpg",
      "/projects/33auto/android/android-06.jpg",
      "/projects/33auto/android/android-05.jpg",
      "/projects/33auto/android/android-04.jpg",
      "/projects/33auto/android/android-03.jpg",
      "/projects/33auto/android/android-02.jpg",
      "/projects/33auto/android/android-01.jpg",
      "/projects/33auto/web/web-32.png",
      "/projects/33auto/web/web-31.png",
      "/projects/33auto/web/web-30.png",
      "/projects/33auto/web/web-29.png",
      "/projects/33auto/web/web-28.png",
      "/projects/33auto/web/web-27.png",
      "/projects/33auto/web/web-26.png",
      "/projects/33auto/web/web-25.png",
      "/projects/33auto/web/web-24.png",
      "/projects/33auto/web/web-23.png",
      "/projects/33auto/web/web-22.png",
      "/projects/33auto/web/web-21.png",
      "/projects/33auto/web/web-20.png",
      "/projects/33auto/web/web-19.png",
      "/projects/33auto/web/web-18.png",
      "/projects/33auto/web/web-17.png",
      "/projects/33auto/web/web-16.png",
      "/projects/33auto/web/web-15.png",
      "/projects/33auto/web/web-14.png",
      "/projects/33auto/web/web-13.png",
      "/projects/33auto/web/web-12.png",
      "/projects/33auto/web/web-11.png",
      "/projects/33auto/web/web-10.png",
      "/projects/33auto/web/web-09.png",
      "/projects/33auto/web/web-08.png",
      "/projects/33auto/web/web-07.png",
      "/projects/33auto/web/web-06.png",
      "/projects/33auto/web/web-05.png",
      "/projects/33auto/web/web-04.png",
      "/projects/33auto/web/web-03.png",
      "/projects/33auto/web/web-02.png",
      "/projects/33auto/web/web-01.png",
    ],
  },
  {
    title: "Trever (Trade-Ever)",
    description: "중고차 거래 플랫폼으로, iOS 개발을 담당했습니다.",
    overview:
      "현대오토에버 모빌리티 SW스쿨 웹/앱 2기 프로그램의 일환으로 개발된 중고차 거래 플랫폼입니다. iOS 앱 전체 기능 개발을 담당했습니다.",
    responsibilities: [
      "Google OAuth 로그인 기능 개발",
      "일반 거래 및 경매 거래 기능 개발",
      "My Page 기능 개발",
      "위시리스트 기능 개발",
      "계약서 기능 개발",
    ],
    techStack: [
      "**iOS**: SwiftUI, Alamofire, Firebase Realtime Database, Google Authorization",
    ],
    achievements: [
      "Google OAuth와 Firebase Realtime Database를 활용한 실시간 경매 거래 기능 구현",
      "SwiftUI를 활용한 모던한 iOS 앱 UI/UX 설계 및 구현",
    ],
    tech: [
      "iOS",
      "SwiftUI",
      "Alamofire",
      "Firebase Realtime Database",
      "Google Authorization",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Trade-Ever" },
      { label: "상세 보기", href: "/projects/trever" },
    ],
    period: "2025.09. ~ 2025.09.",
    role: "iOS Developer",
    featured: true,
    image: "/projects/trever/trever_title.png",
    presentation: "/projects/trever/trever.pdf",
    images: [
      "/projects/trever/trever_036.png",
      "/projects/trever/trever_035.png",
      "/projects/trever/trever_034.png",
      "/projects/trever/trever_033.png",
      "/projects/trever/trever_032.png",
      "/projects/trever/trever_031.png",
      "/projects/trever/trever_030.png",
      "/projects/trever/trever_029.png",
      "/projects/trever/trever_028.png",
      "/projects/trever/trever_027.png",
      "/projects/trever/trever_026.png",
      "/projects/trever/trever_025.png",
      "/projects/trever/trever_024.png",
      "/projects/trever/trever_023.png",
      "/projects/trever/trever_022.png",
      "/projects/trever/trever_021.png",
      "/projects/trever/trever_020.png",
      "/projects/trever/trever_019.png",
      "/projects/trever/trever_018.png",
      "/projects/trever/trever_017.png",
      "/projects/trever/trever_016.png",
      "/projects/trever/trever_015.png",
      "/projects/trever/trever_014.png",
      "/projects/trever/trever_013.png",
      "/projects/trever/trever_012.png",
      "/projects/trever/trever_011.png",
      "/projects/trever/trever_010.png",
      "/projects/trever/trever_009.png",
      "/projects/trever/trever_008.png",
      "/projects/trever/trever_007.png",
      "/projects/trever/trever_006.png",
      "/projects/trever/trever_005.png",
      "/projects/trever/trever_004.png",
      "/projects/trever/trever_003.png",
      "/projects/trever/trever_002.png",
      "/projects/trever/trever_001.png",
    ],
  },
  {
    title: "인사이드무비 (InsideMovie)",
    description: "AI 감정 분석 기반 영화 리뷰 플랫폼입니다.",
    overview:
      "현대오토에버 모빌리티 SW스쿨 웹/앱 2기 프로그램의 일환으로 개발된 AI 기반 영화 리뷰 플랫폼입니다. 프론트엔드 개발을 리딩하고 백엔드 기능 개발을 지원했습니다.",
    responsibilities: [
      "사용자 페이지 풀 구현 및 프론트엔드 개발 리딩",
      "로그인, 회원가입, 사용자 정보 조회 등 백엔드 기능 개발 지원",
    ],
    techStack: [
      "**Backend**: Java, Spring Boot, JPA, Python, Flask",
      "**Frontend**: TypeScript, React, TailwindCSS",
    ],
    achievements: [
      "프론트엔드 개발 리딩을 통한 팀 협업 및 일정 관리 경험",
      "풀스택 개발 경험을 통한 서비스 전체 이해도 향상",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "JPA",
      "Python",
      "Flask",
      "TypeScript",
      "React",
      "TailwindCSS",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/AutoeverInsideMovie" },
      { label: "상세 보기", href: "/projects/inside-movie" },
    ],
    period: "2025.06. ~ 2025.06.",
    role: "Frontend Developer (Leading)",
    featured: true,
    image: "/projects/inside-movie/insidemovoie_title.png",
    presentation: "/projects/inside-movie/insidemovie.pdf",
    images: [
      "/projects/inside-movie/insidemovie_001.jpeg",
      "/projects/inside-movie/insidemovie_002.jpeg",
      "/projects/inside-movie/insidemovie_003.jpeg",
      "/projects/inside-movie/insidemovie_004.jpeg",
      "/projects/inside-movie/insidemovie_005.jpeg",
      "/projects/inside-movie/insidemovie_006.jpeg",
      "/projects/inside-movie/insidemovie_007.jpeg",
      "/projects/inside-movie/insidemovie_008.jpeg",
      "/projects/inside-movie/insidemovie_009.jpeg",
      "/projects/inside-movie/insidemovie_010.jpeg",
      "/projects/inside-movie/insidemovie_011.jpeg",
      "/projects/inside-movie/insidemovie_012.jpeg",
      "/projects/inside-movie/insidemovie_013.jpeg",
      "/projects/inside-movie/insidemovie_014.jpeg",
      "/projects/inside-movie/insidemovie_015.jpeg",
      "/projects/inside-movie/insidemovie_016.jpeg",
      "/projects/inside-movie/insidemovie_017.jpeg",
      "/projects/inside-movie/insidemovie_018.jpeg",
      "/projects/inside-movie/insidemovie_019.jpeg",
      "/projects/inside-movie/insidemovie_020.jpeg",
      "/projects/inside-movie/insidemovie_021.jpeg",
    ],
  },
  {
    title: "타보니까 (TarboniCar)",
    description: "현대자동차 특화 차량 리뷰 플랫폼입니다.",
    overview:
      "현대오토에버 모빌리티 SW스쿨 웹/앱 2기 활동의 일환으로 개발된 현대자동차 특화 차량 리뷰 플랫폼입니다. Backend와 Frontend 개발을 담당했습니다.",
    responsibilities: [
      "차량 리뷰 목록 및 필터 Backend & Frontend 개발",
      "게시글 댓글 기능 Backend & Frontend 개발",
      "QueryDSL을 사용하여 필터링 속도 개선",
    ],
    techStack: [
      "**Backend**: Java, Spring Boot, JPA, QueryDSL",
      "**Frontend**: JavaScript, React, StyledComponents",
    ],
    achievements: [
      "QueryDSL을 활용한 동적 쿼리 최적화로 필터링 성능 개선",
      "풀스택 개발을 통한 Backend-Frontend 연동 경험",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "JPA",
      "QueryDSL",
      "JavaScript",
      "React",
      "StyledComponents",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/TarboniCar" },
      { label: "상세 보기", href: "/projects/tarbonicar" },
    ],
    period: "2025.05. ~ 2025.06.",
    role: "Backend & Frontend Developer",
    featured: true,
    image: "/projects/tarbonicar/tarbonicar_title.png",
    presentation: "/projects/tarbonicar/tarbonicar.pdf",
    images: [
      "/projects/tarbonicar/tarbonicar_025.png",
      "/projects/tarbonicar/tarbonicar_024.png",
      "/projects/tarbonicar/tarbonicar_023.png",
      "/projects/tarbonicar/tarbonicar_022.png",
      "/projects/tarbonicar/tarbonicar_021.png",
      "/projects/tarbonicar/tarbonicar_020.png",
      "/projects/tarbonicar/tarbonicar_019.png",
      "/projects/tarbonicar/tarbonicar_018.png",
      "/projects/tarbonicar/tarbonicar_017.png",
      "/projects/tarbonicar/tarbonicar_016.png",
      "/projects/tarbonicar/tarbonicar_015.png",
      "/projects/tarbonicar/tarbonicar_014.png",
      "/projects/tarbonicar/tarbonicar_013.png",
      "/projects/tarbonicar/tarbonicar_012.png",
      "/projects/tarbonicar/tarbonicar_011.png",
      "/projects/tarbonicar/tarbonicar_010.png",
      "/projects/tarbonicar/tarbonicar_009.png",
      "/projects/tarbonicar/tarbonicar_008.png",
      "/projects/tarbonicar/tarbonicar_007.png",
      "/projects/tarbonicar/tarbonicar_006.png",
      "/projects/tarbonicar/tarbonicar_005.png",
      "/projects/tarbonicar/tarbonicar_004.png",
      "/projects/tarbonicar/tarbonicar_003.png",
      "/projects/tarbonicar/tarbonicar_002.png",
      "/projects/tarbonicar/tarbonicar_001.png",
    ],
  },
  {
    title: "휴런 Strocare Suite Mobile",
    description: "뇌졸중 신속 선별 AI 솔루션의 모바일 앱 개발 프로젝트입니다.",
    overview:
      "뇌졸중 신속 선별 AI 솔루션의 모바일 앱 개발 프로젝트입니다. WebView 연동, 채팅 기능, 알림 기능 등 핵심 기능 개발을 담당했습니다.",
    responsibilities: [
      "WebView Bridge를 사용하여 DICOM 웹 모바일 화면 연동 개발",
      "SendBird SDK를 분석 및 커스텀하여 앱 내 채팅 기능 개발",
      "Firebase Cloud Messaging을 사용하여 실시간 알림 기능 개발",
      "시큐어코딩을 적용하여 CycloneDX를 앱 내 적용",
    ],
    techStack: ["**Android**: Kotlin, SendBird SDK, FCM"],
    achievements: [
      "WebView Bridge를 활용한 DICOM 의료 영상 웹 연동 구현",
      "SendBird SDK 커스터마이징을 통한 의료진 간 실시간 채팅 기능 구현",
      "CycloneDX를 활용한 시큐어코딩 적용으로 보안 강화",
    ],
    tech: ["Kotlin", "SendBird SDK", "FCM"],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.iheuron.scs&hl=ko",
      },
      { label: "상세 보기", href: "/projects/strocare" },
    ],
    period: "2024.01. ~ 2024.03.",
    role: "Android Developer",
    company: "(주)헬로비즈",
    image: "/projects/strocare/heuron.png",
    images: [
      "/projects/strocare/1.webp",
      "/projects/strocare/2.webp",
      "/projects/strocare/3.webp",
      "/projects/strocare/4.webp",
      "/projects/strocare/5.webp",
    ],
  },
  {
    title: "강남 Nutrition Care",
    description:
      "강남구어린이급식관리지원센터에서 강남구 내 어린이집 혹은 유치원의 아동 식단 관리를 위해 사용하는 앱입니다.",
    overview:
      "강남구어린이급식관리지원센터에서 아동 식단 관리를 위해 사용하는 앱입니다. 이원화 앱(시설앱/부모앱) 개발과 API 설계를 담당했습니다.",
    responsibilities: [
      "이원화 앱으로 시설앱, 부모앱으로 나누어 개발",
      "급식 감수 신청 로직 구상 및 구현",
      "Firebase Cloud Messaging을 사용하여 알림 기능 개발",
      "REST API 인터페이스 설계서 구상 및 구현하여 다른 직군과 협업",
    ],
    techStack: ["**Android**: Kotlin, FCM, Kakao Login API"],
    achievements: [
      "이원화 앱(시설앱/부모앱) 구조 설계 및 개발",
      "REST API 인터페이스 설계서 작성을 통한 백엔드 팀과의 원활한 협업",
    ],
    tech: ["Kotlin", "FCM", "Kakao Login API"],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=kr.co.gangnam.nutritioncare&hl=ko",
      },
      { label: "상세 보기", href: "/projects/kangnam-nutrition" },
    ],
    period: "2023.12. ~ 2024.05.",
    role: "Android Developer",
    company: "(주)헬로비즈",
    image: "/projects/kangnam-nutrition/nutritioncare.png",
    images: [
      "/projects/kangnam-nutrition/1.webp",
      "/projects/kangnam-nutrition/2.webp",
      "/projects/kangnam-nutrition/3.webp",
      "/projects/kangnam-nutrition/4.webp",
      "/projects/kangnam-nutrition/5.webp",
    ],
  },
  {
    title: "점심시간이야기",
    description:
      "성북구어린이급식관리지원센터에서 성북구 내 어린이집 혹은 유치원의 아동 식단 관리를 위해 사용하는 앱입니다.",
    overview:
      "성북구어린이급식관리지원센터에서 아동 식단 관리를 위해 사용하는 앱입니다. 기존 앱 리뉴얼과 이원화 앱 개발을 담당했습니다.",
    responsibilities: [
      "기존 앱을 리뉴얼하여 사용성 개선 및 재출시",
      "이원화 앱으로 시설앱, 부모앱으로 나누어 개발",
      "Firebase Cloud Messaging을 사용하여 알림 기능 개발",
      "REST API 인터페이스 설계서 구상 및 구현하여 다른 직군과 협업",
    ],
    techStack: ["**Android**: Kotlin, FCM, Kakao Login API"],
    achievements: [
      "기존 앱 리뉴얼을 통한 사용성 개선 및 성공적인 재출시",
      "이원화 앱 구조로 시설과 부모 간 효율적인 정보 공유 체계 구축",
    ],
    tech: ["Kotlin", "FCM", "Kakao Login API"],
    links: [
      {
        label: "Google Play (시설앱)",
        href: "https://play.google.com/store/apps/details?id=kr.hellobiz.kindergarten&hl=ko",
      },
      {
        label: "Google Play (부모앱)",
        href: "https://play.google.com/store/apps/details?id=kr.hellobiz.lunchstory&hl=ko",
      },
      { label: "상세 보기", href: "/projects/lunch-time" },
    ],
    period: "2023.11. ~ 2023.12.",
    role: "Android Developer",
    company: "(주)헬로비즈",
    image: "/projects/lunch-time/launchtime.png",
    images: [
      "/projects/lunch-time/1.webp",
      "/projects/lunch-time/2.webp",
      "/projects/lunch-time/3.webp",
      "/projects/lunch-time/4.webp",
      "/projects/lunch-time/5.webp",
      "/projects/lunch-time/6.webp",
      "/projects/lunch-time/7.webp",
      "/projects/lunch-time/8.webp",
      "/projects/lunch-time/9.webp",
      "/projects/lunch-time/10.webp",
    ],
  },
  {
    title: "콩오더 (KongOrder)",
    description:
      "커피 픽업 전용 주문 앱으로, 카페 전용 주문 서비스를 제공합니다.",
    overview:
      "콩오더 사용자 앱, 콩오더 파트너스 앱(카페 사장용), 콩오더 파트너스 태블릿 앱으로 구성된 커피 픽업 전용 주문 플랫폼입니다. 결제, 인증, 지도, 알림 등 핵심 기능 개발을 담당했습니다.",
    responsibilities: [
      "Toss Payments API 분석 및 설계",
      "Google Login API와 Kakao Login API를 활용한 로그인 인증",
      "Google Maps API를 활용한 지도 좌표 표시",
      "Firebase Cloud Messaging을 활용한 워치 앱 연동 알림 기능",
      "태블릿 전용 레이아웃 기능 구성 및 개발",
    ],
    techStack: [
      "**Android**: Kotlin, Toss Payments API, Google Login API, Kakao Login API, Google Maps API, FCM",
    ],
    achievements: [
      "Toss Payments API 연동을 통한 안정적인 결제 시스템 구축",
      "태블릿 전용 레이아웃 개발로 다양한 디바이스 지원",
      "워치 앱 연동 알림 기능 구현으로 사용자 경험 향상",
    ],
    tech: [
      "Kotlin",
      "Toss Payments API",
      "Google Login API",
      "Kakao Login API",
      "Google Maps API",
      "FCM",
    ],
    links: [
      {
        label: "Google Play (사용자 앱)",
        href: "https://play.google.com/store/apps/details?id=com.kongorder.kongorderapp&hl=ko",
      },
      {
        label: "Google Play (파트너스)",
        href: "https://play.google.com/store/apps/details?id=com.kongorder.partner&hl=ko",
      },
      {
        label: "Google Play (태블릿)",
        href: "https://play.google.com/store/apps/details?id=com.kongorder.tablet&hl=ko",
      },
      { label: "상세 보기", href: "/projects/kongorder" },
    ],
    period: "2023.06. ~ 2023.12.",
    role: "Android Developer",
    company: "(주)헬로비즈",
    image: "/projects/kongorder/kongorder.png",
    images: [
      "/projects/kongorder/1.webp",
      "/projects/kongorder/2.webp",
      "/projects/kongorder/3.webp",
      "/projects/kongorder/4.webp",
      "/projects/kongorder/5.webp",
      "/projects/kongorder/6.webp",
      "/projects/kongorder/7.webp",
      "/projects/kongorder/8.webp",
      "/projects/kongorder/9.webp",
      "/projects/kongorder/10.webp",
      "/projects/kongorder/11.webp",
      "/projects/kongorder/12.webp",
    ],
  },
  {
    title: "Farm2Seoul",
    description:
      "서울시 농수산물 경매 시세 정보 제공 앱입니다. 서울시 공공 데이터 활용 경진대회 장려상 수상 프로젝트입니다.",
    overview:
      "서울시 농수산물 경매 시세를 한눈에 확인할 수 있도록 제작된 어플리케이션입니다. 서울시 공공 데이터 경매 정보가 파일 형태로 제공되고 한눈에 파악하기 어려워 어플리케이션을 통해 일별 경매 정보와 경매가 변동 내역 차트, 즐겨찾기 기능 등을 제공합니다.",
    features: [
      "일별 경매 시세 정보 등급별, 품목별 확인 가능",
      "한주간 시세, 4주간 시세, 3개월간 시세를 차트로 확인 가능",
      "즐겨찾기 기능 제공",
    ],
    techStack: [
      "**Android**: Kotlin, AAC, ViewModel, ViewBinding, LiveData, Coroutine, Flow, Hilt, OKHttp, Retrofit, Rest API, Glide, Paging3, MPAndroidChart",
    ],
    experience: [
      "Paging3를 사용하면서 Paging 처리 방법에 대해 학습",
      "Hilt 라이브러리를 사용하면서 의존성 주입 방법에 대해 이해",
      "MPAndroidChart 라이브러리를 사용하면서 차트 라이브러리의 사용 방법 학습",
      "SharedPreference의 Mapping 원리를 이해하며 SharedPreference를 활용",
      "Paging과 NestedScrollView의 충돌로 인한 프레임 드랍 이슈를 트러블 슈팅을 통해 해결",
    ],
    achievements: ["서울시 공공 데이터 활용 경진대회 장려상 수상"],
    team: "안드로이드 개발자 1명, iOS 개발자 1명, 백엔드 개발자 2명, 디자이너 1명",
    tech: [
      "Kotlin",
      "AAC",
      "ViewModel",
      "ViewBinding",
      "LiveData",
      "Coroutine",
      "Flow",
      "Hilt",
      "OKHttp",
      "Retrofit",
      "Rest API",
      "Glide",
      "Paging3",
      "MPAndroidChart",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/highSchoolFish/farm2Seoul-frontend-aos",
      },
      { label: "상세 보기", href: "/projects/farm2seoul" },
    ],
    period: "2023.04. ~ 2023.04.",
    role: "Android Developer",
    company: "SIM",
    highlights: ["서울시 공공 데이터 활용 경진대회 장려상 수상"],
    image: "/projects/farm2seoul/farm2seoul.png",
    images: [
      "/projects/farm2seoul/farm2seoul_001.png",
      "/projects/farm2seoul/farm2seoul_002.png",
      "/projects/farm2seoul/farm2seoul_003.png",
      "/projects/farm2seoul/farm2seoul_004.png",
      "/projects/farm2seoul/farm2seoul_005.png",
      "/projects/farm2seoul/farm2seoul_006.png",
      "/projects/farm2seoul/farm2seoul_007.png",
      "/projects/farm2seoul/farm2seoul_008.png",
      "/projects/farm2seoul/farm2seoul_009.png",
      "/projects/farm2seoul/farm2seoul_010.png",
      "/projects/farm2seoul/farm2seoul_011.png",
      "/projects/farm2seoul/farm2seoul_012.png",
      "/projects/farm2seoul/farm2seoul_013.png",
    ],
  },
  {
    title: "Udo-Olleh",
    description:
      "우도 관광 정보 제공 어플리케이션입니다. 우도의 관광 추천 정보와 맛집 리뷰를 확인할 수 있는 우도 관광 필수 어플리케이션입니다.",
    overview:
      "우도(제주특별자치도 제주시 우도면)를 관광 하는 사람들에게 우도에 특화된 어플리케이션을 제공하고자 제작된 서비스 입니다. 우도 항구의 배편, 버스 노선도, 맛집 정보와 리뷰, 추천 관광지, 커뮤니티 게시판 기능이 제공됩니다.",
    features: [
      "회원가입 & 로그인 기능",
      "우도 항구 배 시간표와 버스 시간표 제공",
      "우도 식당 정보와 해당 식당의 메뉴, 리뷰, 지도를 제공하고 리뷰를 남길 수 있는 기능도 제공",
      "우도 현재 날씨를 메인 화면에 제공하고 추천 관광지를 같이 제공",
      "추천 관광지와 여행 코스 Top5를 제공하고 상세 정보로 지도와 관광지 소개 페이지를 제공",
      "게시판 탭을 통해 간단한 커뮤니티 기능을 제공하고 댓글과 추천 기능을 같이 제공",
    ],
    techStack: [
      "**Android**: Java, Jsoup, Retrofit, OKHttp, Rest API, Glide, Google Maps API, RXJava",
    ],
    experience: [
      "RecyclerView를 사용해보면서 재사용성이 좋은 RecyclerView의 장점을 알게 됐고 무한 스크롤을 구현하면서 장점을 강조한 기능을 제작해 볼 수 있었음",
      "Jsoup을 사용해 크롤링을 하고 RXJava를 사용한 비동기 처리를 해보면서 비동기 프로그래밍의 사용법에 대해 알게 됐음",
      "Retrofit을 사용하면서 Rest API의 사용법에 대해 알게 됐고 Multipart 객체를 처리하는 방법에 대해 고민해보며 이미지 처리에 대해 알게 됐음",
      "JWT Token 처리 방법에 대해 고민해보며 Interceptor의 원리를 이해하고 토큰 방식에 대해 알게 됐음",
      "Jira, Confluence, Slack, Figma를 협업 툴로 사용해보았고 전반적인 협업 방법에 대해 이해하게 됐음",
    ],
    team: "안드로이드 개발자 2명, 백엔드 개발자 3명, 디자이너 1명",
    tech: [
      "Java",
      "Jsoup",
      "Retrofit",
      "OKHttp",
      "Rest API",
      "Glide",
      "Google Maps API",
      "RXJava",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/UDO-OLLEH/UDO-OLLEH-frontend",
      },
      { label: "상세 보기", href: "/projects/udo-olleh" },
    ],
    period: "2022.03. ~ 2023.02.",
    role: "Android Developer",
    company: "SIM",
    image: "/projects/udo-olleh/udo.png",
    images: [
      "/projects/udo-olleh/udo-olleh_001.jpg",
      "/projects/udo-olleh/udo-olleh_002.jpg",
      "/projects/udo-olleh/udo-olleh_003.jpg",
      "/projects/udo-olleh/udo-olleh_004.jpg",
      "/projects/udo-olleh/udo-olleh_005.jpg",
      "/projects/udo-olleh/udo-olleh_006.jpg",
      "/projects/udo-olleh/udo-olleh_007.jpg",
      "/projects/udo-olleh/udo-olleh_008.jpg",
      "/projects/udo-olleh/udo-olleh_009.jpg",
      "/projects/udo-olleh/udo-olleh_010.jpg",
      "/projects/udo-olleh/udo-olleh_011.jpg",
      "/projects/udo-olleh/udo-olleh_012.jpg",
      "/projects/udo-olleh/udo-olleh_013.jpg",
    ],
  },
  {
    title: "로아랑 (LoaRang)",
    description:
      "RPG 게임 '로스트아크'의 콘텐츠 관리 어플리케이션입니다. 강남대학교 공과대학 소프트웨어응용학부 졸업작품전시회에서 최수우상 수상 프로젝트입니다.",
    overview:
      "RPG 게임 '로스트아크'를 즐겨하면서 콘텐츠 진행 정보를 확인하기 불편하다는 것이 확인되었습니다. 게임 커뮤니티에서도 콘텐츠 진행 정보를 엑셀 파일로 저장해서 관리한다는 정보를 듣고 어플리케이션을 제작하게 됐습니다. 본인의 캐릭터와 캐릭터별 콘텐츠 진행 정보를 관리할 수 있고 게임 내 필요한 기능들이 더 제공되는 어플리케이션입니다.",
    features: [
      "캐릭터 추가 삭제 기능으로 캐릭터 정보 리스트 제공",
      "추가한 캐릭터가 자동으로 연계되어 '주간숙제'탭에 캐릭터 콘텐츠 진행상황 표시",
      "게임 내 고정 컨텐츠 정보를 '일정표'탭에 제공",
      "'정보실'탭에서 게임에서 가장 많이 계산되는 경매 손익 계산, 거래 수수료 계산을 자동으로 계산해주는 계산기 기능 제공",
      "공지 사항과 패치 내역을 확인하고 개발자에게 메일로 문의할 수 있는 기능 제공",
    ],
    techStack: [
      "**v1.1 ~ v1.2**: Java, Jsoup, Firebase, Glide, RXJava, SQLite (MVC)",
      "**v1.3**: Kotlin, Firebase Realtime Database, Coroutine, Room (MVVM)",
      "**v1.4**: Kotlin, Compose, Firebase Realtime Database, Coroutine, Room, Hilt (MVVM)",
    ],
    experience: [
      "**v1.1 ~ v1.2**: Recycler View를 사용해보면서 재사용성이 좋은 Recycler View의 장점을 알게 됐고 Adapter의 데이터가 변경될 경우 구현해야 하는 코드에 대해 알게 됐음",
      "**v1.1 ~ v1.2**: Jsoup을 사용해 크롤링을 하고 RXJava를 사용한 비동기 처리를 해보면서 비동기 프로그래밍의 사용법에 대해 알게 됐음",
      "**v1.1 ~ v1.2**: SQLite를 사용해 캐릭터 정보를 저장하면서 DB관리의 방법을 알게 됐음",
      "**v1.1 ~ v1.2**: Firebase Realtime Database를 사용해 Firebase 연동법과 Recycler View의 리스트들을 실시간으로 관리하는 방법을 알게 됐음",
      "**v1.3**: Java 코드를 Kotlin으로 마이그레이션 하며 두 언어의 장단점과 차이점을 알게 됐음",
      "**v1.3**: Room을 사용해 캐릭터 정보를 저장하면서 DB관리를 기존보다 더욱 직관적이고 수월하게 하는 방법을 알게 됐음",
      "**v1.3**: 비동기 처리를 RXJava에서 Coroutine으로 변경하면서 Coroutine의 러닝커브가 낮고 더 낮은 메모리를 사용하는 것을 알게 됐음",
      "**v1.3**: MVC에서 MVVM으로 아키텍처 구조를 변경하면서 ViewModel의 역할과 구성을 알게 됐음",
      "**v1.4**: XML을 Compose로 변경하면서 Compose의 사용법과 구성 방법을 배우게 됐음",
      "**v1.4**: Hilt를 적용해보며 의존성 주입의 필요성을 알게 됐음",
    ],
    achievements: [
      "강남대학교 공과대학 소프트웨어응용학부 졸업작품전시회 최수우상 수상",
      "4개 버전에 걸친 아키텍처 진화 (Java/MVC → Kotlin/MVVM → Compose/Hilt)",
    ],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Room",
      "Firebase Realtime Database",
      "Coroutine",
      "Hilt",
      "Jsoup",
      "Glide",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Sangyoon98/Loarang",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.cookandroid.loarang",
      },
      { label: "상세 보기", href: "/projects/loarang" },
    ],
    period: "2022.03. ~ 2025.02.",
    role: "Android Developer",
    status: "운영 중인 서비스",
    highlights: [
      "강남대학교 공과대학 소프트웨어응용학부 졸업작품전시회 최수우상 수상",
    ],
    image: "/projects/loarang/icon-playstore_Large.png",
    images: [
      "/projects/loarang/loarang_001.jpg",
      "/projects/loarang/loarang_002.jpg",
      "/projects/loarang/loarang_003.jpg",
      "/projects/loarang/loarang_004.jpg",
      "/projects/loarang/loarang_005.jpg",
      "/projects/loarang/loarang_006.jpg",
      "/projects/loarang/loarang_007.jpg",
      "/projects/loarang/loarang_008.jpg",
      "/projects/loarang/loarang_009.jpg",
      "/projects/loarang/loarang_010.jpg",
      "/projects/loarang/loarang_011.jpg",
      "/projects/loarang/loarang_012.jpg",
    ],
  },
  {
    title: "강남대 뭐먹지?",
    description:
      "강남대학교 주변 식당 정보 제공 어플리케이션입니다. 2017 소프트웨어응용학부 응용 학술제 대회 장려상 수상 프로젝트입니다.",
    overview:
      "당시 강남대학교 학생들이 학교에서 배달 주문을 할 때 대부분 정해진 음식점에서 주문을 하는 문화가 있었습니다. 배달 책자에서 음식을 고르고 직접 전화를 걸어 주문하는 모습을 보고 이 어플리케이션을 개발하게 됐습니다. 당시 학생들이 자주 주문하던 음식점들을 선별해 메뉴를 바로 확인하고 전화를 걸 수 있도록 만든 간단한 어플리케이션입니다.",
    features: [
      "식당 업종을 선택해 나눠진 업종별로 식당 리스트를 보여주는 기능 제공",
      "전화 아이콘을 누르면 해당 식당의 전화번호를 자동으로 입력해주는 기능 제공",
      "무엇을 먹을지 고민하는 학생들을 위해 랜덤으로 식당 업종을 선별해주는 기능 제공",
    ],
    techStack: ["**Android**: Java, MVC"],
    experience: ["Intent 기능을 사용해 Intent의 역할과 의미를 알게 됐음"],
    achievements: ["2017 소프트웨어응용학부 응용 학술제 대회 장려상 수상"],
    team: "안드로이드 개발자 1명, 웹 개발자 1명, 기획 3명",
    tech: ["Java", "MVC"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Sangyoon98/KangnamUniv_Eating",
      },
      { label: "상세 보기", href: "/projects/kangnam-food" },
    ],
    period: "2017.05. ~ 2017.05.",
    role: "Android Developer",
    highlights: ["2017 소프트웨어응용학부 응용 학술제 대회 장려상 수상"],
    image: "/projects/kangnam-food/Untitled-1.png",
    images: [
      "/projects/kangnam-food/kangnam-food_001.png",
      "/projects/kangnam-food/kangnam-food_002.png",
      "/projects/kangnam-food/kangnam-food_003.png",
      "/projects/kangnam-food/kangnam-food_004.png",
      "/projects/kangnam-food/kangnam-food_005.png",
      "/projects/kangnam-food/kangnam-food_006.png",
      "/projects/kangnam-food/kangnam-food_007.png",
    ],
  },
  {
    title: "용인고 App",
    description:
      "용인고등학교 정보 제공 어플리케이션입니다. 2.0 리뉴얼 버전까지 출시 경험이 있습니다.",
    overview:
      "당시 고등학교에서 방송부 동아리 회장으로 활동하면서 방송부 활동 중 하나인 점심방송에 신청곡을 받아야 했습니다. 하지만 신청곡을 받기 위해서는 수기로 작성한 신청곡을 방송부 동아리실까지 직접 전달하는 방법밖에 없었습니다. 방송부 동아리실이 멀고 시간이 걸리는 행동이라 참여율이 저조해 동아리 부원과 어플리케이션으로 제작해보기로 했습니다. 제작하는 김에 고등학생들의 최대 관심사인 급식표를 같이 보여주어 어플리케이션의 사용성을 높였습니다. 리뉴얼하여 2.0버전까지 출시한 경험이 있습니다.",
    features: [
      "일주일 분량의 급식표를 매주 보여주는 기능 제공",
      "방송부 메뉴에서 점심방송 사연과 노래를 신청하는 기능 제공",
      "급식표 위젯을 제작해 스마트폰의 홈 화면에서도 확인할 수 있는 기능 제공",
    ],
    techStack: ["**Android**: Java, MVC"],
    experience: [
      "안드로이드 레이아웃의 구조와 액티비티 동작 원리를 이해하고 적용했음",
      "외부 라이브러리를 사용하는 방법에 대해 이해하고 적용했음",
    ],
    achievements: ["2.0 버전까지 리뉴얼하여 출시"],
    team: "안드로이드 개발자 2명",
    tech: ["Java", "MVC"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Sangyoon98/YonginHS_App",
      },
      { label: "상세 보기", href: "/projects/yongin-high" },
    ],
    period: "2015.04. ~ 2015.06.",
    role: "Android Developer",
    image: "/projects/yongin-high/yongin.png",
    images: [
      "/projects/yongin-high/yongin-high_001.png",
      "/projects/yongin-high/yongin-high_002.png",
      "/projects/yongin-high/yongin-high_003.png",
      "/projects/yongin-high/yongin-high_004.png",
      "/projects/yongin-high/yongin-high_005.png",
      "/projects/yongin-high/yongin-high_006.png",
      "/projects/yongin-high/yongin-high_007.png",
      "/projects/yongin-high/yongin-high_008.png",
      "/projects/yongin-high/yongin-high_009.png",
      "/projects/yongin-high/yongin-high_010.png",
      "/projects/yongin-high/yongin-high_011.png",
      "/projects/yongin-high/yongin-high_012.png",
      "/projects/yongin-high/yongin-high_013.png",
      "/projects/yongin-high/yongin-high_014.png",
    ],
  },
];

export const activities: Activity[] = [
  {
    title: "현대오토에버 모빌리티 SW스쿨 웹/앱 2기",
    org: "현대오토에버",
    period: "2025.04. ~ 2025.11",
    description:
      "웹/앱 풀스택 과정에서 Android 중심으로 FE/BE/iOS까지 전 주기 개발 흐름을 경험했습니다. 팀 프로젝트 4개를 수행하며 API 연동, 데이터 흐름, 화면 상태 관리, 협업 방식(명세/이슈/PR)을 실제처럼 운영했습니다.",
    highlights: [
      "타보니까: 리뷰 목록·필터·댓글 기능을 FE/BE로 구현, QueryDSL로 복합 필터 성능 개선",
      "인사이드무비: FE 리드로 로그인/회원/리뷰 UI 전반 구현, BE 연동 및 데이터 흐름 정리",
      "Trever: iOS 리드로 Google OAuth, 거래/경매/계약서/찜하기 구현, RTDB 기반 데이터 동기화 경험",
      "삼품관리(ERP): Android·iOS 앱 구현, Clean Architecture + MVVM 기반 구조 설계 및 기능 개발",
    ],
  },
  {
    title: "강남대학교 모바일프로그래밍 멘토링 프로그램",
    org: "강남대학교",
    period: "2021.09. ~ 2021.12",
    description:
      "모바일프로그래밍 과목 멘토로 선정되어, 카카오톡으로 주차별 수업/과제 질문을 상시 대응했습니다. 과제 진행 중 발생한 오류를 함께 재현하고, 원인(로직/생명주기/뷰 처리/데이터 전달 등)을 짚어가며 해결하도록 도왔습니다. 단순히 정답 코드를 주기보다, 제출 결과가 안정적으로 나오도록 수정 방향과 리팩터링 포인트를 피드백하는 방식으로 지도했습니다. 이 경험을 통해 문제 상황을 빠르게 구조화하고, 상대가 이해할 수 있는 언어로 설명하는 디버깅 커뮤니케이션 능력을 키웠습니다.",
  },
  {
    title: "강남대학교 K-Project",
    org: "강남대학교",
    period: "2021.09. ~ 2021.12",
    description:
      "로블록스 기반으로 대학교 맵을 제작하는 팀 프로젝트에서 맵 구성 및 상호작용 요소 구현을 담당했습니다. 사용자 동선과 체험 흐름을 고려해 공간을 설계하고, 반복 테스트로 조작감과 충돌/이동 이슈를 개선했습니다. 이 경험을 통해 기능 구현뿐 아니라, 사용자가 실제로 겪는 흐름을 기준으로 완성도를 끌어올리는 방식을 체득했습니다.",
  },
  {
    title: "코드잇 대학생 코딩 캠프 5기",
    org: "코드잇",
    period: "2021.05. ~ 2021.06",
    description:
      "온라인으로 Git으로 배우는 버전관리, 웹 퍼블리싱, 유닉스 커맨드 라인 과목을 수강하며 Git 브랜치 전략, PR 기반 코드리뷰 흐름, 충돌 해결을 익혔습니다. 웹 퍼블리싱 기초(HTML/CSS)와 유닉스 커맨드라인으로 개발 환경 세팅, 로그 확인, 기본 자동화 흐름까지 다뤘습니다.",
  },
];
