# AGENT.md — AI4U 官网项目说明

给 AI agent 与新协作者的项目速览。改代码前先读「硬约束」，这里的规则都来自真实返工教训，不是风格偏好。

## 项目是什么

AI4U（AI for You）——学生自组织的 AI 交流社区官网。**面向大众**，不绑定任何学校或组织，文案里禁止出现专名（学校名、社团名）。

- 三类页面：首页（滚动叙事落地页）/ 内容列表 `/docs` / 阅读页 `/docs/[slug]`，外加 404 与 OG 图
- 100% 静态站点，无服务端逻辑，无数据库，内容全部在 `content/` 数据文件里

## 硬约束（违反 = 返工）

1. **文案口径**：面向大众、平视、轻承诺，像朋友说话。禁止「包学会 / 高薪就业 / 名企内推」类绝对化承诺；禁止「学生 / 教室 / 作业」等身份限定词；禁止「一群好奇的人 / 宏大叙事」类 AI 腔句式。
2. **事实空位处理**：未确认的事实（群号、日期、人数）在数据文件里保持**空字符串**，组件按空值**不渲染该字段**。禁止把 `—`、`[占位]`、「待更新」以外的任何提示性文字渲染到页面上，禁止编造数据。
3. **reduced-motion 硬验收**：所有动画元素在 `prefers-reduced-motion` 下必须完整可见，不允许内容卡在 `opacity: 0`。实现手法：动画 `from` 态只写在 keyframes 里，绝不写进元素静态规则。
4. **零动画库**：动效全部用 CSS（`animation-timeline: view()/scroll()` 等），`package.json` 里没有也不允许加入 framer-motion / gsap。
5. **样式层级**：`app/globals.css` 是三级 token 层（primitive → semantic → component），组件 CSS 只准读 semantic 层。`@layer` 顺序 `base < components < motion < overrides`——覆盖 motion 层的规则必须放 `overrides`（历史上两次因放错层导致覆盖失效）。
6. **暗色模式明确不做**：纸白身份是设计核心，`color-scheme: light`，别加 dark 分支。

## 目录

```
content/site.ts        全站文案数据 + 待补事实（改文案先来这里）
content/docs/*.md      教程文档源文件（frontmatter + markdown，见下方「新增教程」）
content/docs.ts        md loader：构建时读取 content/docs/*.md 编译为 HTML（保持 DOCS/getDoc/getAdjacent 导出）
app/               路由：layout / page(首页) / docs / docs/[slug] / not-found / opengraph-image
app/globals.css    token 层 + @layer 顺序 + 动效 token
components/ui/     可复用组件（nav / footer / JoinCard / PromptLine…）
components/sections/  首页各幕（ActWhat / ActDoing / ActStart / ActJoin）
scripts/probe.mjs  验收 probe：溢出 / reduced-motion 可见性 / h1 / lang 扫描
```

## 新增教程（md 工作流）

在 `content/docs/` 新建 `<slug>.md`（**文件名即 URL slug**，slug 已上线的文件不要改名）：

```markdown
---
title: 标题
category: tutorial   # tutorial | path | activity（categoryLabel 自动映射：教程/路径/活动）
date: ""             # 未定稿保持空串，页面自动不渲染；定稿后写 YYYY-MM-DD
minutes: 6
summary: 一句话摘要
order: 4             # 列表页与上/下一篇的排序号
---

正文 markdown（支持 GFM：列表/表格/删除线）。两个约定：
- 提示块写 `> [!NOTE] xxx` → 渲染为高亮 aside；金句/引用直接 `> xxx` → 渲染为大字引用
- 图片放 `public/images/docs/<slug>/`，md 里写 `/images/docs/<slug>/x.png`；
  GitHub Pages 构建会自动补 `/ai4u` 前缀，本地不用写
```

改 md 后：本地 dev 需**重启**（loader 在模块顶层只执行一次）；生产 push 后 CI 全新构建无影响。
新增依赖解析管线（unified/remark 系 + gray-matter）都在构建期跑，浏览器零开销。

## 常用命令

```bash
npm install        # 见下方网络坑
npm run dev        # http://localhost:3000
npm run build      # production build（13 页全静态）
npm start          # 跑 production build
node scripts/probe.mjs   # 验收 probe（BASE_URL 默认 3111，用系统 Edge，先 npm start -p 3111）
```

## 已知环境坑（Windows 本机）

1. **代理挂空**：环境变量挂着 `HTTP(S)_PROXY=127.0.0.1:7890` 但系统代理开关是关的 → npm / curl / git 会静默挂死。装依赖或联网操作前清空代理变量：`env -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy <命令>`，npm 另加 `--registry=https://registry.npmmirror.com`。浏览器访问不受影响。
2. **dev 热更新会崩**：大改 `content/` 或 `next.config.ts` 后，正在跑的 dev server 大概率 500。重启它，别在 500 状态下判断代码好坏。
3. **端口残留**：重启 server 前先 `netstat -ano | grep :3000` 找 PID 清掉旧进程，否则抓到的是旧代码。

## 部署

GitHub Pages，`.github/workflows/deploy.yml` 自动部署：push 到 `main` → CI 以 `GITHUB_PAGES=true` 构建（此时启用 `output: 'export'` + `basePath: /ai4u`，本地构建不受影响）→ 部署到 `https://qiuy-collab.github.io/ai4u/`。

## 待补事实（上线前）

在 `content/site.ts`：

| 字段 | 现状 | 补什么 |
|---|---|---|
| `SITE.url` | `https://qiuy-collab.github.io/ai4u` | 已指向 Pages；换正式域名时改这里（影响 OG / canonical / sitemap） |
| `SITE.join.groupNumber` | 空串 | 真实 QQ 群号（补上后复制按钮自动出现） |
| `ACT_DOING.timeline[*].date` | 空串 | 活动真实日期（补上后日期行自动渲染） |

另有：真二维码图替换 join 卡占位框（`components/ui/JoinCard.tsx`）。品牌图（favicon / apple-icon / OG 卡）是 `public/` 静态文件，由 `node scripts/generate-assets.mjs` 生成，改设计后重跑脚本，不要再建 ImageResponse route（静态导出下产物为空目录，线上会 404）。
