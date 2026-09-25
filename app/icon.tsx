import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** favicon：ember 底 + 「4」字标（AI4U 的数字签名） */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e04e1b",
          color: "#f7f4ee",
          fontSize: 24,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        4
      </div>
    ),
    size,
  );
}
