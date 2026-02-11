/**
 * SEOヘルパー関数
 * 各ページでメタタグを動的に設定するためのユーティリティ
 */

const BASE_URL = 'https://yoon2.com';

/**
 * ページのメタタグを設定
 * @param {Object} options - SEO設定オプション
 * @param {string} options.title - ページタイトル
 * @param {string} options.description - ページの説明
 * @param {string} options.path - ページのパス（例: '/shop'）
 * @param {string} [options.image] - OGP画像のURL（デフォルト: logo512.png）
 * @param {string} [options.type] - OGPタイプ（デフォルト: 'website'）
 */
export const setPageMeta = ({
  title,
  description,
  path = '/',
  image = `${BASE_URL}/logo512.png`,
  type = 'website'
}) => {
  const fullUrl = `${BASE_URL}${path === '/' ? '' : path}`;
  const fullTitle = title.includes('yoon²') ? title : `${title} | yoon²`;

  // タイトルを設定
  document.title = fullTitle;

  // メタタグを更新または作成
  const updateOrCreateMeta = (name, content, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // リンクタグを更新または作成
  const updateOrCreateLink = (rel, href) => {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  // 基本メタタグ
  updateOrCreateMeta('description', description);
  
  // OGPタグ
  updateOrCreateMeta('og:title', fullTitle, true);
  updateOrCreateMeta('og:description', description, true);
  updateOrCreateMeta('og:url', fullUrl, true);
  updateOrCreateMeta('og:type', type, true);
  updateOrCreateMeta('og:image', image, true);
  updateOrCreateMeta('og:image:alt', fullTitle, true);
  updateOrCreateMeta('og:site_name', 'yoon²', true);
  updateOrCreateMeta('og:locale', 'ja_JP', true);

  // Twitter Cardタグ
  updateOrCreateMeta('twitter:card', 'summary_large_image');
  updateOrCreateMeta('twitter:title', fullTitle);
  updateOrCreateMeta('twitter:description', description);
  updateOrCreateMeta('twitter:image', image);

  // Canonical URL
  updateOrCreateLink('canonical', fullUrl);
};

/**
 * メタタグをリセット（デフォルト値に戻す）
 */
export const resetPageMeta = () => {
  setPageMeta({
    title: 'yoon² | 松山の耳つぼ・イヤーエステ専門サロン',
    description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン。初回3,500円～、オンライン予約OK。北久米駅徒歩5分、駐車場完備。',
    path: '/'
  });
};
