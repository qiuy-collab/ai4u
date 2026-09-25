import type { CSSProperties } from "react";
import CmdLine from "@/components/ui/CmdLine";
import { HERO } from "@/content/site";

/* 标题按词组拆分，驱动「键入式」stagger（CSS only，词序 --wi 全局递增） */
const LINES: string[][] = HERO.titleLines.map((line) => [line]);

/**
 * Hero — 不是「居中 H1 + 副题 + 双按钮」的默认 hero（design-slop A1）：
 * 命令行问题开场，display 大字作答，尾部是全站签名的闪烁光标。
 * 纯 server component：入场动画全部由 CSS keyframes 承担。
 */
export default function Hero() {
  let wi = 0;
  return (
    <section className="hero gutter" aria-labelledby="hero-title">
      <CmdLine text={HERO.prompt} className="hero__prompt" />
      <h1 id="hero-title" className="display hero__title">
        {LINES.map((line, li) => (
          <span className="hero__line" key={li}>
            {line.map((w) => (
              <span
                className="hero__word"
                key={wi}
                style={{ "--wi": wi++ } as CSSProperties}
              >
                {w}
              </span>
            ))}
            {li < LINES.length - 1 && <br />}
            {/* 光标 inline 跟在末行词后：放 h1 尾部会被块级 line 挤到独立一行 */}
            {li === LINES.length - 1 && (
              <span className="caret caret--blink hero__caret" aria-hidden="true" />
            )}
          </span>
        ))}
      </h1>
      <p className="hero__sub measure-narrow">{HERO.sub}</p>
      <p className="hero__hint mono" aria-hidden="true">{HERO.scrollHint}</p>
    </section>
  );
}
