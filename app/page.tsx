import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts().slice(0, 5);

  return (
    <main>
      <h1>HeaukJun Yoo</h1>
      <p>
        I&apos;m a product engineer in Seoul. I spent four years on backend and
        infrastructure, then four years building products full-stack — most
        recently taking a declining product&apos;s revenue up 75% in six
        months, and running the backend for a real-time voice app as it grew to
        2 million users.
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
