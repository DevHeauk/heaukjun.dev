import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAll, getOne, headings, type Collection } from "@/lib/posts";
import { SECTIONS, isCollection } from "@/lib/sections";
import { mdxComponents } from "@/components/mdx";
import Toc from "@/components/toc";

export function generateStaticParams() {
  return (Object.keys(SECTIONS) as Collection[]).flatMap((collection) =>
    getAll(collection, "en").map((post) => ({ collection, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection, slug } = await params;
  if (!isCollection(collection)) return {};
  const post = getOne(collection, slug, "en");
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function Page({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection, slug } = await params;
  if (!isCollection(collection)) notFound();

  const post = getOne(collection, slug, "en");
  if (!post) notFound();

  return (
    <main>
      <h1>{post.title}</h1>
      <p className="post-meta">
        <time dateTime={post.date}>{post.date}</time>
        {post.hasTranslation && (
          <>
            {" · "}
            <Link href={`/ko/${collection}/${post.slug}`}>한국어</Link>
          </>
        )}
      </p>
      <Toc headings={headings(post.content)} />
      <MDXRemote
        source={post.content}
        components={mdxComponents("en")}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeHighlight],
          },
        }}
      />
    </main>
  );
}
