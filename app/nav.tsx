"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isKo = pathname === "/ko" || pathname.startsWith("/ko/");

  // Same page, other language.
  const other = isKo
    ? pathname.replace(/^\/ko/, "") || "/"
    : `/ko${pathname === "/" ? "" : pathname}`;

  return (
    <nav className="site">
      <Link href={isKo ? "/ko" : "/"}>{isKo ? "홈" : "Home"}</Link>
      <Link href={isKo ? "/ko/writing" : "/writing"}>
        {isKo ? "글" : "Writing"}
      </Link>
      <Link href={other} className="lang">
        {isKo ? "English" : "한국어"}
      </Link>
    </nav>
  );
}
