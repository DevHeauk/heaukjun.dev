import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts().slice(0, 5);

  return (
    <main>
      <h1>HeaukJun Yoo</h1>
      <p>
        I&apos;m a product engineer in Seoul. Four years on backend and
        infrastructure, then four years building products full-stack. I spent
        most of that on a real-time voice app that grew to two million users —
        running its backend and infrastructure, building client features, and
        owning the ad revenue it ran on.
      </p>
      <p>
        I write about the parts that don&apos;t fit in a resume: what broke,
        what I got wrong, and what I&apos;d do differently.
      </p>

      {posts.length > 0 && (
        <>
          <h2>Some writing</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/writing/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
