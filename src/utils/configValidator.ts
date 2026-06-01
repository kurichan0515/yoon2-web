interface Service { name: string; price: number; }
interface AppConfig {
  shop?: {
    name?: string; phone?: string; address?: string;
    services?: Service[];
    hours?: { open?: string; close?: string };
  };
  social?: {
    instagram?: { url?: string };
    line?: { url?: string };
  };
}

interface ValidationResult {
  isValid: boolean; errors: string[]; warnings: string[]; hasWarnings: boolean;
}

const getNestedValue = (obj: unknown, path: string): unknown =>
  path.split('.').reduce((cur, key) => (cur as Record<string, unknown>)?.[key], obj);

const isValidPhoneNumber = (phone: string): boolean =>
  /^(\+81|0)[0-9-]{10,13}$/.test(phone.replace(/[^\d+]/g, ''));

const isValidTimeRange = (open: string, close: string): boolean =>
  new Date(`2000-01-01 ${open}`) < new Date(`2000-01-01 ${close}`);

const isValidUrl = (url: string): boolean => { try { new URL(url); return true; } catch { return false; } };

const countEnvironmentVariables = (): number =>
  ['NEXT_PUBLIC_FIREBASE_API_KEY','NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN','NEXT_PUBLIC_FIREBASE_PROJECT_ID',
   'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET','NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID','NEXT_PUBLIC_FIREBASE_APP_ID',
   'NEXT_PUBLIC_TWITTER_URL','NEXT_PUBLIC_INSTAGRAM_URL','NEXT_PUBLIC_LINE_URL',
   'NEXT_PUBLIC_GOOGLE_API_KEY','NEXT_PUBLIC_GOOGLE_CALENDAR_ID',
  ].filter(v => process.env[v]).length;

export const validateConfig = (config: AppConfig): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const required = [
    { path: 'shop.name', name: '店舗名' }, { path: 'shop.phone', name: '電話番号' },
    { path: 'shop.address', name: '住所' }, { path: 'shop.hours.open', name: '開店時間' },
    { path: 'shop.hours.close', name: '閉店時間' },
  ];
  required.forEach(f => {
    const v = getNestedValue(config, f.path);
    if (!v || String(v).trim() === '') errors.push(`${f.name}が設定されていません`);
  });
  const phone = config.shop?.phone;
  if (phone && !isValidPhoneNumber(phone)) warnings.push('電話番号の形式が正しくない可能性があります');
  const open = config.shop?.hours?.open, close = config.shop?.hours?.close;
  if (open && close && !isValidTimeRange(open, close)) warnings.push('営業時間の設定が正しくない可能性があります');
  (config.shop?.services ?? []).forEach(s => {
    if (typeof s.price !== 'number' || s.price < 0) warnings.push(`${s.name}の料金設定が正しくありません`);
    if (s.price > 50000) warnings.push(`${s.name}の料金が高額です（${s.price}円）。確認してください`);
  });
  if (config.social?.instagram?.url && !isValidUrl(config.social.instagram.url)) warnings.push('InstagramのURLが正しくない形式です');
  if (config.social?.line?.url && !isValidUrl(config.social.line.url)) warnings.push('LINEのURLが正しくない形式です');
  return { isValid: errors.length === 0, errors, warnings, hasWarnings: warnings.length > 0 };
};

export const getConfigSummary = (config: AppConfig) => {
  const services = config.shop?.services ?? [];
  const prices = services.map(s => s.price);
  return {
    shopName: config.shop?.name ?? '未設定',
    address: config.shop?.address ?? '未設定',
    phone: config.shop?.phone ?? '未設定',
    businessHours: `${config.shop?.hours?.open ?? '未設定'} - ${config.shop?.hours?.close ?? '未設定'}`,
    serviceCount: services.length,
    priceRange: prices.length ? `${Math.min(...prices)}円 - ${Math.max(...prices)}円` : '未設定',
    hasInstagram: !!config.social?.instagram?.url,
    hasLine: !!config.social?.line?.url,
    environmentVariablesUsed: countEnvironmentVariables(),
  };
};

export const logConfigValidation = (config: AppConfig) => {
  if (process.env.NODE_ENV !== 'development') return;
  const validation = validateConfig(config);
  const summary = getConfigSummary(config);
  console.group('🔧 Configuration Validation');
  console.log('📊 Summary:', summary);
  if (validation.errors.length > 0) console.error('❌ Errors:', validation.errors);
  if (validation.warnings.length > 0) console.warn('⚠️ Warnings:', validation.warnings);
  if (validation.isValid && !validation.hasWarnings) console.log('✅ Configuration is valid!');
  console.groupEnd();
};

export default { validateConfig, getConfigSummary, logConfigValidation };
