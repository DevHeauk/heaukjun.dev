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
