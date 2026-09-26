"use client";

import { useEffect } from "react";

/**
 * 给阅读页与提示词页的每个代码块注入「复制」按钮。
 *
 * 正文是构建期由 markdown 编译好的 HTML（dangerouslySetInnerHTML），
 * 所以按钮在客户端挂载后用 DOM 注入，避免把每篇 md 都改写成组件树。
 * 静态导出下这只是 hydration 后的一次性副作用，没有额外运行时依赖。
 */
export default function CodeCopy() {
  useEffect(() => {
    const pres = Array.from(
      document.querySelectorAll<HTMLPreElement>(".doc-body pre"),
    );
    if (pres.length === 0) return;

    const injected: HTMLButtonElement[] = [];

    const copy = async (pre: HTMLPreElement, btn: HTMLButtonElement) => {
      const text = (
        pre.querySelector("code")?.textContent ??
        pre.textContent ??
        ""
      ).replace(/\n$/, "");
      const flash = (label: string) => {
        btn.textContent = label;
        window.setTimeout(() => {
          btn.textContent = "复制";
        }, 1600);
      };
      try {
        await navigator.clipboard.writeText(text);
        flash("已复制");
      } catch {
        // 降级：非安全上下文或权限被拒时，选中文本让用户自行复制
        const range = document.createRange();
        range.selectNodeContents(pre);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        flash("按 Ctrl+C");
      }
    };

    for (const pre of pres) {
      if (pre.dataset.copy === "1") continue;
      pre.dataset.copy = "1";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy mono";
      btn.textContent = "复制";
      btn.setAttribute("aria-label", "复制本段文本");
      btn.addEventListener("click", () => {
        void copy(pre, btn);
      });

      pre.appendChild(btn);
      injected.push(btn);
    }

    return () => {
      for (const btn of injected) {
        btn.parentElement?.removeAttribute("data-copy");
        btn.remove();
      }
    };
  }, []);

  return null;
}