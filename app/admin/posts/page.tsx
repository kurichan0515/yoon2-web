import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import PostList from '@/components/admin/posts/PostList';

export default async function PostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('*, categories:post_categories(categories(*)), tags:post_tags(tags(*))')
    .order('created_at', { ascending: false });

  const normalizedPosts = (posts ?? []).map((p: any) => ({
    ...p,
    categories: p.categories.map((c: any) => c.categories),
    tags: p.tags.map((t: any) => t.tags),
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
