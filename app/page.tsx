import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { work } from "@/lib/work";

export default function Home() {
  const posts = getPosts().slice(0, 5);

  return (
    <main>
      <h1>HeaukJun Yoo</h1>
      <p>I&apos;m a full-stack engineer in Seoul.</p>
      <p>
        I started my career at a network security company, on the engine
        backend — on-premise and cloud proxy security servers written in C and
        Go. All of a company&apos;s traffic passed inline through them, and for
        close to four years I worked down at that level, in Linux and networks.
      </p>
      <p>
        Then I moved to startups and took on backend and infrastructure. Mostly
        that meant keeping servers up while the app grew, but it kept
        spreading: client features, then payments and ads. These days it
        includes deciding what to build, which numbers to watch, and when to
        stop.
      </p>
      <p>
        I keep notes here on problems I ran into at work. Probably more about
        the ones that went wrong than the ones that went well.
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
