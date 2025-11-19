"use client";

import { motion } from "framer-motion";

// 스킬 카드 컴포넌트
type SkillCardProps = {
  title: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
};

export default function SkillCard({ title, images }: SkillCardProps) {
  return (
    <motion.div
      className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-black/5 dark:border-white/10 h-80 min-h-80 max-h-80 flex flex-col"
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <h3 className="text-lg font-semibold mb-6 text-center">{title}</h3>
      <div className="flex flex-col items-center space-y-3 justify-center">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className="h-16 object-contain rounded-lg"
          />
        ))}
      </div>
    </motion.div>
  );
}

