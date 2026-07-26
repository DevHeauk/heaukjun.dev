import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts().slice(0, 5);

  return (
    <main>
      <h1>HeaukJun Yoo</h1>
      <p>
        I&apos;m an engineer in Seoul. I started in C, on a proxy server that
        carried every packet for companies of ten thousand people — the kind of
        system where chasing one bug meant capturing traffic for days and
        reading RST timings until the cause finally showed itself. That&apos;s
        where I found out I don&apos;t feel settled until I&apos;ve gone all
        the way down.
      </p>
      <p>
        Since then I&apos;ve been widening what that means. Backend and
        infrastructure for a voice app while it grew to two million users, then
        its client, then what it charged people for, and eventually the product
        calls themselves. The two things I like turn out to be the same reflex:
        digging until a problem is actually understood, and having it land on
        something real. I&apos;ve never been willing to give up either one.
      </p>
      <p>
        I write here about the parts that don&apos;t fit in a resume — what
        broke, what I got wrong, and what I&apos;d do differently.
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
