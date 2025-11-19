import { profile } from "@/data/portfolio";

// 헤더 네비게이션 컴포넌트
export default function Header() {
  const navItems = [
    { href: "#about", label: "소개" },
    { href: "#skills", label: "스킬" },
    { href: "#projects", label: "프로젝트" },
    { href: "#education", label: "교육·활동" },
    { href: "#contact", label: "연락처" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-black/5 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="text-base font-semibold tracking-tight">
          {profile.name}
        </a>
        <div className="flex items-center gap-4">
          <ul className="hidden sm:flex items-center gap-5 text-base">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:underline underline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

