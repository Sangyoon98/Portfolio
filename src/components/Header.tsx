"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// 헤더 네비게이션 컴포넌트
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "소개" },
    { href: "#skills", label: "스킬" },
    { href: "#projects", label: "프로젝트" },
    { href: "#education", label: "교육·활동" },
    { href: "#contact", label: "연락처" },
    { href: "/guestbook", label: "Crew Talk", external: true },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-black/5 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="text-base font-semibold tracking-tight">
          {profile.name}
        </a>
        <div className="flex items-center gap-4">
          {/* 데스크톱 네비게이션 */}
          <ul className="hidden sm:flex items-center gap-5 text-base">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <Link
                    href={item.href}
                    className="hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="hover:underline underline-offset-4"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* 모바일 햄버거 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="메뉴 열기/닫기"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
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

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-t border-black/5 dark:border-white/10 bg-background/95 backdrop-blur overflow-hidden"
          >
            <ul className="px-6 py-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.external ? (
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      className="block py-2 text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={handleNavClick}
                      className="block py-2 text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
