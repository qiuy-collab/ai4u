import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./components.css";
import SiteNav from "@/components/ui/SiteNav";
import SiteFooter from "@/components/ui/SiteFooter";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "AI4U · AI for You",
    template: "%s · AI4U",
  },
  description: "把 AI 用成日常。",
  // 品牌图为 public/ 静态文件（node scripts/generate-assets.mjs 生成）。
  // icons 用完整 URL：Pages 站点在 /ai4u/ 子路径下，根绝对路径会 404；
  // SITE.url 本地是 localhost、CI 是 Pages 地址，双模式各自正确
  icons: {
    icon: `${SITE.url}/icon.png`,
    apple: `${SITE.url}/apple-icon.png`,
  },
  openGraph: {
    type: "website",
    siteName: "AI4U",
    title: "AI4U · AI for You",
    description: "把 AI 用成日常。",
    locale: "zh_Hans",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI4U — AI for You" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
