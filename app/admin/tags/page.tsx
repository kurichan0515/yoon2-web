import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import TagList from '@/components/admin/tags/TagList';

export default async function TagsPage() {
  const supabase = await createClient();
  const { data: tags } = await supabase
    .from('tags')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">タグ管理</h1>
        <Link
          href="/admin/tags/new"
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          新規作成
        </Link>
      </div>
      <TagList tags={tags ?? []} />
    </div>
  );
}
