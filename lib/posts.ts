import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  content: string;
  /** true when the other-language file exists */
  hasTranslation: boolean;
};

function read(file: string) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  return matter(raw);
}

function files(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .filter((f) => !f.startsWith("_")); // _draft.mdx stays unpublished
}

function koSlugs(): Set<string> {
  return new Set(
    files()
      .filter((f) => /\.ko\.mdx?$/.test(f))
      .map((f) => f.replace(/\.ko\.mdx?$/, ""))
  );
}

/** English posts, newest first. */
export function getPosts(): Post[] {
  const ko = koSlugs();

  return files()
    .filter((f) => !/\.ko\.mdx?$/.test(f))
    .map((file) => {
      const { data, content } = read(file);
      const slug = file.replace(/\.mdx?$/, "");
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        summary: data.summary,
        content,
        hasTranslation: ko.has(slug),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Korean posts, newest first. Only posts that actually have a translation. */
export function getKoPosts(): Post[] {
  return getPosts()
    .filter((p) => p.hasTranslation)
    .map((english) => {
      const file = files().find((f) =>
        new RegExp(`^${english.slug}\\.ko\\.mdx?$`).test(f)
      )!;
      const { data, content } = read(file);
      return {
        slug: english.slug,
        title: data.title ?? english.title,
        date: english.date, // dates live on the English original
        summary: data.summary,
        content,
        hasTranslation: true,
      };
    });
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getKoPost(slug: string): Post | undefined {
  return getKoPosts().find((p) => p.slug === slug);
}

/** Published English posts with no Korean version yet. Used by `npm run check`. */
export function untranslated(): string[] {
  return getPosts()
    .filter((p) => !p.hasTranslation)
    .map((p) => p.slug);
}
