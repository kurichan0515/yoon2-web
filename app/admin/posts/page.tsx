import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PostList from '@/components/admin/posts/PostList';

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    },
  });

  const normalizedPosts = posts.map((p) => ({
    ...p,
    categories: p.categories.map((c) => c.category),
    tags: p.tags.map((t) => t.tag),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">記事管理</h1>
        <Link
          href="/admin/posts/new"
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          新規作成
        </Link>
      </div>
      <PostList posts={normalizedPosts} />
    </div>
  );
}
