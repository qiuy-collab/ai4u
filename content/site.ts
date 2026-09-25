export const SITE = {
  name: "AI4U",
  nameLong: "AI4U · AI for You",
  tagline: "把 AI 用成日常",
  url: "https://qiuy-collab.github.io/ai4u", // GitHub Pages 地址；换正式域名时改这里
  join: {
    groupLabel: "加入 AI4U",
    groupNumber: "", // 真实群号补上前保持空字符串——JoinCard 按空值降级：不渲染复制按钮，不假装可复制
    placeholderLabel: "QQ 群",
    note: "进群方式近期更新",
  },
} as const;

/* 右上角导航 — 只留两个入口 */
export const NAV = [
  { label: "文档", href: "/docs" },
  { label: "join us", href: "/#join" },
] as const;

export const HERO = {
  prompt: "想用 AI 做点什么？",
  titleLines: ["把 AI 用成日常", "工具归你"],
  scrollHint: "scroll ↓",
} as const;

export const ACT_WHAT = {
  prompt: "AI4U 是什么？",
  mega: "AI4U",
  // 拱形画廊：取自 /docs 教程的官方配图（public/images/docs/whats-agent/，已本地化）
  gallery: [
    { src: "/images/docs/whats-agent/pattern-enhanced-llm.png", alt: "增强 LLM 工作流示意" },
    { src: "/images/docs/whats-agent/pattern-agent-loop.png", alt: "Agent 循环示意" },
    { src: "/images/docs/whats-agent/skill-folder.jpg", alt: "Skill 目录结构" },
    { src: "/images/docs/whats-agent/skill-progressive.jpg", alt: "Skill 渐进式披露" },
    { src: "/images/docs/whats-agent/skill-trigger.jpg", alt: "Skill 触发机制" },
  ],
  // Agent 名词跑马灯（解释性短语不上首页）
  terms: ["Agent", "Context", "Prompt", "Skill", "Codex", "Claude Code", "MCP", "Tool Use"],
} as const;

export const ACT_JOIN = {
  prompt: "怎么加入？",
  mega: "Join|us",
  copyLabel: "复制群号",
  copiedLabel: "已复制",
} as const;

export const FOOTER = {
  blurb: "一伙人自己在维护，欢迎来聊。",
  nav: [
    { label: "首页", href: "/" },
    { label: "内容", href: "/docs" },
    { label: "加入", href: "/#join" },
  ],
  contact: "联系 AI4U",
  maintainer: "AI4U",
} as const;

export const DOCS_PAGE = {
  title: "内容",
  sub: "教程、学习路径和活动记录，都在慢慢攒。",
  categories: [
    { id: "all", label: "全部" },
    { id: "tutorial", label: "教程" },
    { id: "path", label: "路径" },
    { id: "activity", label: "活动" },
  ],
  empty: {
    title: "这个分类还没内容",
    body: "先去别的分类逛逛。",
  },
} as const;

export const NOT_FOUND = {
  prompt: "404",
  body: "这页不存在，或者还没被写出来。",
  back: "回到首页",
} as const;
