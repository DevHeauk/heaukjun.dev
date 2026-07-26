import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts().slice(0, 5);

  return (
    <main>
      <h1>HeaukJun Yoo</h1>
      <p>
        I&apos;m an engineer in Seoul. I spent my first four years writing C
        for network security systems, then moved to backend and infrastructure,
        and more recently to product work at smaller companies.
      </p>
      <p>
        I write here to think things through — usually about something that
        broke, and what I&apos;d do differently now.
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
