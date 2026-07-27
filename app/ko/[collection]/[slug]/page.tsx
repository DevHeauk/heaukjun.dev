import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { getAll, getOne, type Collection } from "@/lib/posts";
import { SECTIONS, isCollection } from "@/lib/sections";
import { mdxComponents } from "@/components/mdx";

export function generateStaticParams() {
  return (Object.keys(SECTIONS) as Collection[]).flatMap((collection) =>
    getAll(collection, "ko").map((post) => ({ collection, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection, slug } = await params;
  if (!isCollection(collection)) return {};
  const post = getOne(collection, slug, "ko");
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PageKo({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection, slug } = await params;
  if (!isCollection(collection)) notFound();

  const post = getOne(collection, slug, "ko");
  if (!post) notFound();

  return (
    <main lang="ko">
      <h1>{post.title}</h1>
      <p className="post-meta">
        <time dateTime={post.date}>{post.date}</time>
        {post.hasTranslation && (
          <>
            {" · "}
            <Link href={`/${collection}/${post.slug}`}>English</Link>
          </>
        )}
      </p>
      <MDXRemote
        source={post.content}
        components={mdxComponents("ko")}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
      />
    </main>
  );
}
