# AI4U 社区官网

面向所有对 AI 好奇的人的学生自组织 AI 社区 AI4U（AI for You）官网。动效优先：签名概念是**「输入光标 + 荧光笔」——把页面做成一场正在进行的对话**。打字光标是稀缺装置：只在 hero 首次建立与 404 出现，打完即熄灭；各幕问题行是静态章节标签（PromptLine），动效词汇按幕分型——荧光笔划过 / 墨幕时间线 scrub / 教程索引逐行浮现，不重复同一节拍。

## 运行

```bash
npm install        # 若网络挂了代理：加 --registry=https://registry.npmmirror.com 并清空 HTTP(S)_PROXY
npm run dev        # http://localhost:3000
npm run build && npm start   # production
node scripts/probe.mjs       # 验收 probe（需 BASE_URL，默认 3111，用系统 Edge）
```

## 结构

- `content/site.ts` — 全站文案 + **所有待补占位**（上线前只改这个文件）
- `content/docs.ts` — 教程文档数据（后续可迁 MDX）
- `app/` — 路由（首页 / docs 列表 / docs/[slug] 阅读页 / 404 / OG / icons）
- `app/globals.css` — 三级 token 层（组件 CSS 只准读 semantic 层）
- `components/ui/` — 可复用组件；`components/sections/` — 首页各幕

## 动效栈（全部 rung ≤ 1.5，零动画库）

| 效果 | 机制 | reduced-motion |
|---|---|---|
| hero 逐词键入 | CSS keyframes（from 态不落静态规则） | delay 清零 → 直接终态 |
| hero 命令行打字（打完熄灭） | IntersectionObserver + 逐字（tick 内复查 reduce） | 直接显示全文，无光标 |
| Act3 教程索引逐行浮现 | CSS `animation-timeline: view()` scrub | 无动画 → 完整终态 |
| 荧光笔划过 | background-size transition | 立即全高亮 |
| 时间线生长/节点点亮 | CSS `animation-timeline: view()` | 无动画 → 完整终态 |
| 阅读进度条 | CSS `animation-timeline: scroll()` | 保留（输入映射，非自主运动） |
| 目录高亮 | CSS `scroll-target-group` | 保留（状态指示） |

## 上线前 checklist

1. `content/site.ts`：替换 `[加入方式占位：QQ 群号 / 二维码]`、`SITE.url` 改真实域名
2. `content/docs.ts`：替换全部 `[...]` 占位（见下方清单）、`join-card__qr` 换真二维码图
3. `app/opengraph-image.tsx` 目前是拉丁字排版（ImageResponse 缺中文字体），有品牌字体后可加中文
4. canonical：有域名后在 `layout.tsx` 加 `alternates.canonical`

## 待补占位清单（[…]）

见交付报告或 `content/site.ts` / `content/docs.ts` 内搜索 `[`。
