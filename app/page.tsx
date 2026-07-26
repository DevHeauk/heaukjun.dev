import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { work } from "@/lib/work";

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

      <h2>Work</h2>
      <ul className="entry-list">
        {work.map((job) => (
          <li key={job.company}>
            <div className="entry-head">
              <span>
                <strong>{job.company}</strong>
                <span className="muted"> — {job.role}</span>
              </span>
              <time>{job.period}</time>
            </div>
            <p className="entry-note">{job.note}</p>
          </li>
        ))}
      </ul>

      <h2>Writing</h2>
      {posts.length === 0 ? (
        <p className="muted">Nothing published yet.</p>
      ) : (
        <>
          <ul className="entry-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <div className="entry-head">
                  <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/writing">All writing →</Link>
          </p>
        </>
      )}

      <h2>Elsewhere</h2>
      <ul className="entry-list">
        <li>
          <div className="entry-head">
            <a href="https://github.com/DevHeauk">GitHub</a>
            <span className="muted">DevHeauk</span>
          </div>
        </li>
        <li>
          <div className="entry-head">
            <a href="https://www.linkedin.com/in/heaukjun-yoo">LinkedIn</a>
            <span className="muted">heaukjun-yoo</span>
          </div>
        </li>
        <li>
          <div className="entry-head">
            <a href="mailto:tianfla24@gmail.com">Email</a>
            <span className="muted">tianfla24@gmail.com</span>
          </div>
        </li>
      </ul>
    </main>
  );
}
