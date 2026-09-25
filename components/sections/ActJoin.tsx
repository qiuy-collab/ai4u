import PromptLine from "@/components/ui/PromptLine";
import Highlight from "@/components/ui/Highlight";
import JoinCard from "@/components/ui/JoinCard";
import { ACT_JOIN } from "@/content/site";

/**
 * Act 4 · 怎么加入 — 全站视觉权重最高的一幕（招新季的第一诉求）。
 * 超大字 mega + 荧光笔划过「一起玩」；加入卡带显式占位（site.ts 替换即上线）。
 */
export default function ActJoin() {
  const [lead, lit = ""] = ACT_JOIN.mega.split("|");
  return (
    <section id="join" className="act-join gutter" aria-labelledby="act-join-h">
      <PromptLine text={ACT_JOIN.prompt} />
      <h2 id="act-join-h" className="vh">{ACT_JOIN.prompt}</h2>
      <p className="act-join__mega display">
        {lead}
        <Highlight>{lit}</Highlight>
      </p>
      <p className="act-join__body measure-narrow">{ACT_JOIN.body}</p>
      <JoinCard />
    </section>
  );
}
