import Link from 'next/link';
import type { Tag } from '@/types';

export default function TagBadge({ tag }: { tag: Tag }) {
  return (
    <Link
      href={`/blog/tag/${tag.slug}`}
      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200"
    >
      #{tag.name}
    </Link>
  );
}
