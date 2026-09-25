import PromptLine from "@/components/ui/PromptLine";
import Highlight from "@/components/ui/Highlight";
import { ACT_WHAT } from "@/content/site";

/**
 * Act 1 · 是什么 — 1 栏窄行宽 statement + 荧光笔宣言。
 * 三个「不」做成编号行式 editorial 列表，不是三张等宽卡（design-slop A2）。
 */
export default function ActWhat() {
  return (
    <section className="act-what gutter" aria-labelledby="act-what-h">
      <PromptLine text={ACT_WHAT.prompt} />
      <h2 id="act-what-h" className="vh">{ACT_WHAT.prompt}</h2>
      <p className="act-what__statement">
        <Highlight>{ACT_WHAT.highlight}</Highlight>
      </p>
      {ACT_WHAT.body.map((t) => (
        <p key={t.slice(0, 12)} className="act-what__body measure">{t}</p>
      ))}
      <ul className="act-what__nos">
        {ACT_WHAT.nos.map((n, i) => (
          <li key={n.k} className="act-what__no">
            <span className="act-what__no-index mono" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="act-what__no-key">{n.k}</span>
            <span className="act-what__no-val">{n.v}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
