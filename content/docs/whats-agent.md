---
title: What's Agent?
category: tutorial
date: 2026-09-25
minutes: 18
summary: 从"会聊天"到"能干活"：用官方文档和真实案例讲清楚 Agent、Prompt、Context 和 Skills 四个概念。
order: 4
---

> 本文对概念的界定均以 Anthropic 官方文档与工程博客为依据，中文解读参考了少数派等平台的优质教程，全部来源见文末"参考与延伸阅读"。

## 一、从"嘴替"到"打工人"：对话式 AI 与 Agent 的区别

你大概已经习惯了这样的 AI：你说一句，它答一句。问它问题，它给你答案；让它写点什么，它给你文字。这就是**对话式 AI（Chatbot）**——本质上是"一次提问、一次回答"的循环。

但如果你想让 AI"帮我把这 20 份简历按要求筛一遍，再把合格的整理成表格"，聊天窗口就开始吃力了。你需要的不是一个"嘴替"，而是一个能自己动手的"打工人"。这个能动手的，就是 **Agent（智能体）**。

两者最核心的区别，用少数派作者玉树芝兰的话说，是**自主性**和**任务闭环能力**：

> 智能体是一个能够自主『感知环境、进行规划决策、执行行动并自我反思』的系统……它和我们常见的聊天机器人或自动化脚本，最核心的区别就在于『自主性』和『任务闭环能力』。
> —— 少数派《去伪存真：聊聊 AI 智能体的定义、工具选择与避坑》（[sspai.com/post/101085](https://sspai.com/post/101085)）

举个具体的例子：同样是"顾客要退货"——

- **聊天机器人**：顾客问"怎么退货？"，它回答退货政策。然后呢？然后就没有然后了，事情还得顾客自己办。
- **Agent**：接到退货请求后，自己查订单、核对政策、生成退货单、通知物流、给顾客发确认。一整套流程做完，事情**闭环**了。

那 Agent 在技术上到底是什么？Anthropic 在工程博客《Building effective agents》里给了一个至今被广泛引用的区分：

> Workflows are systems where LLMs and tools are orchestrated through predefined code paths. Agents, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks.
> （工作流（Workflow）是 LLM 和工具沿着**预先写死的代码路径**被编排的系统；而 Agent 是 LLM **自己动态决定**过程和工具用法、自己掌控任务完成方式的系统。）
> —— Anthropic《Building effective agents》（[anthropic.com/engineering/building-effective-agents](https://www.anthropic.com/engineering/building-effective-agents)）

翻译成大白话：

- **对话式 AI**：一次 LLM 调用，一问一答，结束。
- **Workflow（工作流）**：人把流程写死（第 1 步干什么、第 2 步干什么），AI 只是流程里的"填空者"。
- **Agent**：你给它一个目标，它自己规划步骤、自己决定用哪些工具、自己检查做得对不对，循环往复直到任务完成。

Anthropic 对 Agent 运行本质的概括非常直白：

> They are typically just LLMs using tools based on environmental feedback in a loop.
> （它们通常就是"LLM 在循环中根据环境反馈使用工具"而已。）

![增强型 LLM：给大模型接上检索、工具、记忆三件套](/images/docs/whats-agent/pattern-enhanced-llm.png)

*图：The augmented LLM——Agent 的基本构件，就是"大模型 + 检索 + 工具 + 记忆"。来源：Anthropic《Building effective agents》*

![自主 Agent 的运行循环](/images/docs/whats-agent/pattern-agent-loop.png)

*图：Autonomous agent——拿到任务 → 查环境 → 用工具 → 检查结果 → 继续，直到完成。来源：同上*

> [!NOTE] Agent 不是魔法，它有代价
> Anthropic 在同一篇博客里明确提醒：Agent 用**延迟和成本**换任务表现——"Agentic systems often trade latency and cost for better task performance"，而且"自主性越高，成本越高，错误还可能像滚雪球一样累积（compounding errors）"。简单问题用对话解决就好，别为了用 Agent 而用 Agent。适合 Agent 的是那种"步骤多少没法提前预测"的开放式问题。

## 二、提示词（Prompt）：你和 AI 沟通的语言

### 2.1 Prompt 是什么

**Prompt（提示词）就是你发给 AI 的那段文字**——问题、指令、背景材料，都算。它决定了 AI 理解到的任务是什么。同一个模型，Prompt 写得好坏，输出质量可能天差地别。

给 Prompt 定方向这件事有个专门的名字：**Prompt Engineering（提示词工程）**。听起来唬人，但官方文档开宗明义：不是所有问题都值得调 Prompt——"Not every success criteria or failing eval is best solved by prompt engineering"（并非每个目标都得靠改提示词解决），有时候该换模型、该补上下文、该改流程。

### 2.2 官方给出的几条核心写法

以下要点整理自 Anthropic 官方《Prompting best practices》（[platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)）：

**① 把 AI 当成一个"很聪明但没有上下文的新员工"**。官方原话：

> Think of Claude as a brilliant but new employee who lacks context on your norms and workflows.

它不知道你们公司的规矩、不知道你脑中的默认前提。所以行业黑话、缩写、"按老规矩"，都得写明。

**② 黄金法则：先给同事看**。官方给出一个极实用的自检方法：

> Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too.
> （把你的提示词拿给一个不了解这个任务的同事看，问他能不能照着执行。如果他会懵，AI 也会懵。）

**③ 给例子（few-shot / multishot）**。官方认为这是"最可靠的方式之一"：

> Examples are one of the most reliable ways to steer Claude's output format, tone, and structure.

想让输出稳定成某种格式、某种语气，与其描述半天，不如直接给两三个例子。例子要相关、多样、结构一致。

**④ 复杂问题让它一步步想（思维链 / Chain of Thought）**。对于推理类任务，可以让模型先把思考过程写出来再给答案。不过官方也提示，新一代模型默认自带"自适应思考"，很多时候一句 "think thoroughly"（认真想想）比手写一步步的指令效果更好。

**⑤ 说"要做什么"，而不是"不要做什么"**。官方明确建议 "Tell Claude what to do instead of what not to do"——正向指令比一串禁令更有效。

**⑥ 结构化与角色**：复杂 Prompt 用 XML 标签把"背景资料 / 任务 / 要求"分区，模型解析得更清楚；在系统提示里给模型一个角色（如"你是一名耐心的助教"），能稳定它的语气和行为。

### 2.3 一个对比示例

❌ 模糊的 Prompt：

```
帮我写个通知。
```

✅ 清晰的 Prompt：

```
你是一名高校社团的运营负责人。请写一份活动改期通知：
- 活动：周六下午的 AI 工具工作坊
- 原因：场地冲突
- 改到：下周六同一时间同一地点
- 对象：社团成员微信群
- 要求：100 字以内，语气轻松但信息完整
```

区别不在文笔，而在**第二个版本补上了"新员工"需要的全部上下文**。

## 三、上下文（Context）：AI 的"工作记忆"

### 3.1 Context 是什么

你有没有发现：AI 聊着聊着，会"忘"了前面说过的话？这就要讲到**上下文窗口（Context Window）**。Anthropic 官方文档的定义：

> The 'context window' refers to all the text a language model can reference when generating a response, including the response itself. This is different from the large corpus of data the language model was trained on, and instead represents a 'working memory' for the model.
> （上下文窗口指模型在生成回复时能参考的**全部文本**——包括你发的每一条消息、它自己之前说过的话、贴进去的文档图片。它不是模型训练时"学进脑子"的知识，而是模型的"**工作记忆**"。）
> —— [platform.claude.com/docs/en/build-with-claude/context-windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)

![对话轮次不断累积，逐渐占满上下文窗口](/images/docs/whats-agent/context-window.svg)

*图：随着对话轮次增加，上下文窗口逐渐被占满。来源：Claude 官方文档（经 Internet Archive 验证的副本）*

理解"工作记忆"这个比喻，很多现象就都解释得通了：

- **为什么 AI 会"忘事"**：对话超出窗口后，最早的内容就"掉出"记忆了。
- **为什么每次开新对话要重新交代背景**：新会话的工作记忆是空白的。
- **为什么贴一份长文档后它突然变"聪明"**：因为相关材料进入了它的工作记忆，它不用靠猜。

### 3.2 上下文不是越多越好

直觉上"记忆越大越强"，但官方文档明确指出了一个反直觉的现象——**context rot（上下文腐烂）**：

> As token count grows, accuracy and recall degrade, a phenomenon known as context rot. This makes curating what's in context just as important as how much space is available.
> （随着内容增多，模型的准确率和召回率都会下降——这叫 context rot。所以"往上下文里放什么"和"窗口有多大"同样重要。）

也就是说：把整个文件夹一股脑塞给 AI，效果反而可能变差。**筛选**比**堆量**更重要。

### 3.3 什么会占用上下文

官方列得很全：系统提示、每一条消息（包括工具结果、图片、文档）、工具定义，甚至模型本轮生成的回复和思考过程，全都计入窗口。所以长对话越聊越"满"是必然的。

### 3.4 实用建议

- **一个任务开一个新对话**，别把所有事都聊在同一个窗口里——避免不相关的旧内容污染记忆。
- **贴材料时只贴相关部分**，或者先让 AI 摘要再深入。
- **长对话感觉 AI "变笨了"**，别硬续，把关键结论复制到新对话里重新开始。（现在不少产品会自动做"压缩（compaction）"——官方称其会"自动在服务端把对话较早部分做成摘要，让对话能突破窗口限制继续"，但压缩终归有损，关键信息最好自己保留。）

## 四、Skills：给 AI 的"入职手册"（本章重点）

### 4.1 Skills 是什么

想象公司来了个很聪明的新员工。你不会指望他天生就会按你们的规范出周报、走报销流程——你会给他一份**入职手册（onboarding guide）**。Anthropic 官方正是用这个比喻来解释 Skills 的：

> Building a skill for an agent is like putting together an onboarding guide for a new hire.
> （给 Agent 写一个 Skill，就像给新员工准备一份入职手册。）
> —— Anthropic《Equipping agents for the real world with Agent Skills》（[anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)）

官方定义：

> Agent Skills are modular capabilities that extend Claude's functionality. Each Skill packages instructions, metadata, and optional resources (scripts, templates) that Claude uses automatically when relevant.
> （Agent Skill 是扩展 AI 能力的模块化组件。每个 Skill 把**指令、元数据和可选资源（脚本、模板）**打包在一起，AI 在相关时自动取用。）
> —— [platform.claude.com/docs/en/agents-and-tools/agent-skills/overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

它和 Prompt 的区别，官方一句话说清：

> Unlike prompts (conversation-level instructions for one-off tasks), Skills load on demand, so you don't have to repeat the same guidance across conversations.
> （Prompt 是一次性的对话级指令；Skill 是按需加载的——你不用在每次对话里重复交代同一套要求。）

用少数派一泽Eze 在《Agent Skills 终极指南》（[sspai.com/post/105230](https://sspai.com/post/105230)）中的说法，Skills 本质上是一种 **Context 工程**：把"每次都要解释一遍"的知识，变成"需要时自动出现"的能力。

![Skill 就是一个包含 SKILL.md 的文件夹](/images/docs/whats-agent/skill-folder.jpg)

*图：A skill is a directory containing a SKILL.md file——Skill 的本体就是一个文件夹。来源：Anthropic 工程博客*

### 4.2 Skill 的长相：一个文件夹 + 一份 SKILL.md

一个 Skill 最简单的形态就是**一个文件夹，里面放一个 SKILL.md 文件**。官方给出的典型结构：

```
pdf-processing/
  SKILL.md          # 主指令（入口）
  FORMS.md          # 表单填写指南（补充文件）
  REFERENCE.md      # 详细 API 参考（补充文件）
  scripts/
    fill_form.py    # 工具脚本
```

SKILL.md 的开头必须是一段 YAML frontmatter（元数据），官方要求两个必填字段：

- **name**：Skill 名。最多 64 字符，只能小写字母、数字和连字符（如 `processing-pdfs`），不能用 "anthropic"、"claude" 这些保留词。
- **description**：功能描述。**必须同时写清"这个 Skill 做什么"和"什么时候该用它"**——官方强调这是 AI 从上百个 Skill 里挑对的那一个的依据。

frontmatter 之下就是正文：用 Markdown 写的详细指令。

### 4.3 核心机制：渐进式披露（Progressive Disclosure）

如果所有 Skill 的全部内容都塞进 AI 的记忆，那上下文窗口早就爆了。Skills 的巧妙之处在于**渐进式披露**——像一本组织良好的手册：先看目录，翻到的那章才展开，附录用到才查。官方的比喻：

> Like a well-organized manual that starts with a table of contents, then specific chapters, and finally a detailed appendix, skills let Claude load information only as needed.
> （像一本从目录到章节再到附录的手册，Skill 让 AI 只在需要时才加载对应内容。）

官方文档给出了一张关键的三层加载表：

| 层级 | 何时加载 | 上下文开销 | 内容 |
|---|---|---|---|
| Level 1：元数据 | 启动时**始终**加载 | 每个 Skill 约 100 tokens | name + description |
| Level 2：指令 | Skill 被触发时 | 5k tokens 以内 | SKILL.md 正文 |
| Level 3+：资源 | 按需加载 | 读取前**零开销** | 附加文件；脚本只把运行输出送入上下文 |

![Skill 的内容按需、分阶段载入上下文](/images/docs/whats-agent/skill-progressive.jpg)

*图：可以往 Skill 里不断追加更深的资料文件，AI 会按触发条件自行决定读不读。来源：Anthropic 工程博客*

![Skills 在上下文窗口中的触发过程](/images/docs/whats-agent/skill-trigger.jpg)

*图：启动时只注入每个 Skill 的名字和描述；相关任务出现时才加载正文。来源：Anthropic 工程博客*

这个设计带来一个惊人的结论，官方原话：

> …the amount of context that can be bundled into a skill is effectively unbounded.
> （一个 Skill 能打包的上下文量，实际上没有上限。）

因为 AI 手上有文件系统，它永远可以"用到再读"，不必把手册整本背下来。

### 4.4 Skill 不只是文档，还能带"工具"

Skill 里可以放**可执行脚本**，让 AI 直接运行而不是"阅读理解"。官方给的理由很实在：

> For example, sorting a list via token generation is far more expensive than simply running a sorting algorithm.
> （让模型"用脑子"排一个列表，远比直接跑一个排序算法贵。）

脚本运行的**输出**进入上下文，脚本**代码本身**不占记忆——"providing deterministic operations without loading their code into context"（提供确定性操作，还不占上下文）。所以官方最佳实践特别强调，SKILL.md 里要写清一个脚本是"执行"还是"参考"：

- 执行型写法：`Run analyze_form.py to extract fields`（跑这个脚本提取字段）
- 参考型写法：`See analyze_form.py for the field extraction algorithm`（把它当算法说明读）

### 4.5 怎么用：三端实操

**① Claude Code（命令行 / 编程场景）**。官方文档（[code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)）：把 Skill 文件夹放进

- `~/.claude/skills/` —— 个人技能，你的所有项目都能用
- `.claude/skills/` —— 项目技能，随仓库走，团队共享

使用方式两种：AI 在相关时**自动调用**，或者你**手动敲斜杠命令**——"Claude uses skills when relevant, or you can invoke one directly with `/skill-name`"。比如写了个 deploy 技能，输入 `/deploy` 即可。值得一提的是，旧的"自定义命令"已和 Skills 合并：`.claude/commands/deploy.md` 和 `.claude/skills/deploy/SKILL.md` 都会生成 `/deploy` 命令。

Claude Code 自带一批内置技能，如 `/code-review`（代码审查）、`/doctor`（体检）、`/debug`（调试）等。

**② claude.ai 网页版**。官方文档：在 Settings > Features 里以 **zip 包**形式上传自己的 Skill（需要 Pro / Max / Team / Enterprise 套餐且开启代码执行）。

**③ API**。开发者可以通过 `/v1/skills` 接口创建和上传，需搭配代码执行工具使用。

另外一个重要事实：Anthropic 已把 Agent Skills 发布为**开放标准**（2025 年 12 月 18 日，标准站 agentskills.io），官方称"Claude Code skills follow the Agent Skills open standard, which works across multiple AI tools"——也就是说这套"SKILL.md 文件夹"的格式不只在 Claude 生态里能用。

> [!NOTE] 一个容易踩的坑
> 官方文档明确写了 "Custom Skills do not sync across surfaces"——你在 Claude Code 里装的自定义 Skill，**不会**自动同步到 claude.ai 网页版，反之亦然。各端要各装各的。

### 4.6 什么时候值得写一个 Skill

Claude Code 官方文档给了一个非常接地气的判据：

> Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact.
> （当你发现自己**反复把同一套说明、清单或步骤流程粘贴进对话**时，就该把它做成 Skill 了。）

对照检查：如果你每次让 AI 排版公众号文章，都要重复一遍"标题用几级、图注什么格式、结尾加什么"，——做成 Skill，一次写好，以后 `/排版` 一下就行。

### 4.7 写好 Skill 的几条官方最佳实践

来自官方 best-practices 文档（[platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)）：

- **"The context window is a public good."（上下文窗口是公共资源）**——默认假设 AI 本来就很聪明："Claude is already very smart — Only add context Claude doesn't already have." 只写它不知道的。
- **SKILL.md 正文控制在 500 行以内**，更深的细节拆到引用文件里，且只留一层引用。
- **description 决定生死**：写清 what + when，AI 靠它选对 Skill。
- **自由度要匹配任务**：官方打了个比方——数据库迁移这种严格流程像"临崖窄桥"（narrow bridge with cliffs），要写死每一步；代码评审这种开放任务像"开阔旷野"（open field），只给方向就好。
- **命名用动名词**：`processing-pdfs`、`analyzing-spreadsheets`。

### 4.8 安全提醒：装 Skill 等于装软件

官方在博客里的原话值得每个用户记住：

> …malicious skills may introduce vulnerabilities in the environment where they're used or direct Claude to exfiltrate data and take unintended actions. We recommend installing skills only from trusted sources.
> （恶意 Skill 可能给你的环境引入漏洞，或诱导 AI 泄露数据、做出非预期操作。我们建议只从可信来源安装 Skill。）

文档里还有一句精炼的类比："Treat like installing software."（像对待安装软件一样对待它。）装第三方的 Skill 前，翻一翻它的 SKILL.md 和脚本内容，是基本卫生习惯。

## 五、把四个概念串起来

最后用一张图和一句话把本篇串起来：

- **Prompt** 是你和 AI 的沟通语言——把话说清楚，是一切的基础；
- **Context** 是 AI 的工作记忆——决定它"记得住什么、看得到什么"，要筛选而非堆量；
- **Skills** 是你写给它的入职手册——把你反复交代的东西固化下来，按需加载；
- **Agent** 则是把这些全部串起来的运行方式——模型带着工具，在工作记忆里循环干活。

当你能分清"这是提示词问题 / 这是上下文问题 / 这是流程问题"，你和 AI 的协作就从一个黑盒，变成了一个可以拆解、可以优化的系统。

## 参考与延伸阅读

**官方文档与博客（概念界定依据）**

1. Anthropic，《Building effective agents》：https://www.anthropic.com/engineering/building-effective-agents
2. Anthropic，《Equipping agents for the real world with Agent Skills》：https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
3. Agent Skills 官方文档 Overview / Best Practices：https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview ；…/best-practices
4. Context Windows 官方文档：https://platform.claude.com/docs/en/build-with-claude/context-windows
5. Prompting best practices 官方文档：https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
6. Claude Code Skills 文档：https://code.claude.com/docs/en/skills
7. Agent Skills 开放标准：https://agentskills.io ；官方 Skill 开源仓库：https://github.com/anthropics/skills

**中文教程（本文借鉴对象）**

8. 玉树芝兰，《Claude Skills 入门：一篇文章搞懂 AI 怎么从「嘴替」升级成「打工人」》，少数派：https://sspai.com/post/105284
9. 一泽Eze，《Agent Skills 终极指南：入门、精通、预测》，少数派：https://sspai.com/post/105230
10. 玉树芝兰，《去伪存真：聊聊 AI 智能体的定义、工具选择与避坑》，少数派：https://sspai.com/post/101085

**图片版权说明**：本文图片来自 Anthropic 官方博客与文档，版权归原作者所有，此处按教学引用标注来源。文档站部分图片存在地区访问限制，若你看到图片无法加载，可前往对应来源页查看。
