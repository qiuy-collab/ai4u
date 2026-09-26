import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { SITE } from "@/content/site";
import { PROMPTS } from "@/content/prompts";
import CodeCopy from "@/components/ui/CodeCopy";

/**
 * 部署提示词页（/prompt/[slug]）。
 * 页面直接输出 public/prompt/<slug>.md 的原始文本，不做渲染处理——
 * 与 /prompt/<slug>.md 直链共用同一份内容：
 * 用户从页面复制给 Agent，或让 Agent 直接读 .md 地址。
 * 只有两个 slug，静态导出时预生成。
 */

export function generateStaticParams() {
  return PROMPTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = PROMPTS.find((p) => p.slug === slug);
  if (!meta) return {};
  return { title: meta.title, description: meta.summary };
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = PROMPTS.find((p) => p.slug === slug);
  if (!meta) notFound();

  let body: string;
  try {
    body = fs.readFileSync(
      path.join(process.cwd(), "public", "prompt", `${slug}.md`),
      "utf8",
    );
  } catch {
    notFound();
  }

  return (
    <div className="prompt-page gutter">
      <article className="doc-main">
        <h1 className="sr-only">{meta.title}</h1>
        <p className="doc-meta mono">
          <span>部署提示词 · 原始文本</span>
          <a href={`${SITE.url}/prompt/${slug}.md`}>.md 原文</a>
        </p>
        <div className="doc-body">
          <pre>{body}</pre>
        </div>
        <CodeCopy />
      </article>
    </div>
  );
}
