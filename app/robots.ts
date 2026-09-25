import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

// 静态导出（GitHub Pages）必需：声明此 route 为纯静态
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
