import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { DOCS } from "@/content/docs";

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
  ];
}
