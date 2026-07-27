"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/lib/sections";

export default function Nav() {
  const pathname = usePathname();
  const isKo = pathname === "/ko" || pathname.startsWith("/ko/");
  const lang = isKo ? "ko" : "en";
  const prefix = isKo ? "/ko" : "";

  // Same page, other language.
  const other = isKo
    ? pathname.replace(/^\/ko/, "") || "/"
    : `/ko${pathname === "/" ? "" : pathname}`;

  return (
    <nav className="site">
      <Link href={prefix || "/"}>{isKo ? "홈" : "Home"}</Link>
      {Object.entries(SECTIONS).map(([key, section]) => (
        <Link key={key} href={`${prefix}/${key}`}>
          {section[lang].nav}
        </Link>
      ))}
      <Link href={other} className="lang">
        {isKo ? "English" : "한국어"}
      </Link>
    </nav>
  );
}
