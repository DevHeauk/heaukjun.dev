import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAll, type Collection } from "@/lib/posts";
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

export default async function Index({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!isCollection(collection)) notFound();

  const section = SECTIONS[collection as Collection].en;
  const posts = getAll(collection as Collection, "en");

  return (
    <main>
      <h1>{section.title}</h1>
      <p className="muted section-intro">{section.blurb}</p>
      {posts.length === 0 ? (
        <p className="muted">Nothing published yet.</p>
      ) : (
        <ul className="entry-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <div className="entry-head">
                <Link href={`/${collection}/${post.slug}`}>
                  {post.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
