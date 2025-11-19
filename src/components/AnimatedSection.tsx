"use client";

import { motion } from "framer-motion";

type Props = React.ComponentProps<"section">;

export default function AnimatedSection({ className = "", children, ...rest }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={["min-h-screen scroll-mt-14", className].join(" ")}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
