'use client';

import { useState } from 'react';

interface Props {
  onUploaded: (url: string) => void;
}

export default function ImageUploader({ onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    if (!res.ok) {
      setError('URLの取得に失敗しました');
      setUploading(false);
      return;
    }

    const { presignedUrl, publicUrl } = await res.json();

    const uploadRes = await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!uploadRes.ok) {
      setError('アップロードに失敗しました');
      setUploading(false);
      return;
    }

    onUploaded(publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-1">
      <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} />
      {uploading && <p className="text-sm text-gray-500">アップロード中...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
