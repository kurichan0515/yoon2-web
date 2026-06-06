'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Tag } from '@/types';

interface Props {
  tag?: Tag;
}

export default function TagForm({ tag }: Props) {
  const router = useRouter();
  const [name, setName] = useState(tag?.name ?? '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = tag ? `/api/admin/tags/${tag.id}` : '/api/admin/tags';
    const method = tag ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? '保存に失敗しました');
      setLoading(false);
      return;
    }

    router.push('/admin/tags');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">タグ名</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? '保存中...' : '保存'}
      </button>
    </form>
  );
}
