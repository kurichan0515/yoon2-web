// 設定値の検証ユーティリティ

/**
 * 設定値が正しく設定されているかチェックする
 * @param {Object} config - appConfigオブジェクト
 * @returns {Object} 検証結果
 */
export const validateConfig = (config) => {
  const errors = [];
  const warnings = [];

  // 必須項目のチェック
  const requiredFields = [
    { path: 'shop.name', name: '店舗名' },
    { path: 'shop.phone', name: '電話番号' },
    { path: 'shop.address', name: '住所' },
    { path: 'shop.hours.open', name: '開店時間' },
    { path: 'shop.hours.close', name: '閉店時間' }
  ];

  requiredFields.forEach(field => {
    const value = getNestedValue(config, field.path);
    if (!value || value.toString().trim() === '') {
      errors.push(`${field.name}が設定されていません`);
    }
  });

  // 電話番号の形式チェック
  const phone = config.shop?.phone;
  if (phone && !isValidPhoneNumber(phone)) {
    warnings.push('電話番号の形式が正しくない可能性があります');
  }

  // 営業時間の妥当性チェック
  const openTime = config.shop?.hours?.open;
  const closeTime = config.shop?.hours?.close;
  if (openTime && closeTime && !isValidTimeRange(openTime, closeTime)) {
    warnings.push('営業時間の設定が正しくない可能性があります（開店時間が閉店時間より後になっています）');
  }

  // 料金の妥当性チェック
  const services = config.shop?.services || [];
  services.forEach(service => {
    if (typeof service.price !== 'number' || service.price < 0) {
      warnings.push(`${service.name}の料金設定が正しくありません`);
    }
    if (service.price > 50000) {
      warnings.push(`${service.name}の料金が高額です（${service.price}円）。確認してください`);
    }
  });

  // SNSリンクの形式チェック
  if (config.social?.instagram?.url && !isValidUrl(config.social.instagram.url)) {
    warnings.push('InstagramのURLが正しくない形式です');
  }
  if (config.social?.line?.url && !isValidUrl(config.social.line.url)) {
    warnings.push('LINEのURLが正しくない形式です');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    hasWarnings: warnings.length > 0
  };
};

/**
 * 設定の概要を取得する
 * @param {Object} config - appConfigオブジェクト 
 * @returns {Object} 設定概要
 */
export const getConfigSummary = (config) => {
  const services = config.shop?.services || [];
  const priceRange = services.length > 0 ? {
    min: Math.min(...services.map(s => s.price)),
    max: Math.max(...services.map(s => s.price))
  } : null;

  return {
    shopName: config.shop?.name || '未設定',
    address: config.shop?.address || '未設定',
    phone: config.shop?.phone || '未設定',
    businessHours: `${config.shop?.hours?.open || '未設定'} - ${config.shop?.hours?.close || '未設定'}`,
    serviceCount: services.length,
    priceRange: priceRange ? `${priceRange.min}円 - ${priceRange.max}円` : '未設定',
    hasInstagram: !!config.social?.instagram?.url,
    hasLine: !!config.social?.line?.url,
    environmentVariablesUsed: countEnvironmentVariables()
  };
};

/**
 * 環境変数の使用状況をカウント
 * @returns {number} 使用されている環境変数の数
 * 注意: 店舗情報、営業時間、基本料金は設定ファイルで直接管理するため、環境変数から削除されました
 */
const countEnvironmentVariables = () => {
  const envVars = [
    // Firebase設定
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID',
    // SNS設定
    'REACT_APP_TWITTER_URL',
    'REACT_APP_INSTAGRAM_URL',
    'REACT_APP_LINE_URL',
    // Google Calendar API設定
    'REACT_APP_GOOGLE_API_KEY',
    'REACT_APP_GOOGLE_CALENDAR_ID'
  ];
  
  return envVars.filter(envVar => process.env[envVar]).length;
};

// ヘルパー関数
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

const isValidPhoneNumber = (phone) => {
  // 日本の電話番号の基本的なパターン
  const phonePattern = /^(\+81|0)[0-9-]{10,13}$/;
  return phonePattern.test(phone.replace(/[^\d+]/g, ''));
};

const isValidTimeRange = (openTime, closeTime) => {
  const open = new Date(`2000-01-01 ${openTime}`);
  const close = new Date(`2000-01-01 ${closeTime}`);
  return open < close;
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 開発モードでのみ設定検証結果をコンソールに出力
 * @param {Object} config - appConfigオブジェクト
 */
export const logConfigValidation = (config) => {
  if (process.env.NODE_ENV === 'development') {
    const validation = validateConfig(config);
    const summary = getConfigSummary(config);

    console.group('🔧 Configuration Validation');
    console.log('📊 Summary:', summary);
    
    if (validation.errors.length > 0) {
      console.error('❌ Errors:', validation.errors);
    }
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️ Warnings:', validation.warnings);
    }
    
    if (validation.isValid && !validation.hasWarnings) {
      console.log('✅ Configuration is valid!');
    }
    
    console.groupEnd();
  }
};

const configValidator = {
  validateConfig,
  getConfigSummary,
  logConfigValidation
};

export default configValidator;
