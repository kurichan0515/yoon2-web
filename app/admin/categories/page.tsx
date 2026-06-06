import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import CategoryList from '@/components/admin/categories/CategoryList';

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">カテゴリ管理</h1>
        <Link
          href="/admin/categories/new"
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          新規作成
        </Link>
      </div>
      <CategoryList categories={categories ?? []} />
    </div>
  );
}
