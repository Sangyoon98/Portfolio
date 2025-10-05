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
  detailedDescription?: string;
  tech?: string[];
  links?: ProjectLink[];
  period?: string;
  role?: string;
  company?: string;
  featured?: boolean;
  status?: string;
  highlights?: string[];
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
    category: "Language",
    items: ["Java", "Kotlin", "HTML5", "CSS3", "JavaScript", "TypeScript", "Swift", "C", "C++", "C#", "Python"],
  },
  {
    category: "Backend",
    items: ["Spring Boot", "Flask", "Node.js"],
  },
  {
    category: "Frontend",
    items: ["React", "Vue", "Tailwind", "StyledComponent"],
  },
  {
    category: "Android",
    items: ["Jetpack Compose", "XML", "Jetpack", "Retrofit", "Coroutines", "RoomDB", "Navigation", "DataBinding", "ViewBinding", "Hilt", "Flow"],
  },
  {
    category: "iOS",
    items: ["SwiftUI"],
  },
  {
    category: "Database",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "SDK / API",
    items: ["Firebase Cloud Messaging", "Lottie", "Firebase", "Toss Payments API", "SendBird SDK", "Google Maps API", "Google Login API", "Kakao Login API"],
  },
  {
    category: "Collaboration",
    items: ["Jira", "Slack", "Asana", "Notion"],
  },
  {
    category: "Git",
    items: ["Git", "GitHub", "BitBucket"],
  },
];

export const projects: Project[] = [
  {
    title: "Trever (Trade-Ever)",
    description: "중고차 거래 플랫폼으로, iOS 개발을 담당했습니다.",
    detailedDescription: "현대오토에버 모빌리티 SW스쿨 웹/앱 2기 프로그램의 일환으로 개발된 중고차 거래 플랫폼입니다. Google OAuth 로그인, 일반 거래 및 경매 거래, My Page, 위시리스트, 계약서 기능을 개발했습니다.",
    tech: ["iOS", "SwiftUI", "Alamofire", "Firebase Realtime Database", "Google Authorization"],
    links: [
      { label: "상세 보기", href: "/projects/trever" },
    ],
    period: "2025.09. ~ 2025.09.",
    role: "iOS Developer",
    featured: true,
  },
  {
    title: "인사이드무비 (InsideMovie)",
    description: "AI 감정 분석 기반 영화 리뷰 플랫폼입니다.",
    detailedDescription: "현대오토에버 모빌리티 SW스쿨 웹/앱 2기 프로그램의 일환으로 개발된 AI 기반 영화 리뷰 플랫폼입니다. 사용자 페이지 풀 구현 및 프론트엔드 개발 리딩, 로그인, 회원가입, 사용자 정보 조회 등 백엔드 기능 개발 지원을 담당했습니다.",
    tech: ["Java", "Spring Boot", "JPA", "Python", "Flask", "TypeScript", "React", "TailwindCSS"],
    links: [
      { label: "상세 보기", href: "/projects/inside-movie" },
    ],
    period: "2025.06. ~ 2025.06.",
    role: "Fullstack Developer",
    featured: true,
  },
  {
    title: "타보니까 (TarboniCar)",
    description: "현대자동차 특화 차량 리뷰 플랫폼입니다.",
    detailedDescription: "현대오토에버 모빌리티 SW스쿨 웹/앱 2기 활동의 일환으로 개발된 현대자동차 특화 차량 리뷰 플랫폼입니다. 차량 리뷰 목록 및 필터 Backend & Frontend 개발, 게시글 댓글 기능 Backend & Frontend 개발, QueryDSL을 사용하여 필터링 속도 개선을 담당했습니다.",
    tech: ["Java", "Spring Boot", "JPA", "QueryDSL", "JavaScript", "React", "StyledComponents"],
    links: [
      { label: "상세 보기", href: "/projects/tarbonicar" },
    ],
    period: "2025.05. ~ 2025.06.",
    role: "Backend & Frontend Developer",
    featured: true,
  },
  {
    title: "휴런 Strocare Suite Mobile",
    description: "뇌졸중 신속 선별 AI 솔루션의 모바일 앱 개발 프로젝트입니다.",
    detailedDescription: "WebView Bridge를 사용하여 DICOM 웹 모바일 화면 연동 개발, SendBird SDK를 분석 및 커스텀하여 앱 내 채팅 기능 개발, Firebase Cloud Messaging을 사용하여 실시간 알림 기능 개발, 시큐어코딩을 적용하여 CycloneDX를 앱 내 적용을 담당했습니다.",
    tech: ["Kotlin", "SendBird SDK", "FCM"],
    links: [
      { label: "상세 보기", href: "/projects/strocare" },
    ],
    period: "2024.01. ~ 2024.03.",
    role: "Mobile App Developer",
    company: "(주)헬로비즈",
  },
  {
    title: "강남 Nutrition Care",
    description: "강남구어린이급식관리지원센터에서 강남구 내 어린이집 혹은 유치원의 아동 식단 관리를 위해 사용하는 앱입니다.",
    detailedDescription: "이원화 앱으로 시설앱, 부모앱으로 나누어 개발, 급식 감수 신청 로직 구상 및 구현, Firebase Cloud Messaging을 사용하여 알림 기능 개발, REST API 인터페이스 설계서 구상 및 구현하여 다른 직군과 협업을 담당했습니다.",
    tech: ["Kotlin", "FCM", "Kakao Login API"],
    links: [
      { label: "상세 보기", href: "/projects/kangnam-nutrition" },
    ],
    period: "2023.12. ~ 2024.05.",
    role: "Mobile App Developer",
    company: "(주)헬로비즈",
  },
  {
    title: "점심시간이야기",
    description: "성북구어린이급식관리지원센터에서 성북구 내 어린이집 혹은 유치원의 아동 식단 관리를 위해 사용하는 앱입니다.",
    detailedDescription: "기존 앱을 리뉴얼하여 사용성 개선 및 재출시, 이원화 앱으로 시설앱, 부모앱으로 나누어 개발, Firebase Cloud Messaging을 사용하여 알림 기능 개발, REST API 인터페이스 설계서 구상 및 구현하여 다른 직군과 협업을 담당했습니다.",
    tech: ["Kotlin", "FCM", "Kakao Login API"],
    links: [
      { label: "상세 보기", href: "/projects/lunch-time" },
    ],
    period: "2023.11. ~ 2023.12.",
    role: "Mobile App Developer",
    company: "(주)헬로비즈",
  },
  {
    title: "콩오더 (KongOrder)",
    description: "커피 픽업 전용 주문 앱으로, 카페 전용 주문 서비스를 제공합니다.",
    detailedDescription: "콩오더 사용자 앱, 콩오더 파트너스 앱(카페 사장용), 콩오더 파트너스 태블릿 앱으로 구성된 커피 픽업 전용 주문 플랫폼입니다. Toss Payments API 분석 및 설계, Google Login API와 Kakao Login API를 활용한 로그인 인증, Google Maps API를 활용한 지도 좌표 표시, Firebase Cloud Messaging을 활용한 워치 앱 연동 알림 기능, 태블릿 전용 레이아웃 기능 구성 및 개발을 담당했습니다.",
    tech: ["Kotlin", "Toss Payments API", "Google Login API", "Kakao Login API", "Google Maps API", "FCM"],
    links: [
      { label: "상세 보기", href: "/projects/kongorder" },
    ],
    period: "2023.06. ~ 2023.12.",
    role: "Android Developer",
    company: "(주)헬로비즈",
  },
  {
    title: "Farm2Seoul",
    description: "서울농수산물도매시장 경매가격 정보 제공 앱입니다.",
    detailedDescription: "서울농수산물도매시장의 경매가격을 MPAndroidChart 라이브러리를 사용하여 차트로 개발, CSV로 제공되는 경매 물품 데이터를 매핑 및 코딩하는 시스템 구상 및 개발, 페이징 처리 시 발생하는 프레임 드랍 이슈 해결을 담당했습니다.",
    tech: ["Kotlin", "Hilt", "Paging", "Retrofit", "MPAndroidChart"],
    links: [
      { label: "상세 보기", href: "/projects/farm2seoul" },
    ],
    period: "2023.04. ~ 2023.04.",
    role: "Android Developer",
    company: "SIM",
  },
  {
    title: "Udo-Olleh",
    description: "우도 관광 정보 제공 앱입니다.",
    detailedDescription: "게시판 기능 개발 및 Multipart 이미지 업로드 구현, Google Maps API를 활용한 지도 좌표 표시, JWT 토큰 처리를 위한 Interceptor 기능 구상 및 개발, RXJava를 활용한 비동기 처리, REST API를 통한 백엔드 개발자와의 협업을 담당했습니다.",
    tech: ["Java", "Jsoup", "Retrofit", "RXJava", "Google Maps API"],
    links: [
      { label: "상세 보기", href: "/projects/udo-olleh" },
    ],
    period: "2022.03. ~ 2023.02.",
    role: "Android Developer",
    company: "SIM",
  },
  {
    title: "로아랑 (LoaRang)",
    description: "RPG 게임 '로스트아크'의 콘텐츠 관리 앱입니다.",
    detailedDescription: "현재 서비스 중이며 지속적으로 업데이트되고 있습니다. Java 프로젝트에서 Kotlin과 Jetpack Compose로 마이그레이션, RXJava 제거 후 Coroutine으로 전환, SQLite 제거 후 Room DB로 전환, ProGuard 적용, Firebase Realtime Database를 활용한 데이터 관리, 다크모드 구현을 담당했습니다.",
    tech: ["Kotlin", "Compose", "Room", "Firebase Realtime Database", "Hilt"],
    links: [
      { label: "상세 보기", href: "/projects/loarang" },
    ],
    period: "2022.03. ~ 2025.02.",
    role: "Android Developer",
    status: "운영 중인 서비스",
  },
  {
    title: "강남대 뭐먹지?",
    description: "강남대학교 주변 식당 정보 제공 앱입니다.",
    detailedDescription: "Intent 기능을 활용해 전화 등 연동 기능을 개발했습니다.",
    tech: ["Java"],
    links: [
      { label: "상세 보기", href: "/projects/kangnam-food" },
    ],
    period: "2017.05. ~ 2017.05.",
    role: "Android Developer",
  },
  {
    title: "용인고 App",
    description: "용인고등학교 정보 제공 앱입니다.",
    detailedDescription: "급식 정보 제공 라이브러리를 사용하여 연동 및 개발, E-Mail Intent 기능을 활용한 점심방송 사연 신청 기능 개발, 급식 정보 위젯 구상 및 구현, 앱 레이아웃 UI 구성을 담당했습니다.",
    tech: ["Java"],
    links: [
      { label: "상세 보기", href: "/projects/yongin-high" },
    ],
    period: "2015.04. ~ 2015.06.",
    role: "Android Developer",
  },
];

export const activities: Activity[] = [
  {
    title: "현대오토에버 모빌리티 SW스쿨 웹/앱 2기",
    org: "현대오토에버",
    period: "2025.04. ~ (진행중)",
    description: "웹 풀스택 과정 (Backend, Frontend, Android, iOS) 이수 중. 현대자동차 특화 차량 리뷰 플랫폼 '타보니까' 프로젝트 개발, AI 기반 영화 리뷰 플랫폼 '인사이드무비' 프로젝트 개발, 중고차 거래 플랫폼 'Trever' 프로젝트 개발",
  },
];
