import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/blog/Pagination';

const PER_PAGE = 9;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const skip = (currentPage - 1) * PER_PAGE;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        categories: { some: { categoryId: category.id } },
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: PER_PAGE,
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.post.count({
      where: {
        status: 'PUBLISHED',
        categories: { some: { categoryId: category.id } },
      },
    }),
  ]);

  const totalPages = Math.ceil(total / PER_PAGE);
  const normalizedPosts = posts.map((p) => ({
    ...p,
    categories: p.categories.map((c) => c.category),
    tags: p.tags.map((t) => t.tag),
  }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold">カテゴリ: {category.name}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {normalizedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/blog/category/${slug}`} />
    </main>
  );
}
