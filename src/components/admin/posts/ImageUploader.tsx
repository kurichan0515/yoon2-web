'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  bucket: string;
  onUploaded: (url: string) => void;
}

export default function ImageUploader({ bucket, onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onUploaded(data.publicUrl);
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
