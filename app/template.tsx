/**
 * 路由级页面过渡：每次导航一次性进场（非 scrub）。
 * 动画只定义在 prefers-reduced-motion: no-preference 分支（globals.css），
 * reduced-motion / JS 禁用时内容直接完整呈现。
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
