"use client";

import { useRef, useState } from "react";
import { ACT_JOIN, SITE } from "@/content/site";

/**
 * 加入卡 — 全站视觉权重最高的一块。上线时只改 content/site.ts 的 groupNumber。
 * 空群号降级（真实现，不是注释谎言）：不渲染复制按钮、不渲染空 aria-label，
 * 群号位置显示 placeholderLabel，二维码框内文字改为「待更新」——不假装可扫码。
 * 复制按钮状态矩阵：rest / hover / active / focus-visible / success（2s 后回落）/ 无剪贴板权限降级「请复制」。
 */
export default function JoinCard() {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const timer = useRef<number | undefined>(undefined);
  const hasGroup = SITE.join.groupNumber.trim().length > 0;

  async function copyGroup() {
    const text = SITE.join.groupNumber;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("no clipboard");
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("manual"); // 降级：提示手动选择，不假装成功
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2400);
  }

  return (
    <div className="join-card">
      <div className="join-card__info">
        <p className="eyebrow">{SITE.join.groupLabel}</p>
        <p
          className="join-card__number"
          aria-label={hasGroup ? `群号：${SITE.join.groupNumber}` : undefined}
        >
          {hasGroup ? SITE.join.groupNumber : SITE.join.placeholderLabel}
        </p>
        {hasGroup && (
          <div className="join-card__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={copyGroup}
              aria-live="polite"
            >
              <span className="btn__label">
                {state === "copied"
                  ? ACT_JOIN.copiedLabel
                  : state === "manual"
                    ? "请复制"
                    : ACT_JOIN.copyLabel}
              </span>
            </button>
            {state === "manual" && <p className="join-card__hint mono">请复制</p>}
          </div>
        )}
        {!hasGroup && <p className="join-card__hint mono">{SITE.join.note}</p>}
      </div>
      <div
        className="join-card__qr mono"
        role="img"
        aria-label={hasGroup ? "加入二维码" : "二维码待更新"}
      >
        <span aria-hidden="true">{hasGroup ? "扫码加入" : "待更新"}</span>
      </div>
    </div>
  );
}
