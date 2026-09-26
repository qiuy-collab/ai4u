// 生成静态品牌图到 public/：favicon / apple-icon / OG 卡。
// 用法：node scripts/generate-assets.mjs
// 背景：Next 静态导出（GitHub Pages）下 ImageResponse route 的产物是空目录，
// 线上会 404；改为构建期一次性生成静态文件，由 public/ 直接分发。
// 图标取 scripts/assets/logo.png（1254×1254 成品源图，整图 1:1 缩放）；
// OG 卡仍为代码绘制（1200×630 横版，与 1:1 logo 比例不同，单独排）。
import { writeFileSync, readFileSync } from "node:fs";
import React from "react";
import { ImageResponse } from "next/og.js";

const e = React.createElement;

// 品牌源图：scripts/assets/logo.png（成品 logo，随仓库走，构建可复现）
const logo = `data:image/png;base64,${readFileSync(
  new URL("./assets/logo.png", import.meta.url),
).toString("base64")}`;

const icon = new ImageResponse(
  e(
    "div",
    { style: { width: "100%", height: "100%", display: "flex" } },
    e("img", { src: logo, width: 32, height: 32 }),
  ),
  { width: 32, height: 32 },
);

const apple = new ImageResponse(
  e(
    "div",
    { style: { width: "100%", height: "100%", display: "flex" } },
    e("img", { src: logo, width: 180, height: 180 }),
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
        "把 AI 用成日常",
      ),
    ),
    // 底行
    e(
      "div",
      { style: { display: "flex", justifyContent: "space-between", fontSize: 26, color: "#57534a" } },
      e("span", null, "AI4U · Community"),
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
