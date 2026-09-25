---
title: 如何用 AI 创建自己的网站
category: tutorial
date: 2026-09-25
minutes: 25
summary: 从选客户端、第一次对话，到弄懂前后端、把网站发布到 GitHub Pages 和 Cloudflare Pages——一份零基础也能跟完的完整路线。
order: 5
---

> 本文客户端配置、部署步骤均整理自各家官方文档，操作截图取自官方文档配图；全部来源见文末。价格与免费额度信息抓取于 2026 年 9 月，时效性强，动手前请以官方页面为准。

现在，一个没写过代码的人做出一个网站，路径已经非常短：**让 AI 写代码 → 在自己电脑上跑起来 → 发布到免费托管平台 → 把链接发给朋友**。这篇教程就按这条路线走。

## 一、第一步：选一个"Agent 客户端"

第一章我们说过，Agent 是"能自己动手干活的 AI"。**Agent 客户端**就是让你能安全使用这种 AI 的软件——它管着对话窗口、文件读写、权限审批这些事。写网站场景下，主流选择如下。

### 1.1 客户端推荐一览

| 客户端 | 形态 | 出品方 | 价格（2026-09 官方页面） | 备注 |
|---|---|---|---|---|
| Claude Code | 命令行 CLI（另有桌面端 / VS Code 插件 / 网页版） | Anthropic | 有免费档；Pro $20/月（年付折算 $17）、Max 自 $100/月 | 官方标注仅在 Anthropic 支持的国家/地区可用 |
| Cursor | 独立编辑器（VS Code 系） | Anysphere | Pro $20/月、Ultra $200/月（文档页未见免费档） | 全球用户量大，文档成熟 |
| Trae | 独立 IDE | 字节跳动 | 国内站：免费版 ¥0（每月 500 积分），Lite ¥49/月、Pro ¥99/月 | 有国内站 trae.cn，无需特殊网络 |
| 通义灵码 Lingma | VS Code/JetBrains 插件 + 独立 IDE | 阿里云 | 官网明示"个人免费使用" | 国内直连 |
| CodeBuddy | IDE / 插件 | 腾讯 | 国内站标注"限时免费个人版" | "限时"字样，注意时效 |

> [!NOTE] 关于价格
> 以上全部来自各家官方页面 2026 年 9 月的抓取结果。AI 工具定价变动极快（比如 CodeBuddy 的"限时免费"、Trae 的积分额度都可能随时调整），本文不承诺长期有效，购买前一定去官网核对。

**怎么选？** 简单说：

- 能正常使用国际服务、愿意付费 → **Claude Code 或 Cursor**，生态和教程最丰富；
- 在国内、想零成本先跑起来 → **Trae / 通义灵码 / CodeBuddy** 任选其一，体验已经很接近。

### 1.2 如何配置：以 Claude Code 为例

官方 Quickstart（[code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)）承诺 "This quickstart guide will have you using AI-powered coding assistance in a few minutes"。步骤如下：

1. **安装**（Windows PowerShell 中执行）：
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
   macOS / Linux 用户则是：
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```
   官方系统要求：Windows 10 1809+ / macOS 13+，4GB 以上内存；Windows 原生环境建议先装好 Git for Windows。

2. **验证安装**：终端里运行 `claude --version`，能打印版本号即成功。

3. **登录**：运行 `claude`，会拉起浏览器完成账号登录（支持 Pro / Max 订阅，或 API 按量计费）。

Cursor 的配置更简单：去 [cursor.com/downloads](https://cursor.com/downloads) 下载安装包，打开、登录账号即可，和你装任何一款编辑器没有区别。

### 1.3 开启第一次对话

以官方 Quickstart 建议的流程为准：

1. 在终端 `cd` 进入你的项目文件夹（哪怕它现在是空的），运行 `claude`；
2. 第一句话不用紧张，官方给的新手例句就是：**"what does this project do?"**（这个项目是干嘛的？）——先让 AI 认识环境；
3. 然后布置第一个小任务，官方例句：**"add a hello world function to the main file"**（往主文件里加一个 hello world 函数）；
4. AI 每次要读写文件、执行命令前都会**请求你的批准**，看一眼没问题就选 Yes——这道权限审批就是客户端替你把的安全关；
5. 常用会话命令：`/help` 看帮助、`/clear` 清空上下文、`/exit` 退出。

官方给新手的建议很朴素：需求写具体、复杂任务拆成小步、让 AI 先读代码再动手。

> [!NOTE] 国内使用的现实变量
> Claude Code 官方系统要求中明确包含 "Location: Anthropic supported countries"，即存在地区可用性限制；此外 GitHub Pages、Cloudflare Pages 在国内的可访问性也时好时坏。如果你在国内且没有相关条件，**Trae / 通义灵码 / CodeBuddy 就是为此准备的路线**，本篇后续的部署部分同样适用——代码写法不挑客户端。少数派作者在《Claude Code：防封号、模型选择与设计哲学》（sspai.com/post/108063）里对这些现实障碍有更详细的讨论。

## 二、前端和后端是什么？本地和线上有什么区别？

让 AI 写代码之前，花三分钟搞懂两组概念，你就能听懂它接下来跟你说的大部分"黑话"。

### 2.1 前端与后端

MDN（Mozilla 开发者网络）在《客户端-服务器概述》里的讲法（[developer.mozilla.org/zh-CN](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview)）：你在浏览器里点链接、提交表单时，"浏览器发送一个 HTTP 请求给服务器"，服务器处理后把结果送回来。这条链路的两端，就是——

- **前端（Front-end）**：跑在**用户浏览器里**的部分。页面长什么样、按钮放哪、动画怎么动，都是前端的活。技术栈通常是 HTML + CSS + JavaScript。
- **后端（Back-end）**：跑在**服务器上**的部分。用户注册的账号存哪、两个用户之间怎么互发消息，这类需要"一部大家都连得上的机器"来统一保管的逻辑和数据，就是后端。

一个直观判断法：**展示给所有人看的东西靠前端；要"记账"的东西靠后端。**

好消息是：个人作品集、博客、活动页、产品介绍这类网站，**只靠前端就够了**——这也是为什么本教程的部署方案全都是"静态托管"（后面细讲）。MDN 对静态站点的定义：

> 静态站点是指每当请求一个特定的资源时，会从服务器返回相同的硬编码内容……静态站点的服务器只需要处理 GET 请求，因为服务器不存储任何可修改的数据。

### 2.2 本地部署与线上部署

- **本地（localhost）**：网站只跑在你自己电脑上，浏览器访问 `http://localhost:3000` 这类地址。只有你能看到，关掉程序就没了。这是**开发调试**用的。
- **线上（部署 / Deployment）**：把网站文件放到一台**永远在线的服务器**上，任何人通过网址都能访问。MDN《发布你的网站》对托管的定义："Web 托管服务是指在托管服务提供商的 Web 服务器上租用的文件空间。你将网站文件上传到 Web 服务器，然后 Web 服务器向网站用户提供网站内容。"（[MDN 原文](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Getting_started/Your_first_website/Publishing_your_website)）

记住这个关系：**本地 = 车间，线上 = 展厅**。在车间里怎么改都行，改满意了再送去展厅。而"每次把本地改动送到线上"这个动作，好平台已经帮你做成了自动的——这正是下面两节的内容。

## 三、让别人看到你的网站：GitHub Pages 与 Cloudflare Pages

两家都是**免费**的静态站点托管服务，都能做到"你一推代码，网站自动更新"。区别主要在细节和国内可访问性。

### 3.1 方案 A：GitHub Pages

GitHub Pages 的官方定义："a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website"（直接从你的 GitHub 仓库取网页文件，可选地跑一遍构建，然后发布成网站）。来源：[docs.github.com/en/pages/quickstart](https://docs.github.com/en/pages/quickstart)。

**准备工作**：注册一个 GitHub 账号（github.com）。

**步骤（个人主页站，官方 Quickstart 原流程）**：

1. 登录 GitHub，点右上角 **+** → **New repository** 新建仓库；
2. 仓库名**必须**填 `你的用户名.github.io`（比如用户名叫 octocat，就填 `octocat.github.io`），选 Public，勾选 "Add a README"，点创建；
3. 进入仓库 **Settings → 左侧 Pages**；
4. 在 "Build and deployment" 下，Source 选 **Deploy from a branch**；
5. 在 Branch 下拉框里选 `main` 分支，点 Save；

![在 GitHub 上新建 username.github.io 仓库](/images/docs/ai-create-website/github-create-repo.png)

*图：新建仓库时填写 `octocat.github.io` 形式的仓库名。来源：GitHub 官方文档*

![在 Pages 设置里选择发布分支](/images/docs/ai-create-website/github-pages-source.png)

*图：Settings → Pages → Branch 下拉选择发布分支。来源：GitHub 官方文档*

6. 等待发布——官方提醒**推送后最多可能需要 10 分钟**；
7. 访问 `https://你的用户名.github.io`，你的网站就上线了。

之后每次把新代码 push 到 `main` 分支，网站会自动重新发布。如果你做的是普通项目站（不是个人主页站），流程一样，只是仓库名随意，访问地址变成 `你的用户名.github.io/仓库名`。

**两个官方明示的限制**（来源：[GitHub Pages 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)）：

- 只支持静态内容："GitHub Pages does not support server-side languages such as PHP, Ruby, or Python"——不支持 PHP/Ruby/Python 等服务端语言（对纯前端网站无影响）；
- 入口文件必须是 `index.html`、`index.md` 或 `README.md`，且位于发布目录顶层。

> [!NOTE] 用框架（如 Next.js）时多一步
> 如果你让 AI 用 Next.js 这类框架建站，发布前需要"静态导出"：在 `next.config` 里设置 `output: 'export'`，构建后得到一个 `out/` 文件夹（官方文档：nextjs.org/docs，Static Exports 章节）。把这个文件夹的内容作为发布物时，官方文档建议在发布源根目录放一个空的 `.nojekyll` 文件——GitHub Pages 默认会用 Jekyll 处理文件，可能吞掉下划线开头的资源目录。这些细节直接告诉 AI"帮我配置成可部署到 GitHub Pages 的静态导出"即可，它会处理。

### 3.2 方案 B：Cloudflare Pages

Cloudflare Pages 同样免费，走的是"**连接 GitHub 仓库、自动构建发布**"的路线。官方 Getting started（[developers.cloudflare.com/pages/get-started](https://developers.cloudflare.com/pages/get-started/)）的 Git 集成流程：

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)，进入 **Workers & Pages**；
2. **Create application → Pages → Connect to Git**；
3. 授权连接你的 GitHub 账号，选中放网站代码的那个仓库；
4. 填写 **Project name**（决定你的网址，形如 `项目名.pages.dev`）和 **Production branch**（一般选 `main`）；
5. 设置**构建命令**和**输出目录**：纯 HTML/CSS 站点两处都留空；用框架的话，页面里有现成预设可选；

![Cloudflare Pages：填写项目名与生产分支](/images/docs/ai-create-website/cloudflare-configuration.png)

*图：Set up builds and deployments 页面。来源：Cloudflare 官方文档*

![Cloudflare Pages：构建命令与输出目录设置](/images/docs/ai-create-website/cloudflare-build-settings.png)

*图：构建设置。纯静态站点可全部留空。来源：Cloudflare 官方文档*

6. 点 **Save and Deploy**，盯着构建日志跑完——

![首次部署的构建日志](/images/docs/ai-create-website/cloudflare-deploy-log.png)

*图：首次部署日志。来源：Cloudflare 官方文档*

7. 完成后你会拿到 `https://你的项目名.pages.dev` 的网址，之后每次 push 到 `main` 都自动重新部署，其他分支会生成预览版本。

![部署完成后的站点仪表盘](/images/docs/ai-create-website/cloudflare-site-dashboard.png)

*图：部署完成后的项目仪表盘。来源：Cloudflare 官方文档*

> [!NOTE] 如实说明
> Cloudflare 官方文档顶部目前有一条提示："Workers supports most Pages use cases and offers a broader feature set. Start new projects with Workers."——Cloudflare 正在把新项目引向自家的 Workers 产品线，Pages 仍在服务但属于上一代产品线。对本文读者（静态站）而言 Pages 依旧够用且流程最简单，但你需要知道这个动向。

### 3.3 免费额度与限制对比

数据均来自两家官方 limits 页面（抓取于 2026-09）：

| 项目 | GitHub Pages（免费） | Cloudflare Pages（免费） |
|---|---|---|
| 站点大小 | 源仓库与发布站点均建议 ≤ 1 GB | 每站最多 20,000 个文件；单文件 ≤ 25 MiB |
| 流量（带宽） | 软限制 100 GB/月 | 官方明示 unlimited（不限） |
| 构建次数 | 软限制 10 次/小时 | 500 次/月 |
| 站点数量 | 每账户 1 个个人站 + 每仓库 1 个项目站 | 每账户 100 个项目 |
| 自定义域名 | 支持 | 支持（每项目最多 100 个） |

来源：[GitHub Pages Limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) / [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)

对个人网站来说，两家的免费额度都远远用不完。**怎么选**：想要"用户名.github.io"这种经典地址、代码本来就放 GitHub → 选 GitHub Pages；更在意国内访问速度、想要更多站点 → 先试 Cloudflare Pages（`*.pages.dev` 在国内的可达性历史上好于 `*.github.io`，但同样不保证稳定，重要项目建议绑定自己的域名）。

## 四、Design Skills：让网站看起来不像"AI 做的"

到这里，你已经能上线一个网站了。但还有一个常见问题：**AI 默认生成的页面，总有一种"一眼 AI"的气质**——居中的大标题、紫色渐变、清一色圆角卡片。这一节讲怎么用 Skills 解决它。

### 4.1 先看"没用"的：AI 的默认审美长什么样

有意思的是，这份"反面教材"来自 Anthropic 官方 Skill 仓库本身。官方的 frontend-design 技能（[github.com/anthropics/skills](https://github.com/anthropics/skills)，`skills/frontend-design/SKILL.md`）里点名了一批典型的"模板脸"特征：

- 米色底（#F4F1EA）+ 衬线大标题 + 陶土色点缀；
- 近黑背景 + 荧光绿 / 朱红高亮；
- SaaS 风圆角卡片 + 统一的灰色阴影；
- 全大写的眉题标签（eyebrow text）；
- "01 / 02 / 03" 式的装饰性编号；
- 每张卡片清一色 fade-up 入场动画。

官方另一个技能 web-artifacts-builder 写得更直白：

> To avoid what is often referred to as 'AI slop', avoid using excessive centered layouts, purple gradients, uniform rounded corners, and Inter font.
> （为了避免所谓的"AI 垃圾感"，避免过度居中的布局、紫色渐变、千篇一律的圆角，以及 Inter 字体。）

对照你见过的 AI 生成页面，是不是句句命中？

### 4.2 "用了"之后：Skill 提供的是设计判断力

frontend-design 技能的自述是："Guidance for distinctive, intentional visual design when building new UI... Helps with aesthetic direction, typography, and making choices that don't read as templated defaults."（为 UI 构建提供"有主见的、有意图的"视觉设计指导……帮助确定美学方向、字体排印，做出不像模板默认值的选择。）

**"没用 / 用了"的效果对比**（基于官方 Skill 文件的判据整理）：

| 维度 | 没用 design skill | 用了 design skill |
|---|---|---|
| 配色 | 从训练数据里取最常见的：米色+陶土色，或黑底荧光绿 | 按内容确定美学方向，字体、间距、颜色构成一个自洽的体系 |
| 字体 | 默认 Inter / system-ui | 有意识选择与品牌气质匹配的字体组合 |
| 布局 | 居中 hero + 三列卡片 + 大圆角 | 结构服务于内容节奏，避免"模板脸"清单里的每一项 |
| 动效 | 每个卡片都来一遍 fade-up | 动效有目的、有节制 |

> [!NOTE] 关于"对比示例"的诚实说明
> 我们检索时**未能找到**严格控制的第三方 A/B 对比实验（同一需求、分别用/不用 skill 生成的对照研究）。上表整理自官方 Skill 文件中自带的判据——它本身就是官方对"默认输出"与"期望输出"差异的描述。最可靠的验证方式是你自己各生成一版对比：同一个建站需求，先直接生成，再加载 frontend-design 技能重新生成，差异通常一眼可见。

### 4.3 怎么装、怎么用

- **Claude Code 用户**：官方 Skill 仓库（github.com/anthropics/skills） clone 或下载后，把需要的技能文件夹放进 `~/.claude/skills/`（全局）或项目的 `.claude/skills/`，之后 AI 会在设计相关任务时自动取用（机制详见上一篇教程的 Skills 章节）。
- **claude.ai 网页用户**：Settings > Features 里以 zip 上传（需 Pro 及以上套餐且开启代码执行）。
- 另一个思路：不装技能，而是**在 Prompt 里手工注入同样的判断力**——把 4.1 那份"模板脸"清单贴进提示词，要求逐条规避。效果打折扣（Prompt 是一次性的、Skill 是固化的），但零门槛。

## 五、路线总结与常见坑

把整条路线串起来：

```
选客户端 → 第一次对话 → AI 写出代码 → 本地预览（localhost）
        → 推到 GitHub → 连接 GitHub Pages / Cloudflare Pages → 网址发给朋友
```

新手最容易踩的几个坑：

1. **本地能跑，线上打不开**：九成是"只部署了源代码、没做静态导出"，或发布目录选错。把报错原样贴给 AI，让它修。
2. **GitHub Pages 部分样式丢失**：检查根目录有没有 `.nojekyll`（见 3.1 的 NOTE）。
3. **改了代码网站没更新**：部署是"push 后自动触发"的，确认代码真的 push 上去了；GitHub Pages 官方提醒发布最长可能等 10 分钟。
4. **在国内访问不到**：`github.io` 与 `pages.dev` 的可达性都不是 100% 稳定，正式使用建议绑定自定义域名，或选用国内托管方案（需备案）。
5. **忘了审批权限**：客户端每次动文件都会请求批准，看不懂就先让它解释再决定——这道关是你的安全带，别习惯性全选 Yes。

## 参考与延伸阅读

**官方文档（本文操作步骤依据）**

1. Claude Code Quickstart / Setup：https://code.claude.com/docs/en/quickstart ；https://code.claude.com/docs/en/setup
2. Claude 价格页：https://www.claude.com/pricing
3. Cursor 文档与定价：https://cursor.com/docs/get-started/quickstart ；https://cursor.com/docs/models-and-pricing
4. Trae 国内官网与定价：https://www.trae.cn ；文档 https://docs.trae.cn
5. 通义灵码：https://tongyi.aliyun.com/lingma
6. CodeBuddy：https://www.codebuddy.cn
7. MDN《客户端-服务器概述》：https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview
8. MDN《发布你的网站》：https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Getting_started/Your_first_website/Publishing_your_website
9. GitHub Pages Quickstart / 创建站点 / 限制：https://docs.github.com/en/pages/quickstart ；https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
10. Next.js Static Exports：https://nextjs.org/docs/app/building-your-application/deploying/static-exports
11. Cloudflare Pages Getting Started / 限制：https://developers.cloudflare.com/pages/get-started/ ；https://developers.cloudflare.com/pages/platform/limits/
12. Anthropic 官方 Skills 仓库：https://github.com/anthropics/skills

**中文教程（借鉴对象）**

13. 《38 岁从 0 开始，我如何在 AI 辅助下做出自己的 App》，少数派：https://sspai.com/post/97076
14. 《AI 真能替代程序员？文科生零手写代码开发实践》，少数派：https://sspai.com/post/104542
15. 《2026 年 AI 编程工具横评》，掘金：https://juejin.cn/post/7605494530017280040
16. 《Claude Code：防封号、模型选择与设计哲学》，少数派：https://sspai.com/post/108063

**图片版权说明**：本文截图均来自 GitHub Docs 官方仓库与 Cloudflare 官方文档，版权归原作者所有，此处按教学引用标注来源。
