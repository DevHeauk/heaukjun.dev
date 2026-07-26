export type Job = {
  company: string;
  role: string;
  period: string;
  note: string;
};

export const work: Job[] = [
  {
    company: "Yatav",
    role: "Dev Lead",
    period: "2025 — now",
    note: "Leading five engineers at an early-stage startup through a pivot into AI security.",
  },
  {
    company: "Levit",
    role: "Software Engineer",
    period: "2025",
    note: "Only engineer on the app-tech squad of a commerce app, across three products from the React Native client through the backend.",
  },
  {
    company: "Hilokal",
    role: "Full-stack Engineer",
    period: "2022 — 2025",
    note: "Backend and infrastructure for a real-time voice app, from 150K to 2M registered users. Client features and monetization too.",
  },
  {
    company: "Monitorapp",
    role: "Server Engineer",
    period: "2018 — 2022",
    note: "C, on an inline proxy security server carrying all traffic for companies of up to 10,000 employees.",
  },
];

export const workKo: Job[] = [
  {
    company: "야타브",
    role: "개발 리드",
    period: "2025 — 현재",
    note: "초기 스타트업에서 개발자 다섯 명과 함께 AI 보안으로 피벗하는 중입니다.",
  },
  {
    company: "레브잇",
    role: "소프트웨어 엔지니어",
    period: "2025",
    note: "커머스 앱 앱테크 스쿼드의 유일한 개발자로, React Native 클라이언트부터 백엔드까지 세 개 제품을 맡았습니다.",
  },
  {
    company: "하이로컬",
    role: "풀스택 엔지니어",
    period: "2022 — 2025",
    note: "실시간 음성 앱의 백엔드와 인프라를 맡아 가입자 15만에서 200만까지 함께했습니다. 클라이언트 기능과 수익화도 했습니다.",
  },
  {
    company: "모니터랩",
    role: "서버 개발자",
    period: "2018 — 2022",
    note: "직원 1만 명 규모 기업의 전 트래픽이 인라인으로 통과하는 프록시 보안 서버를 C로 개발했습니다.",
  },
];
