import type { PostStatus } from '@prisma/client';

const config: Record<PostStatus, { label: string; className: string }> = {
  PUBLISHED: { label: '公開', className: 'bg-green-100 text-green-700' },
  DRAFT: { label: '下書き', className: 'bg-yellow-100 text-yellow-700' },
  ARCHIVED: { label: 'アーカイブ', className: 'bg-gray-100 text-gray-600' },
};

export default function PostStatusBadge({ status }: { status: PostStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${className}`}>{label}</span>
  );
}
