import Link from "next/link";
import type { Metadata } from "next";
import { getKoPosts } from "@/lib/posts";
import { workKo } from "@/lib/work";

export const metadata: Metadata = {
  title: "유혁준",
  description:
    "서울에서 일하는 풀스택 엔지니어. 네트워크 보안, 백엔드와 인프라를 거쳐 제품을 만듭니다.",
};

export default function HomeKo() {
  const posts = getKoPosts().slice(0, 5);

  return (
    <main lang="ko">
      <h1>유혁준</h1>
      <p>서울에서 일하는 풀스택 엔지니어입니다.</p>
      <p>
        C로 네트워크 보안 장비를 만들며 개발을 시작했습니다. 기업의 모든
        트래픽이 지나가는 프록시 서버였고, 4년 가까이 리눅스와 네트워크를 낮은
        레벨에서 다뤘습니다.
      </p>
      <p>
        그 다음엔 스타트업으로 옮겨 백엔드와 인프라를 맡았습니다. 앱이 커지는
        동안 서버를 지키는 일이 주였는데, 하다 보니 클라이언트도 만들고 결제와
        광고도 붙이게 됐습니다. 지금은 무엇을 만들지, 어떤 지표를 볼지, 언제
        접을지를 정하는 일까지 합니다.
      </p>
      <p>
        여기에는 일하면서 부딪힌 문제를 정리해 둡니다. 잘 풀린 이야기보다
        잘못됐던 이야기가 많을 것 같습니다.
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
