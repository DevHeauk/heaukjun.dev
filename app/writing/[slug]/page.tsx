import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main>
      <h1>{post.title}</h1>
      <p className="post-meta">
        <time dateTime={post.date}>{post.date}</time>
        {post.hasTranslation && (
          <>
            {" · "}
            <Link href={`/ko/writing/${post.slug}`}>한국어</Link>
          </>
        )}
      </p>
      <MDXRemote source={post.content} />
    </main>
  );
}
