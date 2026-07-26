import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getKoPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts()
    .filter((post) => post.hasKo)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getKoPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function KoPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getKoPost(slug);
  if (!post) notFound();

  return (
    <main lang="ko">
      <h1>{post.title}</h1>
      <p className="post-meta">
        <time dateTime={post.date}>{post.date}</time>
        {" · "}
        <Link href={`/writing/${post.slug}`}>English</Link>
      </p>
      <MDXRemote source={post.content} />
    </main>
  );
}
