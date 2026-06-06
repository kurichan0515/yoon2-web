import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import PostBody from '@/components/blog/PostBody';
import CategoryBadge from '@/components/blog/CategoryBadge';
import TagBadge from '@/components/blog/TagBadge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, metaDescription: true, ogpImageUrl: true },
  });

  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription ?? undefined,
    openGraph: {
      title: post.title,
      description: post.metaDescription ?? undefined,
      images: post.ogpImageUrl ? [post.ogpImageUrl] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    },
  });

  if (!post || post.status !== 'PUBLISHED') notFound();

  const categories = post.categories.map((c) => c.category);
  const tags = post.tags.map((t) => t.tag);
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('ja-JP')
    : '';

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article>
        <header className="mb-8 space-y-3">
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <CategoryBadge key={cat.id} category={cat} />
            ))}
          </div>
          <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
          {date && <time className="text-sm text-gray-400">{date}</time>}
        </header>
        <PostBody html={post.body ?? ''} />
      </article>
    </main>
  );
}
