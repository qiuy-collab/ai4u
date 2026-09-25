"use client";

import { useEffect, useRef } from "react";

/**
 * 荧光笔划过 — 签名动效之二：进入视口时黄色高亮从左到右划过（CSS background-size）。
 * 无 JS / reduced-motion：文字始终完整可见，高亮是增强不是内容载体。
 * 一次性触发，划完不再回退。
 */
export default function Highlight({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-lit");
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`hl ${className}`}>
      {children}
    </span>
  );
}
