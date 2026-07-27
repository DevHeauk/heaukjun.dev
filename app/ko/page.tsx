import type { Metadata } from "next";
import { workKo } from "@/lib/work";
import { CollectionPreview, Elsewhere } from "@/components/home";

export const metadata: Metadata = {
  title: "유혁준",
  description:
    "서울에서 일하는 풀스택 엔지니어. 네트워크 보안, 백엔드와 인프라를 거쳐 제품을 만듭니다.",
};

export default function HomeKo() {
  return (
    <main lang="ko">
      <h1>유혁준</h1>
      <p>서울에서 일하는 풀스택 엔지니어입니다.</p>
      <p>
        네트워크 보안 회사에서 엔진 백엔드 개발자로 커리어를 시작했습니다. C와
        Go로 온프레미스와 클라우드 프록시 보안 서버를 만들었습니다. 기업의 모든
        트래픽이 인라인으로 지나가는 서버였고, 4년 가까이 리눅스와 네트워크를
        낮은 레벨에서 다뤘습니다.
      </p>
      <p>
        그 다음엔 스타트업으로 옮겨 백엔드와 인프라를 맡았습니다. 앱이 커지는
        동안 서버를 지키는 일이 주였는데, 하다 보니 클라이언트 기능도 여럿
        만들게 됐습니다. 결제와 광고를 붙이면서부터는 비즈니스 관점에서
        개발하기 시작했고, 매출 지표를 직접 보며 다음에 무엇을 만들지
        정했습니다. 지금은 어떤 지표를 볼지, 언제 접을지를 정하는 일까지
        합니다.
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

      <CollectionPreview collection="writing" lang="ko" />
      <CollectionPreview collection="notes" lang="ko" limit={4} />
      <Elsewhere lang="ko" />
    </main>
  );
}
