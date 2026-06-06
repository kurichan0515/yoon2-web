import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PostForm from '@/components/admin/posts/PostForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: post }, { data: categories }, { data: tags }] = await Promise.all([
    supabase
      .from('posts')
      .select('*, categories:post_categories(categories(*)), tags:post_tags(tags(*))')
      .eq('id', id)
      .single(),
    supabase.from('categories').select('*').order('name'),
    supabase.from('tags').select('*').order('name'),
  ]);

  if (!post) notFound();

  const normalizedPost = {
    ...post,
    categories: (post.categories as any[]).map((c) => c.categories),
    tags: (post.tags as any[]).map((t) => t.tags),
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">記事編集</h1>
      <PostForm post={normalizedPost} categories={categories ?? []} tags={tags ?? []} />
    </div>
  );
}
