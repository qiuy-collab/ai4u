"use client";

import { useEffect } from "react";

/**
 * 目录「当前章节」高亮（桌面侧栏 .doc-toc）。
 *
 * 取代此前的 CSS scroll-target-group 方案：后者把「滚动范围与视口相交的
 * 所有章节」都标为 :target-current，章节偏短时一屏内会出现多个选中态。
 * 这里收敛为唯一一项——取视口参考线（顶部 30%）以上最后越过的标题；
 * 无 JS 环境（含 Firefox）无高亮，目录本身仍可用。
 */
export default function TocSpy() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".doc-toc nav");
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    // rehype-slug 生成的锚点含中文：a.hash 是 percent-encode 形态，需解码后与 heading id 匹配
    const byId = new Map(links.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
    const heads = Array.from(document.querySelectorAll<HTMLElement>("h2[id], h3[id]")).filter(
      (h) => byId.has(h.id),
    );
    if (heads.length === 0) return;

    let current: HTMLAnchorElement | null = null;
    let raf = 0;

    const setActive = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let active: HTMLElement | null = null;
      for (const h of heads) {
        if (h.getBoundingClientRect().top <= line) active = h;
        else break;
      }
      if (!active) active = heads[0];
      const next = byId.get(active.id) ?? null;
      if (next === current) return;
      current?.removeAttribute("aria-current");
      next?.setAttribute("aria-current", "true");
      current = next;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(setActive);
    };

    setActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      current?.removeAttribute("aria-current");
    };
  }, []);

  return null;
}
