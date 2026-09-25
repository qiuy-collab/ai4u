import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOCS, getAdjacent, getDoc, type DocBlock } from "@/content/docs";

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

/** 正文块渲染 — 阅读页正文区不做任何滚动动画（需求硬约束）。 */
function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "h2": {
      const id = encodeURIComponent(block.text);
      return <h2 id={id}>{block.text}</h2>;
    }
    case "list":
      return (
        <ul>
          {block.items.map((it) => (
            <li key={it.slice(0, 16)}>{it}</li>
          ))}
        </ul>
      );
    case "note":
      return <aside className="doc-note">{block.text}</aside>;
    case "quote":
      return <blockquote className="doc-quote">{block.text}</blockquote>;
    default:
      return <p>{block.text}</p>;
  }
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
  const toc = doc.blocks.filter((b): b is Extract<DocBlock, { type: "h2" }> => b.type === "h2");
  const dateKnown = !doc.date.includes("["); // 占位日期不标注为最后编辑日

  return (
    <div className="doc-page gutter">
      {/* 阅读进度：CSS scroll-driven（rung 1.5），不支持的浏览器直接没有这条线 */}
      <div className="doc-progress" aria-hidden="true" />

      <article className="doc-main">
        <header>
          <p className="doc-meta mono">
            <span>{doc.categoryLabel}</span>
            <span aria-hidden="true">/</span>
            <time>{dateKnown ? `最后编辑 ${doc.date}` : doc.date}</time>
            <span aria-hidden="true">/</span>
            <span>约 {doc.minutes} 分钟</span>
          </p>
          <h1 className="doc-title">{doc.title}</h1>
          <p className="doc-summary">{doc.summary}</p>
        </header>
        <div className="doc-body">
          {doc.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
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

      {toc.length > 0 && (
        <aside className="doc-toc" aria-label="本页目录">
          <p className="doc-toc__label">本页目录</p>
          <nav>
            <ul>
              {toc.map((h) => (
                <li key={h.text}>
                  <a href={`#${encodeURIComponent(h.text)}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}
