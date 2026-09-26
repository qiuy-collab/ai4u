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
            {line.map((w, idx) => (
              <span
                className="hero__word"
                key={wi}
                style={{ "--wi": wi++ } as CSSProperties}
              >
                {w}
                {/* 光标放词内文本流末尾：窄屏词内折行时自动跟在最后一字后，
                    不会像「词的兄弟节点」那样被占满整行的词挤到下一行 */}
                {li === LINES.length - 1 && idx === line.length - 1 && (
                  <span className="caret caret--blink hero__caret" aria-hidden="true" />
                )}
              </span>
            ))}
            {li < LINES.length - 1 && <br />}
          </span>
        ))}
      </h1>
      <p className="hero__hint mono" aria-hidden="true">{HERO.scrollHint}</p>
    </section>
  );
}
