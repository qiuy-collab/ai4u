import PromptLine from "@/components/ui/PromptLine";
import { ACT_START } from "@/content/site";
import Link from "next/link";

/**
 * Act 3 · 首页主体三入口 — here / 文档 / join us（用户约定的全部主体入口）。
 * 索引行式大字入口，非卡片网格；动效留给 scroll 入场与 hover 扫色。
 */
export default function ActStart() {
  return (
    <section className="act-start gutter" aria-labelledby="act-start-h">
      <PromptLine text={ACT_START.prompt} />
      <h2 id="act-start-h" className="vh">{ACT_START.prompt}</h2>
      <ol className="act-start__entries">
        {ACT_START.entries.map((e, i) => (
          <li key={e.href} className="entry">
            <Link href={e.href} className="entry__link">
              <span className="entry__index mono" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="entry__label">{e.label}</span>
              <span className="entry__arrow mono" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
