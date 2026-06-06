import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/blog/Pagination';

const PER_PAGE = 9;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const from = (currentPage - 1) * PER_PAGE;

  const supabase = await createClient();
  const { data: tag } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!tag) notFound();

  const { data: posts, count } = await supabase
    .from('posts')
    .select('*, categories:post_categories(categories(*)), tags:post_tags!inner(tags!inner(*))', { count: 'exact' })
    .eq('status', 'published')
    .eq('post_tags.tags.slug', slug)
    .order('published_at', { ascending: false })
    .range(from, from + PER_PAGE - 1);

  const totalPages = Math.ceil((count ?? 0) / PER_PAGE);
  const normalizedPosts = (posts ?? []).map((p: any) => ({
    ...p,
    categories: p.categories.map((c: any) => c.categories),
    tags: p.tags.map((t: any) => t.tags),
  }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold">タグ: #{tag.name}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {normalizedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/blog/tag/${slug}`} />
    </main>
  );
}
