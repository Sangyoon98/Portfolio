"use client";

import { useEffect, useRef, useState } from "react";

type Props = React.ComponentProps<"section"> & {
  as?: keyof JSX.IntrinsicElements;
};

export default function AnimatedSection({ as: Tag = "section", className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current as Element | null;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as any}
      className={[
        "min-h-screen snap-start scroll-mt-14", // scroll snapping/anchor offset
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]", // smooth entrance
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}

