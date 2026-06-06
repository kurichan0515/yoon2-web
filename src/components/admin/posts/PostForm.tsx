'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { createClient } from '@/lib/supabase/client';
import { generateSlug } from '@/utils/slug';
import ImageUploader from './ImageUploader';
import type { Post, Category, Tag, PostStatus } from '@/types';

interface Props {
  post?: Post;
  categories: Category[];
  tags: Tag[];
}

export default function PostForm({ post, categories, tags }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? '');
  const [status, setStatus] = useState<PostStatus>(post?.status ?? 'draft');
  const [eyecatchUrl, setEyecatchUrl] = useState(post?.eyecatch_url ?? '');
  const [ogpImageUrl, setOgpImageUrl] = useState(post?.ogp_image_url ?? '');
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    post?.categories.map((c) => c.id) ?? []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post?.tags.map((t) => t.id) ?? []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
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

    const supabase = createClient();
    const body = editor?.getHTML() ?? '';
    const slug = post?.slug ?? generateSlug(title);
    const published_at = status === 'published' ? (post?.published_at ?? new Date().toISOString()) : null;

    const postData = {
      title,
      slug,
      body,
      status,
      eyecatch_url: eyecatchUrl || null,
      ogp_image_url: ogpImageUrl || null,
      meta_description: metaDescription || null,
      published_at,
      updated_at: new Date().toISOString(),
    };

    let postId = post?.id;

    if (post) {
      const { error } = await supabase.from('posts').update(postData).eq('id', post.id);
      if (error) { setError(error.message); setLoading(false); return; }
    } else {
      const { data, error } = await supabase.from('posts').insert(postData).select('id').single();
      if (error) { setError(error.message); setLoading(false); return; }
      postId = data.id;
    }

    // カテゴリ・タグの関連付けを更新
    await supabase.from('post_categories').delete().eq('post_id', postId);
    await supabase.from('post_tags').delete().eq('post_id', postId);

    if (selectedCategories.length > 0) {
      await supabase.from('post_categories').insert(
        selectedCategories.map((category_id) => ({ post_id: postId, category_id }))
      );
    }
    if (selectedTags.length > 0) {
      await supabase.from('post_tags').insert(
        selectedTags.map((tag_id) => ({ post_id: postId, tag_id }))
      );
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
          <option value="draft">下書き</option>
          <option value="published">公開</option>
          <option value="archived">アーカイブ</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">アイキャッチ画像</label>
        <ImageUploader bucket="eyecatch" onUploaded={setEyecatchUrl} />
        {eyecatchUrl && <p className="mt-1 text-xs text-gray-500 break-all">{eyecatchUrl}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">OGP画像</label>
        <ImageUploader bucket="ogp" onUploaded={setOgpImageUrl} />
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
