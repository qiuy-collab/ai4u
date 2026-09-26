import { ACT_WHAT } from "@/content/site";

/**
 * Act 1 · 是什么 — 巨大墨字压水彩晕染打底 + Agent 名词拱形跑马灯。
 * 字母实色完整可辨（墨 + ember 点缀「4」）；字后 2 大块 + 字前 1 角块
 * 有机水彩晕染（multiply 交叠变深），滚动 scrub 时各块缓慢洇动。
 * 词链沿固定 ∩ 弧滑动（轨道静止、词沿轨流动）。静态即构图终态
 * （rm / 无 supports 可读）；aria-hidden 装饰。
 */
export default function ActWhat() {
  return (
    <section className="act-what gutter">
      <p className="act-what__mega" aria-hidden="true">
        <i className="mega-wash mega-wash--1" />
        <i className="mega-wash mega-wash--2" />
        <span className="mega__word">
          AI<span className="mega-accent">4</span>U
        </span>
        <i className="mega-wash mega-wash--3" />
      </p>
      {/* 拱形跑马灯：词链沿一条固定 ∩ 弧（offset-path）循环滑动，
          词贴弧切向自转——轨道静止、词沿轨流动。
          rm / 无 supports 退化为均匀分布的静态拱。 */}
      <div className="marquee" role="group" aria-label="AI4U 常聊的词">
        <ul className="marquee__group">
          {ACT_WHAT.terms.map((t) => (
            <li key={t} className="marquee__item">
              {t}
              <span className="marquee__x mono" aria-hidden="true">✕</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
