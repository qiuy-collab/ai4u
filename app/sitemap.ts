import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { DOCS } from "@/content/docs";
import { PROMPTS } from "@/content/prompts";

// 静态导出（GitHub Pages）必需：声明此 route 为纯静态
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/docs`, changeFrequency: "weekly", priority: 0.8 },
    ...DOCS.map((d) => ({
      url: `${base}/docs/${d.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...PROMPTS.map((p) => ({
      url: `${base}/prompt/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
