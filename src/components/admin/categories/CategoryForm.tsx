'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { generateSlug } from '@/utils/slug';
import type { Category } from '@/types';

interface Props {
  category?: Category;
}

export default function CategoryForm({ category }: Props) {
  const router = useRouter();
  const [name, setName] = useState(category?.name ?? '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const slug = category?.slug ?? generateSlug(name);

    const { error } = category
      ? await supabase.from('categories').update({ name, slug }).eq('id', category.id)
      : await supabase.from('categories').insert({ name, slug });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/admin/categories');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">カテゴリ名</label>
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
