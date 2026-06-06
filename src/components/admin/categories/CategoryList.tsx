'use client';

import { useRouter } from 'next/navigation';
import type { Category } from '@/types';

interface Props {
  categories: Category[];
}

export default function CategoryList({ categories }: Props) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm('削除しますか？')) return;
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  if (categories.length === 0) {
    return <p className="text-gray-500">カテゴリがありません</p>;
  }

  return (
    <ul className="divide-y rounded border bg-white">
      {categories.map((cat) => (
        <li key={cat.id} className="flex items-center justify-between px-4 py-3">
          <span className="font-medium">{cat.name}</span>
          <span className="text-sm text-gray-400">{cat.slug}</span>
          <button
            onClick={() => handleDelete(cat.id)}
            className="ml-4 text-sm text-red-500 hover:text-red-700"
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
