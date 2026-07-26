import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Korean is the source language.
 *   content/<slug>.ko.mdx  — Korean, written first, carries the date
 *   content/<slug>.mdx     — English translation
 * A file starting with _ is a draft and is never published.
 */
export type Post = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  content: string;
  /** the other language exists for this slug */
  hasTranslation: boolean;
};

function files(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .filter((f) => !f.startsWith("_"));
}

function find(slug: string, lang: "ko" | "en"): string | undefined {
  const pattern =
    lang === "ko"
      ? new RegExp(`^${slug}\\.ko\\.mdx?$`)
      : new RegExp(`^${slug}\\.mdx?$`);
  return files().find((f) => pattern.test(f));
}

function load(file: string) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  return matter(raw);
}

export function slugs(lang: "ko" | "en"): string[] {
  return files()
    .filter((f) =>
      lang === "ko" ? /\.ko\.mdx?$/.test(f) : !/\.ko\.mdx?$/.test(f)
    )
    .map((f) => f.replace(/(\.ko)?\.mdx?$/, ""));
}

function build(slug: string, lang: "ko" | "en"): Post | undefined {
  const file = find(slug, lang);
  if (!file) return undefined;

  const { data, content } = load(file);
  const other = lang === "ko" ? "en" : "ko";
  const otherFile = find(slug, other);

  // Dates live on the Korean original; the translation borrows it.
  let date: string = data.date ?? "";
  if (!date && otherFile) date = load(otherFile).data.date ?? "";

  return {
    slug,
    title: data.title ?? slug,
    date,
    summary: data.summary,
    content,
    hasTranslation: Boolean(otherFile),
  };
}

function sorted(lang: "ko" | "en"): Post[] {
  return slugs(lang)
    .map((slug) => build(slug, lang))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPosts = () => sorted("en");
export const getKoPosts = () => sorted("ko");

export const getPost = (slug: string) => build(slug, "en");
export const getKoPost = (slug: string) => build(slug, "ko");
