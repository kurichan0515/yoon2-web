'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import TiptapLink from '@tiptap/extension-link';
import ImageUploader from './ImageUploader';
import type { Post, Category, Tag } from '@/types';
import type { PostStatus } from '@prisma/client';

interface Props {
  post?: Post;
  categories: Category[];
  tags: Tag[];
}

export default function PostForm({ post, categories, tags }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? '');
  const [status, setStatus] = useState<PostStatus>(post?.status ?? 'DRAFT');
  const [eyecatchUrl, setEyecatchUrl] = useState(post?.eyecatchUrl ?? '');
  const [ogpImageUrl, setOgpImageUrl] = useState(post?.ogpImageUrl ?? '');
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription ?? '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    post?.categories.map((c) => c.id) ?? []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post?.tags.map((t) => t.id) ?? []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, TiptapImage, TiptapLink.configure({ openOnClick: false })],
    content: post?.body ?? '',
  });

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function toggleTag(id: string) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const body = editor?.getHTML() ?? '';
    const payload = {
      title,
      body,
      status,
      eyecatchUrl: eyecatchUrl || null,
      ogpImageUrl: ogpImageUrl || null,
      metaDescription: metaDescription || null,
      categoryIds: selectedCategories,
      tagIds: selectedTags,
    };

    const url = post ? `/api/admin/posts/${post.id}` : '/api/admin/posts';
    const method = post ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? '保存に失敗しました');
      setLoading(false);
      return;
    }

    router.push('/admin/posts');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">本文</label>
        <div className="rounded border border-gray-300 min-h-[300px] p-2 prose max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">ステータス</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as PostStatus)}
          className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="DRAFT">下書き</option>
          <option value="PUBLISHED">公開</option>
          <option value="ARCHIVED">アーカイブ</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">アイキャッチ画像</label>
        <ImageUploader onUploaded={setEyecatchUrl} />
        {eyecatchUrl && <p className="mt-1 text-xs text-gray-500 break-all">{eyecatchUrl}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">OGP画像</label>
        <ImageUploader onUploaded={setOgpImageUrl} />
        {ogpImageUrl && <p className="mt-1 text-xs text-gray-500 break-all">{ogpImageUrl}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">メタディスクリプション</label>
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={3}
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">カテゴリ</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">タグ</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => toggleTag(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? '保存中...' : '保存'}
      </button>
    </form>
  );
}
