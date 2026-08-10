import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/utils/slug';

interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: Context) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { name } = await req.json();
  const slug = generateSlug(name);

  const category = await prisma.category.update({ where: { id }, data: { name, slug } });
  return NextResponse.json(category);
}

export async function DELETE(_req: Request, { params }: Context) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
