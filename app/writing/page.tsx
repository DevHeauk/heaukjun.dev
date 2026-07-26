import Link from "next/link";
import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Writing" };

export default function Writing() {
  const posts = getPosts();

  return (
    <main>
      <h1>Writing</h1>
      {posts.length === 0 ? (
        <p className="muted">Nothing here yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`}>{post.title}</Link>
              <time dateTime={post.date}>{post.date}</time>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
