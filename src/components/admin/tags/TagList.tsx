'use client';

import { useRouter } from 'next/navigation';
import type { Tag } from '@/types';

interface Props {
  tags: Tag[];
}

export default function TagList({ tags }: Props) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm('削除しますか？')) return;
    await fetch(`/api/admin/tags/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  if (tags.length === 0) {
    return <p className="text-gray-500">タグがありません</p>;
  }

  return (
    <ul className="divide-y rounded border bg-white">
      {tags.map((tag) => (
        <li key={tag.id} className="flex items-center justify-between px-4 py-3">
          <span className="font-medium">{tag.name}</span>
          <span className="text-sm text-gray-400">{tag.slug}</span>
          <button
            onClick={() => handleDelete(tag.id)}
            className="ml-4 text-sm text-red-500 hover:text-red-700"
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
