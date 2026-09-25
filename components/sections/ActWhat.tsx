import { ACT_WHAT } from "@/content/site";

/**
 * Act 1 · 是什么 — 巨大墨字压水彩晕染打底 + Agent 名词弧形跑马灯。
 * 字母实色完整可辨（墨 + ember 点缀「4」）；字后 2 大块 + 字前 1 角块
 * 有机水彩晕染（multiply 交叠变深）+ 纸纹统一层打底，滚动 scrub 时
 * 各块缓慢洇动。静态即构图终态（rm / 无 supports 可读）；aria-hidden 装饰。
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
      <div className="marquee" role="group" aria-label="AI4U 常聊的词">
        <div className="marquee__track">
          {[0, 1].map((g) => (
            <ul
              className="marquee__group"
              key={g}
              aria-hidden={g === 1 || undefined}
            >
              {ACT_WHAT.terms.map((t) => (
                <li key={t} className="marquee__item">
                  <span className="marquee__x mono" aria-hidden="true">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
