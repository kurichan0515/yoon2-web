import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center gap-2" aria-label="ページネーション">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="rounded border px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          前へ
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`rounded border px-3 py-1.5 text-sm ${
            page === currentPage
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="rounded border px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          次へ
        </Link>
      )}
    </nav>
  );
}
