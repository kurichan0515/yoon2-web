import type { Post as PrismaPost, Category as PrismaCategory, Tag as PrismaTag, PostStatus } from '@prisma/client';

export type { PostStatus };

export type Category = Pick<PrismaCategory, 'id' | 'name' | 'slug' | 'createdAt'> & {
  createdAt: Date;
};

export type Tag = Pick<PrismaTag, 'id' | 'name' | 'slug' | 'createdAt'> & {
  createdAt: Date;
};

export type Post = Pick<
  PrismaPost,
  'id' | 'title' | 'slug' | 'body' | 'status' | 'eyecatchUrl' | 'ogpImageUrl' | 'metaDescription' | 'publishedAt' | 'createdAt' | 'updatedAt'
> & {
  categories: Category[];
  tags: Tag[];
};
