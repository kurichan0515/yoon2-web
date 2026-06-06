import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUploadPresignedUrl, getPublicUrl } from '@/lib/s3';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { filename, contentType } = await req.json();
  const key = `uploads/${Date.now()}-${filename}`;

  const presignedUrl = await getUploadPresignedUrl(key, contentType);
  const publicUrl = getPublicUrl(key);

  return NextResponse.json({ presignedUrl, publicUrl });
}
