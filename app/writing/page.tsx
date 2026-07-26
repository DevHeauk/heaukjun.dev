import Link from "next/link";
import type { Metadata } from "next";
import { getPosts, type Post } from "@/lib/posts";

export const metadata: Metadata = { title: "Writing" };

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function Writing() {
  const posts = getPosts();

  const byYear = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const year = post.date.slice(0, 4) || "Undated";
    (acc[year] ??= []).push(post);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => (a < b ? 1 : -1));

  return (
    <main>
      <h1>Writing</h1>
      {posts.length === 0 ? (
        <p className="muted">Nothing published yet.</p>
      ) : (
        years.map((year) => (
          <section key={year}>
            <h2 className="year">{year}</h2>
            <ul className="entry-list">
              {byYear[year].map((post) => (
                <li key={post.slug}>
                  <div className="entry-head">
                    <Link href={`/writing/${post.slug}`}>{post.title}</Link>
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
