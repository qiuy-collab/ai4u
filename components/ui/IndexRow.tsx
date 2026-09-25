import Link from "next/link";

export interface IndexRowProps {
  index: number;
  categoryLabel: string;
  title: string;
  date: string;
  href: string;
}

/**
 * 教程索引行 — 首页 Act 3 与列表页共用的行式条目。
 * 整行是一条真 <Link>（stretched-link 模式）：可中键、可 Ctrl+F、有焦点环。
 * hover / focus 说一件具体的事：行首浮出 ↵，标题荧光划过（design-slop B1）。
 */
export default function IndexRow({ index, categoryLabel, title, date, href }: IndexRowProps) {
  return (
    <li className="index-row">
      <Link href={href} className="index-row__link">
        <span className="index-row__enter mono" aria-hidden="true">↵</span>
        <span className="index-row__num mono" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <span className="index-row__cat mono">{categoryLabel}</span>
        <span className="index-row__title">
          <span className="hl">{title}</span>
        </span>
        <span className="index-row__date mono">{date}</span>
      </Link>
    </li>
  );
}
