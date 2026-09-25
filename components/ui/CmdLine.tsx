"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 命令行节拍 — 签名动效之一：幕首的问题逐字打出。
 * - SSR 输出完整文本：JS 禁用时内容完整可见
 * - prefers-reduced-motion：不打字，直接显示（无光标）
 * - 打完即熄灭：光标只在打字进行时存在，避免常驻闪烁造成审美疲劳
 * - 标点后停顿更久，模拟真实打字节奏（非匀速）
 * - reduce 状态在每个 tick 前复查，中途切换立即补全文本
 */
export default function CmdLine({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [shown, setShown] = useState(text); // 先给完整值：SSR / JS 禁用 / reduced-motion
  const [done, setDone] = useState(false); // 打完后光标熄灭——光标只在打字进行时存在
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setDone(true); // reduce：不打字，句子视为已说完，光标熄灭
      return;
    }

    const el = ref.current;
    if (!el) return;

    let timer = 0;
    const type = () => {
      if (started.current) return;
      started.current = true;
      let i = 0;
      setShown("");
      const tick = () => {
        if (mq.matches) {
          // 用户中途开启 reduce：立即补全，不再打字
          setShown(text);
          return;
        }
        i += 1;
        setShown(text.slice(0, i));
        if (i < text.length) {
          const ch = text[i - 1];
          // 打字节奏：句读处停顿，普通字符 40-70ms
          const pause = "。？！，、".includes(ch) ? 320 : 40 + ((ch?.charCodeAt(0) ?? 0) % 3) * 15;
          timer = window.setTimeout(tick, pause);
        } else {
          setDone(true); // 打完：光标熄灭，句子归于静态
        }
      };
      timer = window.setTimeout(tick, 260);
    };

    const onMqChange = () => {
      if (mq.matches) {
        window.clearTimeout(timer);
        setShown(text);
        setDone(true);
      }
    };
    mq.addEventListener("change", onMqChange);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          type();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMqChange);
      window.clearTimeout(timer);
    };
  }, [text]);

  return (
    <p ref={ref} className={`cmdline mono${done ? " cmdline--done" : ""} ${className}`} aria-label={text}>
      <span className="cmdline__prefix" aria-hidden="true">&gt;&nbsp;</span>
      <span aria-hidden="true">{shown}</span>
      <span className="caret caret--blink" aria-hidden="true" />
    </p>
  );
}
