import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PostForm from '@/components/admin/posts/PostForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  const [post, categories, tags] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } }),
  ]);

  if (!post) notFound();

  const normalizedPost = {
    ...post,
    categories: post.categories.map((c) => c.category),
    tags: post.tags.map((t) => t.tag),
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">記事編集</h1>
      <PostForm post={normalizedPost} categories={categories} tags={tags} />
    </div>
  );
}
