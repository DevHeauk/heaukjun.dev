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
  /** true when content/<slug>.ko.mdx exists */
  hasKo: boolean;
};

function read(file: string) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  return matter(raw);
}

function files(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));
}

/** English posts. Drafts (_prefix) and Korean translations (.ko) are excluded. */
export function getPosts(): Post[] {
  const all = files();
  const koSlugs = new Set(
    all
      .filter((f) => /\.ko\.mdx?$/.test(f))
      .map((f) => f.replace(/\.ko\.mdx?$/, ""))
  );

  return all
    .filter((f) => !/\.ko\.mdx?$/.test(f))
    .filter((f) => !f.startsWith("_"))
    .map((file) => {
      const { data, content } = read(file);
      const slug = file.replace(/\.mdx?$/, "");
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        summary: data.summary,
        content,
        hasKo: koSlugs.has(slug),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

/** Korean translation of a post, if the author wrote one. */
export function getKoPost(slug: string): Post | undefined {
  const english = getPost(slug);
  if (!english?.hasKo) return undefined;

  const file = files().find((f) => new RegExp(`^${slug}\\.ko\\.mdx?$`).test(f));
  if (!file) return undefined;

  const { data, content } = read(file);
  return {
    slug,
    title: data.title ?? english.title,
    date: english.date,
    summary: data.summary,
    content,
    hasKo: true,
  };
}
