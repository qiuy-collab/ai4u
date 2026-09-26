<div align="center">

<img src="public/apple-icon.png" alt="AI4U" width="96">

<img src="public/og.png" alt="AI4U · AI for You —— 把 AI 用成日常，工具归你" width="100%">

<p style="font-size:1.1em;color:#625f58;margin:20px 0 2px;">
  把 AI 用成日常，工具归你
</p>

<p style="font-size:.9em;color:#8a867e;margin:0 0 18px;">
  一伙人自己在维护的 AI 交流社区 · 不卖课 · 不画饼
</p>

<p align="center">
  <a href="https://qiuy-collab.github.io/ai4u/"><img src="https://img.shields.io/badge/%E5%BC%80%E5%A7%8B%E9%98%85%E8%AF%BB-ai4u-f05a28?style=for-the-badge&labelColor=111214" alt="开始阅读"></a>
  <a href="https://qiuy-collab.github.io/ai4u/docs/"><img src="https://img.shields.io/badge/%E5%86%85%E5%AE%B9%E7%9B%AE%E5%BD%95-3%20%E7%AF%87%E6%95%99%E7%A8%8B-151515?style=for-the-badge&labelColor=f05a28" alt="内容目录：3 篇教程"></a>
  <img src="https://img.shields.io/badge/%E5%8A%A8%E6%95%88-%E7%BA%AF%20CSS%20%C2%B7%20%E9%9B%B6%E5%8A%A8%E7%94%BB%E5%BA%93-151515?style=for-the-badge&labelColor=f6cf45" alt="纯 CSS · 零动画库">
</p>

</div>

## 这是什么

AI4U（**AI for You**）是一个面向所有对 AI 好奇的人的交流社区。

这里攒下来的是**自己动手做出来的东西**：怎么让 AI 真的把活干完，怎么从零做出一个能发给朋友的网站，怎么把 AI 用进日常办公。写下来的都是自己走过的路，不承诺你能学会什么，也不劝你买什么。

网站本身就是内容 👉 **[qiuy-collab.github.io/ai4u](https://qiuy-collab.github.io/ai4u/)**

## 目录

- [这是什么](#这是什么)
- [内容导航](#内容导航)
- [里面长什么样](#里面长什么样)
- [建议怎么读](#建议怎么读)
- [加入我们](#加入我们)
- [参与和反馈](#参与和反馈)
- [这个站是怎么做的](#这个站是怎么做的)

## 内容导航

目前公开三篇，都会持续更新：

| 内容 | 讲什么 | 大概要花 |
| :--- | :--- | :--- |
| [**What's Agent?**](https://qiuy-collab.github.io/ai4u/docs/whats-agent/) | 从「会聊天」到「能干活」：用官方文档和真实案例，把 Agent、Prompt、Context、Skills 四个概念讲清楚 | 18 分钟 |
| [**如何用 AI 创建自己的网站**](https://qiuy-collab.github.io/ai4u/docs/ai-create-website/) | 从选客户端、第一次对话，到弄懂前后端，再把网站发布到 GitHub Pages 和 Cloudflare Pages | 25 分钟 |
| [**AI 提效办公**](https://qiuy-collab.github.io/ai4u/docs/ai-office/) | 会议纪要、文档写作、PPT、表格、专业工作流，五个场景的真实案例与上手方法 | 14 分钟 |

> 三篇都在网站里按阅读版式排版，带目录、阅读进度和上/下一篇 —— [去 /docs 看全部](https://qiuy-collab.github.io/ai4u/docs/)

## 里面长什么样

<table>
  <tr>
    <td width="100%" align="center" valign="top">
      <img src="public/images/docs/whats-agent/pattern-agent-loop.png" width="100%" alt="Agent 循环示意图">
      <br>
      <sub>Agent 怎么把一件事从头跑到尾</sub>
    </td>
  </tr>
  <tr>
    <td width="100%" align="center" valign="top">
      <img src="public/images/docs/whats-agent/pattern-enhanced-llm.png" width="100%" alt="只有模型 与 接上工具之后 的对比">
      <br>
      <sub>只聊天，和接上工具之后，差别在哪</sub>
    </td>
  </tr>
</table>

## 建议怎么读

顺序没有硬规定，看你手头要解决什么：

- **完全没接触过** → 先看 [What's Agent?](https://qiuy-collab.github.io/ai4u/docs/whats-agent/)，把几个名词认全，后面会顺很多
- **想做个自己的网站** → [如何用 AI 创建自己的网站](https://qiuy-collab.github.io/ai4u/docs/ai-create-website/) 可以跟着一步步走
- **只想让日常的活快点干完** → [AI 提效办公](https://qiuy-collab.github.io/ai4u/docs/ai-office/) 里挑一个你最烦的场景试

## 加入我们

东西是公开的，人聚在 QQ 群里。

> **进群方式近期更新** —— 补好之后会写在这里，也会出现在[网站首页](https://qiuy-collab.github.io/ai4u/#join)的加入卡片上。

暂时进不了群也没关系，在[本仓库开个 issue](https://github.com/qiuy-collab/ai4u/issues/new) 一样能找到我们。

## 参与和反馈

- 教程哪里写错了、跟不上了 → [开个 issue](https://github.com/qiuy-collab/ai4u/issues/new)，说清是哪一篇哪一段
- 你有更好的做法 → 欢迎提 PR，也欢迎先发在群里聊
- 网站本身的毛病（排版、动效、无障碍）也都在这个仓库里，一样开 issue

## 这个站是怎么做的

给想改代码的人：这是一个静态站点，Next.js 15 + React 19，动效全部用纯 CSS（**零动画库**），内容放在 `content/`，push 到 `main` 由 GitHub Actions 自动发布到 GitHub Pages。

运行方式、目录结构、改内容的工作流、硬约束和已知的坑，都写在 **[AGENT.md](AGENT.md)** 里。

<div align="center">
  <sub>一伙人自己在维护，欢迎来聊。</sub>
</div>
