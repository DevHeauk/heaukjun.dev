"use client";

import { useEffect, useState } from "react";

export type Heading = { id: string; text: string; depth: 2 | 3 };

/**
 * Sticky table of contents. Highlights whichever heading you're reading.
 * Hidden below 1100px — there's no room beside the column.
 */
export default function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target.id, entry.isIntersecting);
        }
        // The topmost heading currently on screen wins.
        const current = headings.find((h) => seen.get(h.id));
        if (current) setActive(current.id);
      },
      // Only count headings in the upper part of the viewport.
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "toc-sub" : undefined}>
            <a
              href={`#${h.id}`}
              className={active === h.id ? "toc-active" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
