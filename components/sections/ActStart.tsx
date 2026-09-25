import PromptLine from "@/components/ui/PromptLine";
import IndexRow from "@/components/ui/IndexRow";
import { ACT_START } from "@/content/site";
import { DOCS } from "@/content/docs";
import Link from "next/link";

/**
 * Act 3 · 新手入口 — 索引行式（非卡片网格）。
 * 内容默认在场（design-slop B2：不在整页铺入场动画），动效留给 hover。
 */
export default function ActStart() {
  return (
    <section className="act-start gutter" aria-labelledby="act-start-h">
      <PromptLine text={ACT_START.prompt} />
      <h2 id="act-start-h" className="vh">{ACT_START.prompt}</h2>
      <p className="act-start__answer measure">{ACT_START.answer}</p>
      <ol className="act-start__list">
        {DOCS.slice(0, 4).map((d, i) => (
          <IndexRow
            key={d.slug}
            index={i + 1}
            categoryLabel={d.categoryLabel}
            title={d.title}
            date={d.date}
            href={`/docs/${d.slug}`}
          />
        ))}
      </ol>
      <Link href="/docs" className="act-start__more">{ACT_START.cta}</Link>
    </section>
  );
}
