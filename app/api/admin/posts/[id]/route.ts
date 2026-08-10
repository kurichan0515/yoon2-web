import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { PostStatus } from '@prisma/client';

interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: Context) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { title, body, status, eyecatchUrl, ogpImageUrl, metaDescription, categoryIds, tagIds } =
    await req.json();

  const existing = await prisma.post.findUnique({ where: { id } });
  const publishedAt =
    status === 'PUBLISHED'
      ? existing?.publishedAt ?? new Date()
      : null;

  await prisma.$transaction([
    prisma.categoryPost.deleteMany({ where: { postId: id } }),
    prisma.postTag.deleteMany({ where: { postId: id } }),
    prisma.post.update({
      where: { id },
      data: {
        title,
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
    }),
  ]);

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Context) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
