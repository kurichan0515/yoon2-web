import type { PostStatus } from '@/types';

const config: Record<PostStatus, { label: string; className: string }> = {
  published: { label: '公開', className: 'bg-green-100 text-green-700' },
  draft: { label: '下書き', className: 'bg-yellow-100 text-yellow-700' },
  archived: { label: 'アーカイブ', className: 'bg-gray-100 text-gray-600' },
};

export default function PostStatusBadge({ status }: { status: PostStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${className}`}>{label}</span>
  );
}
