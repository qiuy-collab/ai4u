import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

/**
 * 教程文档 = content/docs/*.md（构建时读取编译，零运行时开销）。
 * - slug = 文件名（不含 .md）
 * - frontmatter: title / category / date(""=未定稿不渲染) / minutes / summary / order
 * - 正文 markdown：`> [!NOTE] xxx` 渲染为 <aside class="doc-note">，普通 `>` 引用渲染为
 *   <blockquote class="doc-quote">；图片放 public/images/docs/<slug>/，md 里写 /images/... 绝对路径，
 *   GITHUB_PAGES 构建时自动加 /AI4U 前缀。
 * 改 md 后：dev 需重启（模块顶层只执行一次），生产走完整 build 无影响。
 */

export type DocCategory = "tutorial" | "path" | "activity";

const CATEGORY_LABEL: Record<DocCategory, string> = {
  tutorial: "教程",
  path: "路径",
  activity: "活动",
};

export interface TocItem {
  id: string;
  text: string;
}

export interface Doc {
  slug: string;
  category: DocCategory;
  categoryLabel: string;
  title: string;
  date: string; // 空字符串 = 尚未定稿日期，阅读页与列表页均不渲染该字段
  minutes: number;
  summary: string;
  /** 编译后的正文 HTML（构建期生成；仅由本仓库内容产出，无外部输入） */
  html: string;
  toc: TocItem[];
}

/** 最小 hast 节点形状（只要够用，不引 @types/hast） */
interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/** `> [!NOTE] xxx` → <aside class="doc-note">；其余 blockquote → class="doc-quote"。 */
function rehypeCallouts() {
  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      for (const child of node.children ?? []) {
        if (child.type === "element" && child.tagName === "blockquote") {
          // blockquote 的 children 里首项可能是换行 text（remark-rehype 产物），须查找第一个 <p>
          const first = (child.children ?? []).find((c) => c.type === "element" && c.tagName === "p");
          const text0 = first?.children?.[0];
          const raw = text0?.type === "text" ? text0.value ?? "" : "";
          if (/^\s*\[!NOTE\]/.test(raw)) {
            text0!.value = raw.replace(/^\s*\[!NOTE\]\s*/, "");
            child.tagName = "aside";
            child.properties = { className: "doc-note" };
            // 摊平首个 <p>：doc-note 的既有样式期望内容为裸文本
            const pChildren = first!.children ?? [];
            const rest = (child.children ?? []).filter((c) => c !== first);
            child.children = [...pChildren, ...rest];
          } else {
            child.properties = { ...child.properties, className: "doc-quote" };
          }
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

/** 从编译后的 HTML 提取 h2 目录（id 与 rehype-slug 产出天然一致） */
function extractToc(html: string): TocItem[] {
  const toc: TocItem[] = [];
  const re = /<h2 id="([^"]*)">([\s\S]*?)<\/h2>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) toc.push({ id: m[1], text: m[2] });
  return toc;
}

/** md 里的站内绝对路径在 GitHub Pages 构建下补 basePath（静态导出不改写裸 <img src>） */
function applyBasePath(html: string): string {
  const base = process.env.GITHUB_PAGES === "true" ? "/AI4U" : "";
  if (!base) return html;
  return html.replace(/(src|href)="\/((?!\/)[^"]*)"/g, `$1="${base}/$2"`);
}

/**
 * frontmatter 的 `date: 2026-09-26` 会被 YAML 解析成 Date 对象，直接 String() 会渲染出
 * "Sat Sep 26 2026 08:00:00 GMT+0800 (中国标准时间)" 这种完整 ISO 串（构建机时区不同还会差一天）。
 * 统一格式化为 YYYY-MM-DD；取 UTC 值，保证本地构建与 UTC 的 CI 构建结果一致。
 * 非 Date 值（空串 / "[待定]" 这类占位）原样保留。
 */
function formatDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function compileDoc(slug: string, raw: string): { doc: Doc; order: number } {
  const { data, content } = matter(raw);
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeCallouts)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(content);

  const html = applyBasePath(String(file));
  const category = (data.category ?? "tutorial") as DocCategory;
  const doc: Doc = {
    slug,
    category,
    categoryLabel: CATEGORY_LABEL[category],
    title: String(data.title ?? slug),
    date: formatDate(data.date),
    minutes: Number(data.minutes ?? 0),
    summary: String(data.summary ?? ""),
    html,
    toc: extractToc(html),
  };
  return { doc, order: Number(data.order ?? 0) };
}

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

const DOCS: Doc[] = fs
  .readdirSync(DOCS_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => compileDoc(f.replace(/\.md$/, ""), fs.readFileSync(path.join(DOCS_DIR, f), "utf8")))
  .sort((a, b) => a.order - b.order)
  .map((e) => e.doc);

export { DOCS };

export function getDoc(slug: string): Doc | undefined {
  return DOCS.find((d) => d.slug === slug);
}

export function getAdjacent(slug: string): { prev?: Doc; next?: Doc } {
  const i = DOCS.findIndex((d) => d.slug === slug);
  return {
    prev: i > 0 ? DOCS[i - 1] : undefined,
    next: i >= 0 && i < DOCS.length - 1 ? DOCS[i + 1] : undefined,
  };
}
