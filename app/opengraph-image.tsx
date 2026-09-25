import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AI4U — AI for You";

/**
 * OG 卡 — 卡片式设计（feed 里 ~500px 宽呈现，字要大、安全区要足）。
 * 仅用拉丁字形，避免 ImageResponse 缺中文字体的坑；中文描述在 meta 文本里。
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "#f7f4ee",
          color: "#1a1815",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 22, height: 40, background: "#e04e1b" }} />
          AI4U
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
            <div style={{ fontSize: 148, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
              AI for You
            </div>
            <div style={{ width: 16, height: 120, background: "#e04e1b", marginBottom: 8 }} />
          </div>
          <div style={{ fontSize: 40, color: "#57534a", marginTop: 16 }}>
            把 AI 用成日常，工具归你
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#57534a" }}>
          <span>AI4U · Community</span>
          <span>不卖课 · 不画饼</span>
        </div>
      </div>
    ),
    size,
  );
}
