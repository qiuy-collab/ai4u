import PromptLine from "@/components/ui/PromptLine";
import { ACT_WHAT } from "@/content/site";

/* Pages 模式下组件层站内图需带 basePath（next.config env 注入，普通模式为空串） */
const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "";

/**
 * Act 1 · 是什么 — 巨大水彩 AI4U 居中 + 拱形画廊 + Agent 名词跑马灯。
 * mega 为装饰性站名大字（水彩纹理 clip 进字身，aria-hidden），语义由 vh h2 承担；
 * 画廊横轨：窄屏横向滑动（容器内滚动，不撑破页面）；跑马灯两组成环，
 * reduce / JS 禁用下全部完整可读（无 from 态依赖）。
 */
export default function ActWhat() {
  return (
    <section className="act-what gutter" aria-labelledby="act-what-h">
      <PromptLine text={ACT_WHAT.prompt} />
      <h2 id="act-what-h" className="vh">{ACT_WHAT.prompt}</h2>
      <p className="act-what__mega" aria-hidden="true">{ACT_WHAT.mega}</p>
      <div className="arches" role="group" aria-label="教程配图一览">
        <ul className="arches__track">
          {ACT_WHAT.gallery.map((g) => (
            <li key={g.src} className="arches__item">
              <figure className="arches__frame">
                <img
                  className="arches__img"
                  src={`${ASSET_PREFIX}${g.src}`}
                  alt={g.alt}
                  loading="lazy"
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
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
