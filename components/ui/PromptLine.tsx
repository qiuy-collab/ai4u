/**
 * 问题行 — 各幕的章节标签，版式层装置（对照 CmdLine：打字+光标，hero 独占）。
 * 文本直接在场，无光标、无逐字节拍——避免同一强装置在多幕重复造成审美疲劳。
 * 纯 server component：零 JS。
 */
export default function PromptLine({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={`promptline mono ${className}`} aria-label={text}>
      <span className="promptline__prefix" aria-hidden="true">&gt;&nbsp;</span>
      <span aria-hidden="true">{text}</span>
    </p>
  );
}
