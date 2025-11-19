"use client";

import { motion } from "framer-motion";
import ContactCard from "@/components/ContactCard";
import SectionTitle from "@/components/SectionTitle";
import { profile } from "@/data/portfolio";

// 연락처 섹션 컴포넌트
export default function ContactSection() {
  // 연락처 정보를 배열로 변환
  const contactItems = [];

  if (profile.contact.email) {
    contactItems.push({
      href: `mailto:${profile.contact.email}`,
      icon: "📧",
      label: "이메일",
      value: profile.contact.email,
    });
  }

  if (profile.contact.github) {
    const githubPath = new URL(profile.contact.github).pathname.replace("/", "");
    contactItems.push({
      href: profile.contact.github,
      icon: "🐙",
      label: "GitHub",
      value: `github.com/${githubPath}`,
      target: "_blank",
      rel: "noopener noreferrer",
    });
  }

  if (profile.contact.linkedin) {
    contactItems.push({
      href: profile.contact.linkedin,
      icon: "💼",
      label: "LinkedIn",
      value: `linkedin.com${new URL(profile.contact.linkedin).pathname}`,
      target: "_blank",
      rel: "noopener noreferrer",
    });
  }

  if (profile.contact.blog) {
    contactItems.push({
      href: profile.contact.blog,
      icon: "📝",
      label: "Blog",
      value: new URL(profile.contact.blog).host,
      target: "_blank",
      rel: "noopener noreferrer",
    });
  }

  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-[#f4f4f5] dark:bg-white/[0.04] min-h-screen scroll-mt-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <SectionTitle
          id="contact-title"
          title="Contact Me"
          description="새로운 기회와 협업에 항상 열려있습니다. 언제든 연락 주세요!"
          className="mb-8"
        />

        {/* 연락처 카드들 */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {contactItems.map((item) => (
            <ContactCard key={item.label} {...item} />
          ))}
        </motion.div>

        {/* 소개 메시지 */}
        <div className="mt-12 p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
          <h3 className="text-lg font-semibold mb-4">
            함께 성장하고 싶습니다
          </h3>
          <p className="text-sm text-black/70 dark:text-white/70 mb-4">
            새로운 도전과 학습에 열정적인 모바일 개발자입니다.
          </p>
          <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
            <li>• 복잡한 문제를 해결하는 과정을 즐깁니다</li>
            <li>• 새로운 기술 습득과 성장에 적극적입니다</li>
            <li>• 팀과 함께 더 나은 서비스를 만들어갑니다</li>
          </ul>
          <p className="mt-4 text-sm font-medium text-black/80 dark:text-white/80">
            언제든 연락 주세요! 좋은 기회로 만나뵙고 싶습니다. 👋
          </p>
        </div>

        {/* Notion 링크 */}
        {profile.contact.notion && (
          <div className="mt-6 text-center">
            <p className="text-sm text-black/60 dark:text-white/60">
              상세 포트폴리오는{" "}
              <a
                href={profile.contact.notion}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Notion
              </a>
              에서 확인할 수 있어요.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}

