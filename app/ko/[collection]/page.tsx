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
  return { title: SECTIONS[collection].ko.title };
}

export default async function IndexKo({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!isCollection(collection)) notFound();

  const section = SECTIONS[collection as Collection].ko;
  const posts = getAll(collection as Collection, "ko");

  return (
    <main lang="ko">
      <h1>{section.title}</h1>
      <p className="muted section-intro">{section.blurb}</p>
      {posts.length === 0 ? (
        <p className="muted">아직 올린 글이 없습니다.</p>
      ) : (
        <ul className="entry-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <div className="entry-head">
                <Link href={`/ko/${collection}/${post.slug}`}>
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
