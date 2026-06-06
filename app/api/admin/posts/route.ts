import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/utils/slug';
import type { PostStatus } from '@prisma/client';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, body, status, eyecatchUrl, ogpImageUrl, metaDescription, categoryIds, tagIds } =
    await req.json();

  const slug = generateSlug(title);
  const publishedAt = status === 'PUBLISHED' ? new Date() : null;

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      body,
      status: status as PostStatus,
      eyecatchUrl,
      ogpImageUrl,
      metaDescription,
      publishedAt,
      categories: {
        create: (categoryIds ?? []).map((categoryId: string) => ({ categoryId })),
      },
      tags: {
        create: (tagIds ?? []).map((tagId: string) => ({ tagId })),
      },
    },
  });

  return NextResponse.json(post);
}
