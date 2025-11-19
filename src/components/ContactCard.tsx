"use client";

import { motion } from "framer-motion";

// 연락처 카드 컴포넌트
type ContactCardProps = {
  href: string;
  icon: string;
  label: string;
  value: string;
  target?: string;
  rel?: string;
};

export default function ContactCard({
  href,
  icon,
  label,
  value,
  target,
  rel,
}: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className="flex items-center gap-3 p-4 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:bg-white/90 dark:hover:bg-white/[0.05] transition-colors"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
        <span className="text-lg">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-black/60 dark:text-white/60">{value}</p>
      </div>
    </motion.a>
  );
}

