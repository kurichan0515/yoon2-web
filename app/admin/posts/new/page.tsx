import { prisma } from '@/lib/prisma';
import PostForm from '@/components/admin/posts/PostForm';

export default async function NewPostPage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">記事作成</h1>
      <PostForm categories={categories} tags={tags} />
    </div>
  );
}
