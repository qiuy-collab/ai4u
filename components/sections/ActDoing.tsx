import PromptLine from "@/components/ui/PromptLine";
import { ACT_DOING } from "@/content/site";

/**
 * Act 2 · 最近在忙什么 — 墨色幕，只留三个大词。
 * 签名动效之三：时间线竖线随滚动生长、节点与条目在经过时点亮上浮。
 * 纯 CSS scroll-driven（rung 1.5）：动画写在 @supports + no-preference 分支，
 * from 态不落静态规则——reduced-motion / 不支持的浏览器直接呈现完整终态。
 */
export default function ActDoing() {
  return (
    <section className="act-doing" aria-labelledby="act-doing-h">
      <div className="gutter">
        <PromptLine text={ACT_DOING.prompt} />
        <h2 id="act-doing-h" className="vh">{ACT_DOING.prompt}</h2>
      </div>
      <div className="act-doing__timeline gutter">
        <span className="act-doing__line" aria-hidden="true" />
        <ol className="act-doing__items">
          {ACT_DOING.timeline.map((item) => (
            <li key={item.title} className="act-doing__item">
              <span className="act-doing__node" aria-hidden="true" />
              <h3 className="act-doing__title">{item.title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
