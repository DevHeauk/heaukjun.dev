import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

/**
 * Korean is the source language.
 *   content/<collection>/<slug>.ko.mdx  — Korean, written first, carries the date
 *   content/<collection>/<slug>.mdx     — English translation
 * A file starting with _ is a draft and is never published.
 *
 * writing — posts about something that happened at work
 * notes   — concept write-ups the posts link to
 */
export type Collection = "writing" | "notes";
export type Lang = "ko" | "en";

export type Post = {
  collection: Collection;
  slug: string;
  title: string;
  date: string;
  summary?: string;
  content: string;
  /** the other language exists for this slug */
  hasTranslation: boolean;
};

function dir(collection: Collection) {
  return path.join(process.cwd(), "content", collection);
}

function files(collection: Collection): string[] {
  const d = dir(collection);
  if (!fs.existsSync(d)) return [];
  return fs
    .readdirSync(d)
    .filter((f) => /\.mdx?$/.test(f))
    .filter((f) => !f.startsWith("_"));
}

function find(collection: Collection, slug: string, lang: Lang) {
  const pattern =
    lang === "ko"
      ? new RegExp(`^${slug}\\.ko\\.mdx?$`)
      : new RegExp(`^${slug}\\.mdx?$`);
  return files(collection).find((f) => pattern.test(f));
}

function load(collection: Collection, file: string) {
  const raw = fs.readFileSync(path.join(dir(collection), file), "utf8");
  return matter(raw);
}

export function slugs(collection: Collection, lang: Lang): string[] {
  return files(collection)
    .filter((f) =>
      lang === "ko" ? /\.ko\.mdx?$/.test(f) : !/\.ko\.mdx?$/.test(f)
    )
    .map((f) => f.replace(/(\.ko)?\.mdx?$/, ""));
}

function build(
  collection: Collection,
  slug: string,
  lang: Lang
): Post | undefined {
  const file = find(collection, slug, lang);
  if (!file) return undefined;

  const { data, content } = load(collection, file);
  const otherFile = find(collection, slug, lang === "ko" ? "en" : "ko");

  // Dates live on the Korean original; the translation borrows it.
  let date: string = data.date ?? "";
  if (!date && otherFile) date = load(collection, otherFile).data.date ?? "";

  return {
    collection,
    slug,
    title: data.title ?? slug,
    date,
    summary: data.summary,
    content,
    hasTranslation: Boolean(otherFile),
  };
}

export function getAll(collection: Collection, lang: Lang): Post[] {
  return slugs(collection, lang)
    .map((slug) => build(collection, slug, lang))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getOne(collection: Collection, slug: string, lang: Lang) {
  return build(collection, slug, lang);
}

/** Headings for the table of contents, matching rehype-slug's ids. */
export function headings(content: string) {
  const slugger = new GithubSlugger();
  const out: { id: string; text: string; depth: 2 | 3 }[] = [];
  let inCode = false;

  for (const line of content.split("\n")) {
    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!m) continue;

    const text = m[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();

    out.push({ id: slugger.slug(text), text, depth: m[1].length as 2 | 3 });
  }
  return out;
}
