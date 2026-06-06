export type PostStatus = 'published' | 'draft' | 'archived';

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: PostStatus;
  eyecatch_url: string | null;
  ogp_image_url: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  categories: Category[];
  tags: Tag[];
}
