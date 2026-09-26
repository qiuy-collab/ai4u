import type { NextConfig } from "next";

// GitHub Pages 部署：CI 里以 GITHUB_PAGES=true 构建，本地开发/构建完全不受影响。
// output: 'export' 全静态导出；basePath 对齐仓库路径 /AI4U
//（GitHub Pages 项目路径大小写敏感，仓库名 ai4u 已改名为 AI4U）；
// trailingSlash 让 GitHub Pages 能命中目录下的 index.html。
const isGitHubPages = process.env.GITHUB_PAGES === "true";
// 组件层引用 public/ 静态资源要自己拼前缀：Next 只为 <Link> 与 _next 资源自动加 basePath。
const assetPrefix = isGitHubPages ? "/AI4U" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_ASSET_PREFIX: assetPrefix },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: "/AI4U",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
