import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** apple-touch-icon：180×180、无透明（production-polish §1） */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background: "#e04e1b",
          color: "#f7f4ee",
          fontSize: 88,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        <span>4</span>
        <span style={{ fontSize: 30, letterSpacing: "0.1em" }}>AI4U</span>
      </div>
    ),
    size,
  );
}
