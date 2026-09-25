export const SITE = {
  name: "AI4U",
  nameLong: "AI4U · AI for You",
  tagline: "把 AI 用成日常",
  url: "http://localhost:3000",
  join: {
    groupLabel: "加入 AI4U",
    groupNumber: "", // 真实群号补上前保持空字符串——JoinCard 按空值降级：不渲染复制按钮，不假装可复制
    placeholderLabel: "QQ 群",
    note: "进群方式近期更新",
  },
} as const;

export const HERO = {
  prompt: "想用 AI 做点什么？",
  titleLines: ["把 AI 用成日常", "工具归你"],
  sub: "不用先懂什么，想问的直接问，卡住了有人搭手。",
  scrollHint: "往下看",
} as const;

export const ACT_WHAT = {
  prompt: "AI4U 是什么？",
  highlight: "AI for You。",
  body: [
    "一群把 AI 用起来的人，凑在一起。",
    "这里没有老师和学生，都是边用边摸索的。谁先踩通了哪条路，就把经验摊开给大家。",
    "刚装好第一个软件的，和用了一两年的，都在一个群里。",
  ],
  nos: [
    { k: "不卖课", v: "内容全免费" },
    { k: "不设门槛", v: "零基础更好" },
    { k: "不端着", v: "都说人话" },
  ],
} as const;

export const ACT_DOING = {
  prompt: "最近在做什么？",
  intro: "就三件事，都还在做。",
  timeline: [
    {
      date: "", // 空值不渲染日期行
      title: "工具试用",
      desc: "每隔一阵选一个工具，扔进真实任务里跑。好不好用，用过的才算数。",
    },
    {
      date: "",
      title: "经验记录",
      desc: "踩过的坑、摸到的门道，写成短文放进内容页，谁都能翻。",
    },
    {
      date: "",
      title: "线下见面",
      desc: "找个地方，带着电脑见面聊，顺手做出点小东西。",
    },
  ],
} as const;

export const ACT_START = {
  prompt: "从哪里开始？",
  answer: "不用先定学习计划。挑一篇顺眼的读完，马上动手试——要试的东西越小越好。",
  cta: "看全部内容",
} as const;

export const ACT_JOIN = {
  prompt: "怎么加入？",
  mega: "空着手|来就行",
  body: "问题不分大小，群里直接问，没人笑话入门的。",
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
