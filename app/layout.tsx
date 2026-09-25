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
  openGraph: {
    type: "website",
    siteName: "AI4U",
    title: "AI4U · AI for You",
    description: "把 AI 用成日常。",
    locale: "zh_Hans",
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
