import Link from "next/link";
import type { Metadata } from "next";
import { getKoPosts, type Post } from "@/lib/posts";

export const metadata: Metadata = { title: "글" };

const fmt = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function WritingKo() {
  const posts = getKoPosts();

  const byYear = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const year = post.date.slice(0, 4) || "날짜 없음";
    (acc[year] ??= []).push(post);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => (a < b ? 1 : -1));

  return (
    <main lang="ko">
      <h1>글</h1>
      {posts.length === 0 ? (
        <p className="muted">아직 올린 글이 없습니다.</p>
      ) : (
        years.map((year) => (
          <section key={year}>
            <h2 className="year">{year}</h2>
            <ul className="entry-list">
              {byYear[year].map((post) => (
                <li key={post.slug}>
                  <div className="entry-head">
                    <Link href={`/ko/writing/${post.slug}`}>{post.title}</Link>
                    <time dateTime={post.date}>
                      {post.date ? fmt.format(new Date(post.date)) : ""}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </main>
  );
}
