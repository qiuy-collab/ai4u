export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string }
  | { type: "quote"; text: string };

export interface Doc {
  slug: string;
  category: "tutorial" | "path" | "activity";
  categoryLabel: string;
  title: string;
  date: string; // 空字符串 = 尚未定稿日期，阅读页与列表页均不渲染该字段
  minutes: number;
  summary: string;
  blocks: DocBlock[];
}

export const DOCS: Doc[] = [
  {
    slug: "first-chat",
    category: "tutorial",
    categoryLabel: "教程",
    title: "和 AI 说上第一句话",
    date: "",
    minutes: 6,
    summary: "第一次用 AI 不用背术语，会打字就行。",
    blocks: [
      { type: "p", text: "第一次用 AI，不用先学一堆术语。打开一个工具，写下你现在想解决的事，发出去就行。" },
      { type: "h2", text: "先说清楚" },
      { type: "p", text: "告诉它你要做什么、已经知道什么，以及希望得到什么样的结果。说得越具体，回答越对路。" },
      { type: "note", text: "不满意就继续说。对话本来就可以反复改。" },
      { type: "h2", text: "再试一次" },
      {
        type: "list",
        items: [
          "补一句背景，比如“这是给谁看的”",
          "指定格式，比如“列成一个表”",
          "不满意就直说哪里不对",
        ],
      },
      { type: "quote", text: "好问题不是一次写对的，是聊出来的。" },
      { type: "p", text: "遇到好用的说法就存下来，下次从它继续。" },
    ],
  },
  {
    slug: "learning-path",
    category: "path",
    categoryLabel: "路径",
    title: "从好奇到上手",
    date: "",
    minutes: 4,
    summary: "不用定三个月计划。挑一个眼前的任务，边做边认识工具。",
    blocks: [
      { type: "p", text: "不用一次学完。挑一个眼前真要做的任务，边做边认识工具，比看攻略快。" },
      { type: "h2", text: "第一步：办一件小事" },
      { type: "p", text: "用它整理一段文字、改一封邮件，或者解释一个没看懂的概念。越具体越好。" },
      { type: "h2", text: "第二步：留下方法" },
      { type: "p", text: "记下哪些说法有效、哪些结果要自己再核对一遍。方法攒多了，就是你的手册。" },
      { type: "h2", text: "第三步：做一个小东西" },
      { type: "p", text: "把工具放进一次真实的任务、创作或日常安排里，做完算数。" },
      { type: "note", text: "慢一点没关系，先让它干活。" },
    ],
  },
  {
    slug: "activity-template",
    category: "activity",
    categoryLabel: "活动",
    title: "一起做点什么",
    date: "",
    minutes: 3,
    summary: "一次活动，从一个想试的想法开始。",
    blocks: [
      { type: "p", text: "把最近想试的东西带来，找几个人一起做，一次就聚焦一件事。" },
      { type: "h2", text: "先定一个小目标" },
      { type: "list", items: ["定个时间", "定个地点", "想叫几个人"] },
      { type: "h2", text: "现场做什么" },
      { type: "p", text: "前面短暂分享，后面直接动手。卡住了就停下来，一起看看卡在哪。" },
      { type: "h2", text: "结束以后" },
      { type: "p", text: "把做出来的东西留下来，也把下一个想试的问题记下来。" },
    ],
  },
];

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
