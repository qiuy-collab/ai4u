/* AI4U 验收 probe — playwright-core + 系统 Edge（channel: msedge，免下载浏览器）
   产出数字而非印象：HTTP/console/溢出/h1/lang/reduced-motion 隐藏元素扫描/截图 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3111";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const PAGES = [
  { path: "/", name: "home", status: 200 },
  { path: "/docs", name: "docs", status: 200 },
  { path: "/docs/what-is-agent", name: "doc", status: 200 },
  { path: "/no-such-page", name: "404", status: 404 }, // 返回 404 才是正确行为
];

function summary(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const overflowX = Math.max(0, de.scrollWidth - de.clientWidth);
    const h1s = [...document.querySelectorAll("h1")];
    const hidden = [];
    for (const el of document.querySelectorAll("body *")) {
      if ([...el.classList].some((c) => c.endsWith("__enter"))) continue; // hover 邀请标记，默认隐藏是设计
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const op = parseFloat(cs.opacity);
      if (op < 0.5) {
        hidden.push(
          `${el.tagName.toLowerCase()}.${[...el.classList].join(".")} op=${op.toFixed(2)} "${(el.textContent ?? "").trim().slice(0, 14)}"`,
        );
      }
    }
    return {
      overflowX,
      lang: de.lang,
      h1: h1s.length,
      h1Text: h1s.map((h) => h.textContent.trim().slice(0, 20)),
      reducedMotionTrapped: hidden.slice(0, 12),
      trappedCount: hidden.length,
      title: document.title,
    };
  });
}

const browser = await chromium.launch({ channel: "msedge", headless: true });
let fail = 0;

for (const vp of [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844 },
]) {
  for (const reduce of [false, true]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      reducedMotion: reduce ? "reduce" : "no-preference",
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 120)));
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));

    for (const p of PAGES) {
      const res = await page.goto(BASE + p.path, { waitUntil: "networkidle" });
      const s = await summary(page);
      // 404 页的"Failed to load resource: 404"是浏览器对 404 响应的标准记录，非页面错误
      const realErrors = errors.filter(
        (e) => !(p.status === 404 && e.includes("status of 404")),
      );
      const tag = `${vp.name}${reduce ? "-rm" : ""}/${p.name}`;
      const bad =
        res.status() !== p.status ||
        s.overflowX > 0 ||
        s.h1 !== 1 ||
        s.lang !== "zh-Hans" ||
        realErrors.length > 0 ||
        (reduce && s.trappedCount > 0);
      if (bad) fail++;
      console.log(
        `${bad ? "FAIL" : "PASS"} ${tag} status=${res.status()} overflowX=${s.overflowX} h1=${s.h1}(${s.h1Text.join("|") || "-"}) lang=${s.lang} consoleErr=${realErrors.length}${reduce ? ` trapped=${s.trappedCount}:${s.reducedMotionTrapped.join(" ;; ") || "none"}` : ""}${realErrors.length ? ` [${realErrors.join(" ;; ")}]` : ""}`,
      );
      if (p.name === "home" && vp.name === "1440") {
        await page.screenshot({ path: `${OUT}/home-${reduce ? "rm" : "motion"}-top.png` });
      }
      if (p.name === "doc" && vp.name === "1440" && !reduce) {
        await page.screenshot({ path: `${OUT}/doc-motion-top.png` });
      }
    }
    // 首页滚动中段截图（动效 on）：看 ActWhat 水彩大字与加入幕
    if (vp.name === "1440" && !reduce) {
      const page = ctx.pages()[0];
      await page.goto(BASE + "/", { waitUntil: "networkidle" });
      await page.evaluate(() => window.scrollTo(0, document.querySelector(".act-what__mega").offsetTop - 80));
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${OUT}/home-motion-what.png` });
      await page.evaluate(() => window.scrollTo(0, document.querySelector(".act-join").offsetTop - 80));
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${OUT}/home-motion-join.png` });
    }
    await ctx.close();
  }
}

await browser.close();
console.log(fail === 0 ? "VERDICT: PASS" : `VERDICT: FAIL (${fail})`);
process.exit(fail === 0 ? 0 : 1);
