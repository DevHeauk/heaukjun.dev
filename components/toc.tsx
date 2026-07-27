"use client";

import { useEffect, useState } from "react";

export type Heading = { id: string; text: string; depth: 2 | 3 };

/** How far down the viewport a heading counts as "the one you're reading". */
const THRESHOLD = 140;

/**
 * Sticky table of contents. Highlights whichever heading you're reading.
 * Hidden below 1280px — there's no room beside the column.
 */
export default function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");
  const key = headings.map((h) => h.id).join("|");

  useEffect(() => {
    if (headings.length === 0) return;
    let frame = 0;

    const update = () => {
      frame = 0;

      const doc = document.documentElement;
      const viewport = window.innerHeight;
      const maxScroll = Math.max(doc.scrollHeight - viewport, 0);
      const remaining = maxScroll - window.scrollY;

      if (remaining <= 2) {
        // Nothing left to scroll: the last heading is what you're reading.
        setActive(headings[headings.length - 1].id);
        return;
      }

      // Headings inside the final screenful can never scroll up to the
      // threshold — the page runs out of room first. So as the bottom
      // approaches, walk the reading line down the viewport. Only worth
      // doing when the tail is actually distinct from the top of the page.
      const sweeping = maxScroll > viewport && remaining < viewport;
      const line = sweeping
        ? THRESHOLD + (viewport - THRESHOLD) * (1 - remaining / viewport)
        : THRESHOLD;

      let current = headings[0].id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top > line) break;
        current = h.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (headings.length < 3) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "toc-sub" : undefined}>
            <a
              href={`#${h.id}`}
              className={active === h.id ? "toc-active" : undefined}
              aria-current={active === h.id ? "location" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
