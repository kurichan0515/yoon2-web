import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import PostBody from '@/components/blog/PostBody';
import CategoryBadge from '@/components/blog/CategoryBadge';
import TagBadge from '@/components/blog/TagBadge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('title, meta_description, ogp_image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) return {};

  return {
    title: post.title,
    description: post.meta_description ?? undefined,
    openGraph: {
      title: post.title,
      description: post.meta_description ?? undefined,
      images: post.ogp_image_url ? [post.ogp_image_url] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*, categories:post_categories(categories(*)), tags:post_tags(tags(*))')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) notFound();

  const categories = (post.categories as any[]).map((c) => c.categories);
  const tags = (post.tags as any[]).map((t) => t.tags);
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('ja-JP')
    : '';

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article>
        <header className="mb-8 space-y-3">
          <div className="flex flex-wrap gap-1">
            {categories.map((cat: any) => (
              <CategoryBadge key={cat.id} category={cat} />
            ))}
          </div>
          <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag: any) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
          {date && <time className="text-sm text-gray-400">{date}</time>}
        </header>
        <PostBody html={post.body} />
      </article>
    </main>
  );
}
