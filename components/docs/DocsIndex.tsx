"use client";

import { useEffect, useState } from "react";
import IndexRow from "@/components/ui/IndexRow";
import type { Doc } from "@/content/docs";

interface Category {
  id: string;
  label: string;
}

/**
 * 列表筛选 — 状态写在 URL（?cat=tutorial）：可链接、可后退（components.md §12）。
 * 空态是设计过的状态：说出空的原因 + 出路。手输一个不存在的 ?cat=xxx 可触发。
 */
export default function DocsIndex({
  docs,
  categories,
  empty,
}: {
  docs: Doc[];
  categories: readonly Category[];
  empty: { title: string; body: string };
}) {
  const [cat, setCat] = useState("all");

  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(window.location.search).get("cat");
      setCat(q && categories.some((c) => c.id === q) ? q : "all");
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [categories]);

  function pick(id: string) {
    setCat(id);
    const url = id === "all" ? window.location.pathname : `${window.location.pathname}?cat=${id}`;
    window.history.replaceState(null, "", url);
  }

  const filtered = cat === "all" ? docs : docs.filter((d) => d.category === cat);

  return (
    <>
      <div className="docs-filter" role="group" aria-label="按分类筛选">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="docs-filter__btn"
            aria-pressed={cat === c.id}
            onClick={() => pick(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <ol className="docs-list">
          {filtered.map((d, i) => (
            <IndexRow
              key={d.slug}
              index={i + 1}
              categoryLabel={d.categoryLabel}
              title={d.title}
              date={d.date}
              href={`/docs/${d.slug}`}
            />
          ))}
        </ol>
      ) : (
        <div className="docs-empty">
          <p className="docs-empty__title">{empty.title}</p>
          <p className="docs-empty__body">{empty.body}</p>
        </div>
      )}
    </>
  );
}
