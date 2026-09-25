import Link from "next/link";
import { FOOTER } from "@/content/site";

/**
 * 全站导航 — creative 方言：fixed、64px、无 CTA 按钮。
 * mix-blend-mode: difference：纸白幕上是墨字，墨色幕上自动反成纸字，
 * 不需要 scroll-driven 主题交换（components.md §3 方案 a）。
 */
export default function SiteNav() {
  return (
    <header className="site-nav">
      <a className="skip" href="#main">跳到正文</a>
      <Link href="/" className="site-nav__logo mono" aria-label="AI4U 首页">
        AI4U
      </Link>
      <nav aria-label="主导航">
        <ul className="site-nav__links">
          {FOOTER.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="site-nav__link">
                <span className="site-nav__enter" aria-hidden="true">↵ </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
