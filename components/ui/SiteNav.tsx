import Link from "next/link";
import { NAV } from "@/content/site";

/**
 * 全站导航 — creative 方言：fixed、64px、无 CTA 按钮。
 * 右上角只留两个入口：文档 / join us（用户约定）。
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
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="site-nav__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
