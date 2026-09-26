import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOCS, getAdjacent, getDoc } from "@/content/docs";

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.summary,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const { prev, next } = getAdjacent(slug);

  return (
    <div className="doc-page gutter">
      {/* 阅读进度：CSS scroll-driven（rung 1.5），不支持的浏览器直接没有这条线 */}
      <div className="doc-progress" aria-hidden="true" />

      <article className="doc-main">
        <header>
          <Link href="/docs" className="doc-back">← 返回内容列表</Link>
          <h1 className="doc-title">{doc.title}</h1>
          <p className="doc-summary">{doc.summary}</p>
        </header>
        {/* 移动端目录抽屉（桌面 display:none，桌面走右侧 sticky 目录）：
            details/summary 原生可弹出可收起，零客户端 JS */}
        {doc.toc.length > 0 && (
          <details className="doc-toc-drawer">
            <summary className="doc-toc-drawer__label mono">本页目录</summary>
            <nav aria-label="本页目录（移动端）">
              <ul>
                {doc.toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        )}
        {/* 正文 HTML 构建期由 markdown 编译生成（remark 管线），来源仅本仓库 content/docs/*.md */}
        <div className="doc-body" dangerouslySetInnerHTML={{ __html: doc.html }} />
        <nav className="doc-adjacent" aria-label="上一篇下一篇">
          {prev ? (
            <Link href={`/docs/${prev.slug}`} rel="prev">← 上一篇：{prev.title}</Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/docs/${next.slug}`} rel="next">下一篇：{next.title} →</Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      {doc.toc.length > 0 && (
        <aside className="doc-toc" aria-label="本页目录">
          <p className="doc-toc__label">本页目录</p>
          <nav>
            <ul>
              {doc.toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}
