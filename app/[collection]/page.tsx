import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAll, type Collection, type Post } from "@/lib/posts";
import { SECTIONS, isCollection } from "@/lib/sections";

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((collection) => ({ collection }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  if (!isCollection(collection)) return {};
  return { title: SECTIONS[collection].en.title };
}

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default async function Index({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!isCollection(collection)) notFound();

  const section = SECTIONS[collection as Collection].en;
  const posts = getAll(collection as Collection, "en");

  const byYear = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const year = post.date.slice(0, 4) || "Undated";
    (acc[year] ??= []).push(post);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => (a < b ? 1 : -1));

  return (
    <main>
      <h1>{section.title}</h1>
      <p className="muted section-intro">{section.blurb}</p>
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
                    <Link href={`/${collection}/${post.slug}`}>
                      {post.title}
                    </Link>
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
