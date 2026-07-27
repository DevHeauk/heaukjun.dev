import type { Collection } from "./posts";

export const SECTIONS = {
  writing: {
    ko: {
      title: "글",
      nav: "글",
      blurb: "일하면서 부딪힌 문제와, 지금 다시 한다면 어떻게 할지.",
    },
    en: {
      title: "Writing",
      nav: "Writing",
      blurb: "Problems I ran into at work, and what I'd do differently now.",
    },
  },
  notes: {
    ko: {
      title: "개념 정리",
      nav: "개념",
      blurb: "글에서 반복해서 참조하는 개념들을 따로 정리해 둡니다.",
    },
    en: {
      title: "Notes",
      nav: "Notes",
      blurb: "Concepts the posts keep referring back to, written up once.",
    },
  },
} as const;

export function isCollection(value: string): value is Collection {
  return value in SECTIONS;
}
