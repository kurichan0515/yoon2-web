import slugify from 'slugify';

export function generateSlug(title: string): string {
  const base = slugify(title, { lower: true, strict: true });
  const timestamp = Date.now();
  return `${base}-${timestamp}`;
}
