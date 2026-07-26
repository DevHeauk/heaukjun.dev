import Link from "next/link";
import type { Metadata } from "next";
import { getKoPosts } from "@/lib/posts";
import { workKo } from "@/lib/work";

export const metadata: Metadata = {
  title: "유혁준",
  description:
    "서울에서 일하는 엔지니어. 네트워크 보안, 백엔드와 인프라를 거쳐 제품 개발을 하고 있습니다.",
};

export default function HomeKo() {
  const posts = getKoPosts().slice(0, 5);

  return (
    <main lang="ko">
      <h1>유혁준</h1>
      <p>
        서울에서 일하는 엔지니어입니다. 처음 4년은 네트워크 보안 시스템을 C로
        개발했고, 이후 백엔드와 인프라를 거쳐 최근에는 작은 회사들에서 제품
        개발을 하고 있습니다.
      </p>
      <p>
        생각을 정리하려고 글을 씁니다. 대개 무언가 망가진 이야기와, 지금이라면
        어떻게 했을지에 대해서요.
      </p>

      <h2>경력</h2>
      <ul className="entry-list">
        {workKo.map((job) => (
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

      <h2>글</h2>
      {posts.length === 0 ? (
        <p className="muted">아직 올린 글이 없습니다.</p>
      ) : (
        <>
          <ul className="entry-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <div className="entry-head">
                  <Link href={`/ko/writing/${post.slug}`}>{post.title}</Link>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/ko/writing">글 전체 보기 →</Link>
          </p>
        </>
      )}

      <h2>링크</h2>
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
            <a href="mailto:tianfla24@gmail.com">이메일</a>
            <span className="muted">tianfla24@gmail.com</span>
          </div>
        </li>
      </ul>
    </main>
  );
}
