import type { Metadata } from "next";
import PromptLine from "@/components/ui/PromptLine";
import DocsIndex from "@/components/docs/DocsIndex";
import { DOCS } from "@/content/docs";
import { DOCS_PAGE } from "@/content/site";

export const metadata: Metadata = {
  title: "内容",
  description: DOCS_PAGE.sub,
};

/** 列表页 — Index / archive 宏结构：动效活在筛选与 hover 里，不在 section 里。 */
export default function DocsPage() {
  return (
    <div className="docs-index gutter">
      <header className="docs-head">
        <PromptLine text="内容索引" />
        <h1 className="docs-head__title">{DOCS_PAGE.title}</h1>
        <p className="docs-head__sub measure">{DOCS_PAGE.sub}</p>
      </header>
      <DocsIndex docs={DOCS} categories={DOCS_PAGE.categories} empty={DOCS_PAGE.empty} />
    </div>
  );
}
