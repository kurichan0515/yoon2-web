'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import PostStatusBadge from './PostStatusBadge';
import type { Post } from '@/types';

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm('削除しますか？')) return;
    const supabase = createClient();
    await supabase.from('posts').delete().eq('id', id);
    router.refresh();
  }

  if (posts.length === 0) {
    return <p className="text-gray-500">記事がありません</p>;
  }

  return (
    <ul className="divide-y rounded border bg-white">
      {posts.map((post) => (
        <li key={post.id} className="flex items-center justify-between px-4 py-3 gap-4">
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">{post.title}</p>
            <p className="text-xs text-gray-400">{post.slug}</p>
          </div>
          <PostStatusBadge status={post.status} />
          <div className="flex gap-2 shrink-0">
            <Link
              href={`/admin/posts/${post.id}/edit`}
              className="text-sm text-indigo-600 hover:underline"
            >
              編集
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
