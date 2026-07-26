export type Job = {
  company: string;
  role: string;
  period: string;
  note: string;
};

export const work: Job[] = [
  {
    company: "Yatav",
    role: "Full-stack Dev Lead",
    period: "2025 — now",
    note: "Leading five engineers and a designer at an early-stage startup, building and validating PMF products through a pivot into AI security.",
  },
  {
    company: "Levit",
    role: "Software Engineer",
    period: "2025",
    note: "The only engineer on a commerce app's app-tech squad, across three products from the React Native client through the backend.",
  },
  {
    company: "Hilokal",
    role: "Full-stack Engineer",
    period: "2022 — 2025",
    note: "Backend and infrastructure for a real-time voice language-exchange app as it grew from 150K to 2M registered users. Built React Native client features too, and took on monetization.",
  },
  {
    company: "Monitorapp",
    role: "Server Engineer",
    period: "2018 — 2022",
    note: "C, on an inline proxy security server carrying all traffic for companies of up to 10,000 employees — event loop, queue and worker, non-blocking.",
  },
];

export const workKo: Job[] = [
  {
    company: "야타브",
    role: "풀스택 Dev Lead",
    period: "2025 — 현재",
    note: "초기 스타트업에서 개발자 5명과 디자이너 1명을 리드하고 있습니다. AI 보안으로 피벗하며 PMF 제품을 개발·배포·검증하고 있습니다.",
  },
  {
    company: "레브잇",
    role: "소프트웨어 엔지니어",
    period: "2025",
    note: "앱테크 스쿼드의 유일한 개발자로 핵심 3개 제품을 클라이언트(React Native)부터 백엔드까지 전부 맡아 개발했습니다.",
  },
  {
    company: "하이로컬",
    role: "풀스택 엔지니어",
    period: "2022 — 2025",
    note: "가입자 15만에서 200만으로 성장하는 동안 실시간 음성 언어교환 앱의 백엔드·인프라를 맡았고, React Native 클라이언트 기능도 직접 개발했습니다. 수익화(광고·구독)까지 맡았습니다.",
  },
  {
    company: "모니터랩",
    role: "서버 개발자",
    period: "2018 — 2022",
    note: "수천~1만 명 기업의 전 트래픽이 인라인으로 통과하는 프록시 보안 서버(SWG)를 C로 개발·유지보수했습니다.",
  },
];
