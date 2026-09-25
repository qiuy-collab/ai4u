import PromptLine from "@/components/ui/PromptLine";
import Highlight from "@/components/ui/Highlight";
import { ACT_WHAT } from "@/content/site";

/**
 * Act 1 · 是什么 — 一句大字 + 一条短语跑马灯，正文解释全不上首页。
 * 跑马灯：两组相同短语无缝循环（第二组 aria-hidden 只为循环续接）；
 * reduced-motion 下轨道静止，第一组完整可读。
 */
export default function ActWhat() {
  return (
    <section className="act-what gutter" aria-labelledby="act-what-h">
      <PromptLine text={ACT_WHAT.prompt} />
      <h2 id="act-what-h" className="vh">{ACT_WHAT.prompt}</h2>
      <p className="act-what__statement">
        <Highlight>{ACT_WHAT.highlight}</Highlight>
      </p>
      <div className="marquee" role="group" aria-label="AI4U 的三个约定">
        <div className="marquee__track">
          {[0, 1].map((g) => (
            <ul
              className="marquee__group"
              key={g}
              aria-hidden={g === 1 || undefined}
            >
              {ACT_WHAT.nos.map((n) => (
                <li key={n.k} className="marquee__item">
                  <span className="marquee__x mono" aria-hidden="true">✕</span>
                  {n.k}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
