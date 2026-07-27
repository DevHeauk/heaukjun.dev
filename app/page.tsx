import { work } from "@/lib/work";
import { CollectionPreview, Elsewhere } from "@/components/home";

export default function Home() {
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
        that meant keeping servers up while the app grew, but I ended up
        building a lot of client features too. Once I was wiring in payments
        and ads, I started building with the business in view — watching the
        revenue numbers and deciding what to build next off them. These days
        that extends to which numbers to watch, and when to stop.
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

      <CollectionPreview collection="writing" lang="en" />
      <CollectionPreview collection="notes" lang="en" limit={4} />
      <Elsewhere lang="en" />
    </main>
  );
}
