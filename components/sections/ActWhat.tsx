import PromptLine from "@/components/ui/PromptLine";
import { ACT_WHAT } from "@/content/site";

/**
 * Act 1 · 是什么 — 巨大墨字 + 水彩色带横穿 + Agent 名词跑马灯。
 * 字母保持实色完整可辨（墨 + ember 点缀「4」），5 条硬边半透明水彩色带
 * 压在字前、比字大并延伸出字外，微 blur 柔边；滚动 scrub 时各带异速横移，
 * 字被不同颜色反复穿过（套色错印参考图的站内色近似）。
 * 静态即构图终态（rm / 无 supports 可读）；aria-hidden 装饰，语义由 vh h2 承担。
 */
export default function ActWhat() {
  return (
    <section className="act-what gutter" aria-labelledby="act-what-h">
      <PromptLine text={ACT_WHAT.prompt} />
      <h2 id="act-what-h" className="vh">{ACT_WHAT.prompt}</h2>
      <p className="act-what__mega" aria-hidden="true">
        <b className="mega-band mega-band--1" />
        <b className="mega-band mega-band--2" />
        <span className="mega__word">
          AI<span className="mega-accent">4</span>U
        </span>
        <b className="mega-band mega-band--3" />
        <b className="mega-band mega-band--4" />
        <b className="mega-band mega-band--5" />
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
