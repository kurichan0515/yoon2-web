import { prisma } from '@/lib/prisma';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/blog/Pagination';

const PER_PAGE = 9;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const skip = (currentPage - 1) * PER_PAGE;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: PER_PAGE,
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
  ]);

  const totalPages = Math.ceil(total / PER_PAGE);
  const normalizedPosts = posts.map((p) => ({
    ...p,
    categories: p.categories.map((c) => c.category),
    tags: p.tags.map((t) => t.tag),
  }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold">ブログ</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {normalizedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
    </main>
  );
}
