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
    poolCap: "앱마다 자기 풀을 쥐고 있어서, 합치면 DB 한계를 넘습니다",
    proxyShare: "프록시가 진짜 커넥션 몇 개를 붙잡고 돌려씁니다",
    app: "앱",
    pool: "풀 100",
    dbMax: "MySQL  max=500",
    over: "600개 요청 → 100개 즉시 거절",
    proxy: "RDS Proxy  공용 50",
    realConn: "실제 커넥션 50",
    queued: "넘치면 대기열",
    chain: "느린 쿼리 하나가 서비스 전체를 세우는 경로",
    chainSteps: ["인덱스 없음", "풀스캔", "커넥션 오래 점유", "풀 고갈", "전체 지연"],
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
    poolCap: "Each app holds its own pool, and together they exceed the database's limit",
    proxyShare: "The proxy holds a few real connections and hands them around",
    app: "app",
    pool: "pool 100",
    dbMax: "MySQL  max=500",
    over: "600 wanted → 100 rejected outright",
    proxy: "RDS Proxy  shared 50",
    realConn: "50 real connections",
    queued: "overflow queues",
    chain: "How one slow query stalls the whole service",
    chainSteps: ["no index", "full scan", "connection held", "pool drained", "everything waits"],
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


function PoolCap({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const apps = [0, 1, 2, 3, 4, 5];
  return (
    <Figure caption={t.poolCap}>
      <svg viewBox="0 0 620 250" role="img" aria-label={t.poolCap}>
        <Arrowhead />
        {apps.map((i) => {
          const y = 20 + i * 34;
          const rejected = i >= 5;
          return (
            <g key={i}>
              <rect x="0" y={y} width="150" height="24" rx="4"
                className={rejected ? "d-box d-warn" : "d-box"} />
              <text x="75" y={y + 16} className="d-text d-mid d-sm">
                {t.app}
                {i + 1} · {t.pool}
              </text>
              <path d={`M150 ${y + 12} L300 ${rejected ? 150 : 120}`}
                className={rejected ? "d-line d-dash d-arrow" : "d-line d-arrow"} />
            </g>
          );
        })}
        <rect x="304" y="96" width="180" height="48" rx="4" className="d-box" />
        <text x="394" y="125" className="d-text d-mid d-mono">
          {t.dbMax}
        </text>
        <text x="304" y="176" className="d-text d-warn-text d-sm">
          {t.over}
        </text>
      </svg>
    </Figure>
  );
}

function Multiplexing({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const apps = [0, 1, 2, 3];
  return (
    <Figure caption={t.proxyShare}>
      <svg viewBox="0 0 620 200" role="img" aria-label={t.proxyShare}>
        <Arrowhead />
        {apps.map((i) => {
          const y = 24 + i * 38;
          return (
            <g key={i}>
              <rect x="0" y={y} width="118" height="24" rx="4" className="d-box" />
              <text x="59" y={y + 16} className="d-text d-mid d-sm">
                {t.app}
                {i + 1}
              </text>
              <path d={`M118 ${y + 12} L214 100`} className="d-line d-arrow" />
            </g>
          );
        })}
        <rect x="218" y="76" width="164" height="48" rx="4" className="d-box d-ok" />
        <text x="300" y="105" className="d-text d-mid d-mono">
          {t.proxy}
        </text>
        <path d="M382 100 L446 100" className="d-line d-arrow" />
        <text x="414" y="90" className="d-text d-muted d-mid d-sm">
          {t.realConn}
        </text>
        <rect x="450" y="76" width="150" height="48" rx="4" className="d-box" />
        <text x="525" y="105" className="d-text d-mid d-mono">
          MySQL
        </text>
        <text x="218" y="148" className="d-text d-muted d-sm">
          {t.queued}
        </text>
      </svg>
    </Figure>
  );
}


function Chain({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const steps = t.chainSteps;
  const w = 118;
  const gap = 8;
  return (
    <Figure caption={t.chain}>
      <svg viewBox="0 0 620 90" role="img" aria-label={t.chain}>
        <Arrowhead />
        {steps.map((label, i) => {
          const x = i * (w + gap);
          const last = i === steps.length - 1;
          return (
            <g key={label}>
              <rect x={x} y="24" width={w} height="34" rx="4"
                className={last ? "d-box d-warn" : "d-box"} />
              <text x={x + w / 2} y="45"
                className={`d-text d-mid d-sm ${last ? "d-warn-text" : ""}`}>
                {label}
              </text>
              {!last && (
                <path d={`M${x + w} 41 L${x + w + gap - 2} 41`} className="d-line d-arrow" />
              )}
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

export function mdxComponents(lang: Lang) {
  return {
    TwoTruths: () => <TwoTruths lang={lang} />,
    SnapshotRace: () => <SnapshotRace lang={lang} />,
    PoolCap: () => <PoolCap lang={lang} />,
    Multiplexing: () => <Multiplexing lang={lang} />,
    Chain: () => <Chain lang={lang} />,
  };
}
