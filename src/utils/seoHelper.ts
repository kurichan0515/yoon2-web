const BASE_URL = 'https://yoon2.com';

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}

const updateOrCreateMeta = (name: string, content: string, property = false) => {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let meta = document.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement('meta');
    if (property) meta.setAttribute('property', name);
    else meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

const updateOrCreateLink = (rel: string, href: string) => {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

export const setPageMeta = ({ title, description, path = '/', image = `${BASE_URL}/logo512.png`, type = 'website' }: PageMetaOptions) => {
  const fullUrl = `${BASE_URL}${path === '/' ? '' : path}`;
  const fullTitle = title.includes('yoon²') ? title : `${title} | yoon²`;
  document.title = fullTitle;

  updateOrCreateMeta('description', description);
  updateOrCreateMeta('og:title', fullTitle, true);
  updateOrCreateMeta('og:description', description, true);
  updateOrCreateMeta('og:url', fullUrl, true);
  updateOrCreateMeta('og:type', type, true);
  updateOrCreateMeta('og:image', image, true);
  updateOrCreateMeta('og:image:alt', fullTitle, true);
  updateOrCreateMeta('og:site_name', 'yoon²', true);
  updateOrCreateMeta('og:locale', 'ja_JP', true);
  updateOrCreateMeta('twitter:card', 'summary_large_image');
  updateOrCreateMeta('twitter:title', fullTitle);
  updateOrCreateMeta('twitter:description', description);
  updateOrCreateMeta('twitter:image', image);
  updateOrCreateLink('canonical', fullUrl);
};

export const resetPageMeta = () => setPageMeta({
  title: 'yoon² | 松山の耳つぼ・イヤーエステ専門サロン',
  description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン。初回3,500円～、オンライン予約OK。北久米駅徒歩5分、駐車場完備。',
  path: '/',
});
