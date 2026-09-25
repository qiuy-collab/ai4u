// 生成静态品牌图到 public/：favicon / apple-icon / OG 卡。
// 用法：node scripts/generate-assets.mjs
// 背景：Next 静态导出（GitHub Pages）下 ImageResponse route 的产物是空目录，
// 线上会 404；改为构建期一次性生成静态文件，由 public/ 直接分发。
// 视觉规格与原 app/icon.tsx / apple-icon.tsx / opengraph-image.tsx 逐项一致。
import { writeFileSync } from "node:fs";
import React from "react";
import { ImageResponse } from "next/og.js";

const e = React.createElement;

const icon = new ImageResponse(
  e(
    "div",
    {
      style: {
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
      },
    },
    "4",
  ),
  { width: 32, height: 32 },
);

const apple = new ImageResponse(
  e(
    "div",
    {
      style: {
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
      },
    },
    e("span", null, "4"),
    e("span", { style: { fontSize: 30, letterSpacing: "0.1em" } }, "AI4U"),
  ),
  { width: 180, height: 180 },
);

const og = new ImageResponse(
  e(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px",
        background: "#f7f4ee",
        color: "#1a1815",
        fontFamily: "sans-serif",
      },
    },
    // 顶行
    e(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700 } },
      e("div", { style: { width: 22, height: 40, background: "#e04e1b" } }),
      "AI4U",
    ),
    // 主区
    e(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 8 } },
      e(
        "div",
        { style: { display: "flex", alignItems: "flex-end", gap: 20 } },
        e(
          "div",
          { style: { fontSize: 148, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 } },
          "AI for You",
        ),
        e("div", { style: { width: 16, height: 120, background: "#e04e1b", marginBottom: 8 } }),
      ),
      e(
        "div",
        { style: { fontSize: 40, color: "#57534a", marginTop: 16 } },
        "把 AI 用成日常，工具归你",
      ),
    ),
    // 底行
    e(
      "div",
      { style: { display: "flex", justifyContent: "space-between", fontSize: 26, color: "#57534a" } },
      e("span", null, "AI4U · Community"),
      e("span", null, "不卖课 · 不画饼"),
    ),
  ),
  { width: 1200, height: 630 },
);

// 尺寸最小的图也可以只有几百 bytes，下限只防 0 字节空产物
const MIN_BYTES = { "icon.png": 200, "apple-icon.png": 800, "og.png": 5000 };

for (const [name, res] of [
  ["icon.png", icon],
  ["apple-icon.png", apple],
  ["og.png", og],
]) {
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < MIN_BYTES[name]) throw new Error(`${name} 产物异常（${buf.length} bytes）`);
  writeFileSync(`public/${name}`, buf);
  console.log(`public/${name}  ${buf.length} bytes`);
}
