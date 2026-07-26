export type Job = {
  company: string;
  role: string;
  period: string;
  note: string;
};

// Korean is written first; English follows it.
export const workKo: Job[] = [
  {
    company: "야타브",
    role: "풀스택 Dev Lead",
    period: "2025 — 현재",
    note: "초기 스타트업에서 개발자 5명, 디자이너 1명과 함께 일합니다. AI 보안으로 피벗하면서 제품을 만들고 내보내고 확인하는 일을 반복하고 있습니다.",
  },
  {
    company: "레브잇",
    role: "소프트웨어 엔지니어",
    period: "2025",
    note: "커머스 앱 앱테크 스쿼드에 개발자가 저 하나였습니다. 제품 세 개를 React Native 클라이언트부터 백엔드까지 혼자 맡았습니다.",
  },
  {
    company: "하이로컬",
    role: "풀스택 엔지니어",
    period: "2022 — 2025",
    note: "가입자가 15만에서 200만이 되는 동안 실시간 음성 앱의 백엔드와 인프라를 맡았습니다. 클라이언트 기능도 직접 만들었고, 광고와 구독 같은 수익화도 했습니다.",
  },
  {
    company: "모니터랩",
    role: "서버 개발자",
    period: "2018 — 2022",
    note: "수천에서 1만 명 규모 기업의 트래픽이 전부 지나가는 프록시 보안 서버(SWG)를 C로 만들고 고쳤습니다.",
  },
];

export const work: Job[] = [
  {
    company: "Yatav",
    role: "Full-stack Dev Lead",
    period: "2025 — now",
    note: "Working with five engineers and a designer at an early-stage startup. We're pivoting into AI security, so it's been a loop of building, shipping, and finding out what holds.",
  },
  {
    company: "Levit",
    role: "Software Engineer",
    period: "2025",
    note: "I was the only engineer on a commerce app's app-tech squad, handling three products alone from the React Native client through the backend.",
  },
  {
    company: "Hilokal",
    role: "Full-stack Engineer",
    period: "2022 — 2025",
    note: "Backend and infrastructure for a real-time voice app while it went from 150K to 2M users. I built client features too, and worked on ads and subscriptions.",
  },
  {
    company: "Monitorapp",
    role: "Server Engineer",
    period: "2018 — 2022",
    note: "Built and maintained a proxy security server (SWG) in C, carrying all traffic for companies of a few thousand to ten thousand people.",
  },
];
