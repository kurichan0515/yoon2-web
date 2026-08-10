import Link from 'next/link';
import type { Category } from '@/types';

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <Link
      href={`/blog/category/${category.slug}`}
      className="rounded bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700 hover:bg-indigo-200"
    >
      {category.name}
    </Link>
  );
}
