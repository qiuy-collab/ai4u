/**
 * 部署提示词页的元数据。
 * 正文在 public/prompt/<slug>.txt——网页（app/prompt/[slug]）与纯文本共用同一份内容，
 * 便于 Agent 直接读取 .txt 或用户从页面复制。
 */
export interface PromptMeta {
  slug: string;
  title: string;
  summary: string;
}

export const PROMPTS: PromptMeta[] = [
  {
    slug: "github_page",
    title: "部署到 GitHub Pages",
    summary: "把下面这段提示词复制给 Agent，它会带你一步步完成部署。",
  },
  {
    slug: "cloudflare_page",
    title: "部署到 Cloudflare Pages",
    summary: "把下面这段提示词复制给 Agent，它会带你一步步完成部署。",
  },
];
