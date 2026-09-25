import type { NextConfig } from "next";

// GitHub Pages 部署：CI 里以 GITHUB_PAGES=true 构建，本地开发/构建完全不受影响。
// output: 'export' 全静态导出；basePath 对齐仓库路径 /ai4u；
// trailingSlash 让 GitHub Pages 能命中目录下的 index.html。
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: "/ai4u",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
