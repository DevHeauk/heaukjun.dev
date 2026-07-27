import type { ReactNode } from "react";

type Lang = "ko" | "en";

function Figure({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="figure">
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Arrowhead. Inlined per-SVG so each figure stands on its own. */
function Arrowhead() {
  return (
    <defs>
      <marker
        id="a"
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0 1 L7 4 L0 7 z" className="d-head" />
      </marker>
    </defs>
  );
}

const copy = {
  ko: {
    twoTruths: "두 개의 진실이 갈라지는 구조와, 하나로 되돌린 구조",
    before: "이전",
    after: "이후",
    writers: ["결제", "적립", "만료 배치", "관리자 도구"],
    balance: "총량",
    history: "히스토리",
    balanceDerived: "총량 (파생)",
    historySource: "히스토리 (원천)",
    single: "applyCoinChange()",
    noCheck: "서로 확인하지 않음",
    recompute: "재계산 · 검증",
    race: "재계산이 스스로 오판하는 순간",
    readBalance: "총량 읽기",
    commit: "다른 요청이 커밋",
    sumHistory: "히스토리 합산",
    verdict: "멀쩡한 값을 불일치로 판정",
    time: "시간",
  },
  en: {
    twoTruths: "Two truths drifting apart, and the same thing collapsed into one",
    before: "Before",
    after: "After",
    writers: ["Purchase", "Reward", "Expiry job", "Admin tool"],
    balance: "balance",
    history: "history",
    balanceDerived: "balance (derived)",
    historySource: "history (source of truth)",
    single: "applyCoinChange()",
    noCheck: "never verify each other",
    recompute: "recompute · verify",
    race: "The moment a recompute convicts an innocent balance",
    readBalance: "read balance",
    commit: "another request commits",
    sumHistory: "sum history",
    verdict: "correct value flagged as a mismatch",
    time: "time",
  },
} as const;

function TwoTruths({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Figure caption={t.twoTruths}>
      <svg viewBox="0 0 620 330" role="img" aria-label={t.twoTruths}>
        <Arrowhead />
        <text x="0" y="14" className="d-label">
          {t.before}
        </text>
        {t.writers.map((w, i) => (
          <g key={w}>
            <rect x="0" y={34 + i * 30} width="118" height="22" rx="4" className="d-box" />
            <text x="59" y={49 + i * 30} className="d-text d-mid">
              {w}
            </text>
            <path d={`M118 ${45 + i * 30} L188 78`} className="d-line d-arrow" />
          </g>
        ))}
        <rect x="190" y="62" width="120" height="32" rx="4" className="d-box d-warn" />
        <text x="250" y="82" className="d-text d-mid">
          {t.balance}
        </text>
        <rect x="190" y="122" width="120" height="32" rx="4" className="d-box" />
        <text x="250" y="142" className="d-text d-mid">
          {t.history}
        </text>
        <path d="M250 96 L250 120" className="d-line d-dash" />
        <text x="322" y="112" className="d-text d-muted">
          {t.noCheck}
        </text>

        <line x1="0" y1="196" x2="620" y2="196" className="d-rule" />

        <text x="0" y="226" className="d-label">
          {t.after}
        </text>
        {t.writers.map((w, i) => (
          <g key={`a-${w}`}>
            <rect x="0" y={244 + i * 20} width="118" height="15" rx="3" className="d-box" />
            <text x="59" y={255 + i * 20} className="d-text d-mid d-sm">
              {w}
            </text>
          </g>
        ))}
        <path d="M118 274 L186 274" className="d-line d-arrow" />
        <rect x="188" y="258" width="146" height="32" rx="4" className="d-box d-ok" />
        <text x="261" y="278" className="d-text d-mid d-mono">
          {t.single}
        </text>
        <path d="M334 274 L392 274" className="d-line d-arrow" />
        <rect x="394" y="258" width="180" height="32" rx="4" className="d-box d-ok" />
        <text x="484" y="278" className="d-text d-mid">
          {t.historySource}
        </text>
        <path d="M484 258 L484 234" className="d-line d-arrow" />
        <rect x="394" y="202" width="180" height="30" rx="4" className="d-box" />
        <text x="484" y="221" className="d-text d-mid">
          {t.balanceDerived}
        </text>
        {/* Sits to the right of the arrow it annotates, never across it. */}
        <text x="498" y="246" className="d-text d-muted">
          {t.recompute}
        </text>
      </svg>
    </Figure>
  );
}

function SnapshotRace({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const steps = [
    { x: 60, label: t.readBalance },
    { x: 250, label: t.commit },
    { x: 450, label: t.sumHistory },
  ];
  return (
    <Figure caption={t.race}>
      <svg viewBox="0 0 620 176" role="img" aria-label={t.race}>
        <Arrowhead />
        <line x1="20" y1="86" x2="596" y2="86" className="d-line d-arrow" />
        <text x="610" y="102" className="d-text d-muted d-end">
          {t.time}
        </text>
        {steps.map((s, i) => (
          <g key={s.label}>
            <circle cx={s.x} cy="86" r="5" className={i === 1 ? "d-dot d-dot-warn" : "d-dot"} />
            <line x1={s.x} y1="86" x2={s.x} y2={i === 1 ? 112 : 56} className="d-line d-dash" />
            <text
              x={s.x}
              y={i === 1 ? 130 : 46}
              className={`d-text d-mid ${i === 1 ? "d-warn-text" : ""}`}
            >
              {s.label}
            </text>
          </g>
        ))}
        {/* Verdict gets its own row so it can never collide with a step label. */}
        <text x="610" y="170" className="d-text d-muted d-end">
          {t.verdict}
        </text>
      </svg>
    </Figure>
  );
}

export function mdxComponents(lang: Lang) {
  return {
    TwoTruths: () => <TwoTruths lang={lang} />,
    SnapshotRace: () => <SnapshotRace lang={lang} />,
  };
}
