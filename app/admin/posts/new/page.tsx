import { createClient } from '@/lib/supabase/server';
import PostForm from '@/components/admin/posts/PostForm';

export default async function NewPostPage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: tags }] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('tags').select('*').order('name'),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">記事作成</h1>
      <PostForm categories={categories ?? []} tags={tags ?? []} />
    </div>
  );
}
