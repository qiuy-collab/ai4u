import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { SITE } from "@/content/site";
import { PROMPTS } from "@/content/prompts";

/**
 * 部署提示词页（/prompt/[slug]）。
 * 纯文本源在 public/prompt/<slug>.txt——网页与 .txt 共用同一份内容：
 * 用户把页面里的提示词复制给 Agent，或让 Agent 直接读取 .txt 地址。
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
      path.join(process.cwd(), "public", "prompt", `${slug}.txt`),
      "utf8",
    );
  } catch {
    notFound();
  }

  return (
    <div className="prompt-page gutter">
      <article className="doc-main">
        <header>
          <p className="doc-meta mono">
            <span>部署提示词</span>
          </p>
          <h1 className="doc-title">{meta.title}</h1>
          <p className="doc-summary">{meta.summary}</p>
        </header>
        <div className="doc-body">
          <p>
            纯文本地址（方便 Agent 直接读取）：
            <code>
              {SITE.url}/prompt/{slug}.txt
            </code>
          </p>
          <pre>{body}</pre>
        </div>
      </article>
    </div>
  );
}
