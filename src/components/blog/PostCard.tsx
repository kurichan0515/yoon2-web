import Link from 'next/link';
import Image from 'next/image';
import CategoryBadge from './CategoryBadge';
import TagBadge from './TagBadge';
import type { Post } from '@/types';

export default function PostCard({ post }: { post: Post }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('ja-JP')
    : '';

  return (
    <article className="rounded-lg border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {post.eyecatch_url && (
        <div className="relative h-48 w-full">
          <Image src={post.eyecatch_url} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-1">
          {post.categories.map((cat) => (
            <CategoryBadge key={cat.id} category={cat} />
          ))}
        </div>
        <h2 className="font-bold text-lg leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600">
            {post.title}
          </Link>
        </h2>
        {post.meta_description && (
          <p className="text-sm text-gray-600 line-clamp-2">{post.meta_description}</p>
        )}
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
        {date && <time className="text-xs text-gray-400">{date}</time>}
      </div>
    </article>
  );
}
