"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "소개" },
    { href: "#career", label: "경력" },
    { href: "#skills", label: "스킬" },
    { href: "#projects", label: "프로젝트" },
    { href: "#contact", label: "연락처" },
    { href: "/guestbook", label: "Crew Talk", external: true },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-black/5 dark:border-white/10">
      <nav className="mx-auto max-w-4xl px-6 lg:px-8 h-14 flex items-center justify-between">
        <a href="#top" className="text-base font-semibold tracking-tight">
          {profile.name}
        </a>
        <div className="flex items-center gap-4">
          <ul className="hidden sm:flex items-center gap-5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <Link
                    href={item.href}
                    className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="메뉴 열기/닫기"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="sm:hidden border-t border-black/5 dark:border-white/10 bg-background/95 backdrop-blur">
          <ul className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className="block py-2 text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={handleNavClick}
                    className="block py-2 text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
