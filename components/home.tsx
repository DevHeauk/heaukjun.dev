import Link from "next/link";
import { getAll, type Collection, type Lang } from "@/lib/posts";
import { SECTIONS } from "@/lib/sections";

const MORE = { ko: "전체 보기 →", en: "See all →" } as const;
const EMPTY = { ko: "아직 올린 글이 없습니다.", en: "Nothing published yet." } as const;

export function CollectionPreview({
  collection,
  lang,
  limit = 5,
}: {
  collection: Collection;
  lang: Lang;
  limit?: number;
}) {
  const posts = getAll(collection, lang).slice(0, limit);
  const section = SECTIONS[collection][lang];
  const prefix = lang === "ko" ? "/ko" : "";

  return (
    <>
      <h2>{section.title}</h2>
      {posts.length === 0 ? (
        <p className="muted">{EMPTY[lang]}</p>
      ) : (
        <>
          <ul className="entry-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <div className="entry-head">
                  <Link href={`${prefix}/${collection}/${post.slug}`}>
                    {post.title}
                  </Link>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </li>
            ))}
          </ul>
          <p>
            <Link href={`${prefix}/${collection}`}>{MORE[lang]}</Link>
          </p>
        </>
      )}
    </>
  );
}

export function Elsewhere({ lang }: { lang: Lang }) {
  const links = [
    ["GitHub", "https://github.com/DevHeauk", "DevHeauk"],
    ["LinkedIn", "https://www.linkedin.com/in/heaukjun-yoo", "heaukjun-yoo"],
    [
      lang === "ko" ? "이메일" : "Email",
      "mailto:tianfla24@gmail.com",
      "tianfla24@gmail.com",
    ],
  ];

  return (
    <>
      <h2>{lang === "ko" ? "링크" : "Elsewhere"}</h2>
      <ul className="entry-list">
        {links.map(([label, href, sub]) => (
          <li key={label}>
            <div className="entry-head">
              <a href={href}>{label}</a>
              <span className="muted">{sub}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
