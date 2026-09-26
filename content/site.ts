export const SITE = {
  name: "AI4U",
  nameLong: "AI4U · AI for You",
  tagline: "把 AI 用成日常",
  url: "https://qiuy-collab.github.io/AI4U", // GitHub Pages 地址；换正式域名时改这里
  join: {
    groupLabel: "微信群",
    hint: "扫码进群，和我们一起聊 AI",
    qr: "/wechat-group-qr.png", // 组件层路径，Pages 构建下由 NEXT_PUBLIC_ASSET_PREFIX 补前缀
    qrAlt: "AI4U 微信群二维码",
  },
} as const;

/* 站点仓库地址 — 导航栏 GitHub 图标入口 */
export const REPO = "https://github.com/qiuy-collab/AI4U";

/* 右上角导航 — 只留两个入口 */
export const NAV = [
  { label: "文档", href: "/docs" },
  { label: "Join us", href: "/#join" },
] as const;

export const HERO = {
  prompt: "想用 AI 做点什么？",
  titleLines: ["把 AI 用成日常"],
  scrollHint: "scroll ↓",
} as const;

export const ACT_WHAT = {
  // Agent 名词弧形跑马灯（解释性短语不上首页；提问行文案按需求删除）
  terms: ["Agent", "Context", "Prompt", "Skill", "Codex", "Claude Code", "MCP", "Tool Use"],
} as const;

export const ACT_JOIN = {
  prompt: "怎么加入？",
  mega: "Join|us",
} as const;

export const FOOTER = {
  blurb: "", // 空串 = 页脚不渲染该行（口径见 AGENT.md「事实空位处理」）
  nav: [
    { label: "首页", href: "/" },
    { label: "内容", href: "/docs" },
    { label: "Join us", href: "/#join" },
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
