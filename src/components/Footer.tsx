import { profile } from "@/data/portfolio";

// 푸터 컴포넌트
export default function Footer() {
  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="mt-16 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 왼쪽: 이름과 설명 */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-base">{profile.name}</h3>
            <p className="text-sm text-black/60 dark:text-white/60 mt-1">
              모바일로 연결하고, 사용자 경험으로 완성하는 개발자입니다. 새로운
              기술을 학습하고 적용하는 것을 즐깁니다.
            </p>
          </div>

          {/* 오른쪽: 빠른 링크와 연락처 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-center">
              <h4 className="text-sm font-medium mb-2">빠른 링크</h4>
              <div className="flex gap-4 text-xs">
                {quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="hover:underline underline-offset-4"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium mb-2">연락처</h4>
              <div className="text-xs text-black/60 dark:text-white/60">
                {profile.contact.email}
              </div>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/10 text-center">
          <p className="text-xs text-black/60 dark:text-white/60">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

