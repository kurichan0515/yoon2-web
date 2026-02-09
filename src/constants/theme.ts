/**
 * デザインシステム - テーマ定義
 * 
 * yoon²ゆんゆん Webアプリケーションの統一されたデザインシステム
 * Webアプリケーションとモバイルアプリケーションの両方で使用可能
 */

export const COLORS = {
  primary: {
    main: '#2196F3', // メインブルー
    light: '#64B5F6',
    dark: '#1976D2',
    background: '#E3F2FD',
  },
  secondary: {
    main: '#4CAF50', // セカンダリグリーン
    light: '#81C784',
    dark: '#388E3C',
    background: '#E8F5E9',
  },
  accent: {
    main: '#FF9800', // アクセントオレンジ
    light: '#FFB74D',
    dark: '#F57C00',
    background: '#FFF3E0',
  },
  status: {
    error: '#F44336', // 削除・減少
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#2196F3',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    placeholder: '#999999',
    disabled: '#CCCCCC',
  },
  background: {
    main: '#F5F5F5', // 画面背景
    card: '#FFFFFF', // カード背景
  },
  border: '#E0E0E0',
};

export const TYPOGRAPHY = {
  h1: { fontSize: 28, fontWeight: 'bold' as const, lineHeight: 34 },
  h2: { fontSize: 24, fontWeight: 'bold' as const, lineHeight: 29 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 22 },
  body: { fontSize: 16, fontWeight: 'normal' as const, lineHeight: 24 },
  caption: { fontSize: 12, fontWeight: 'normal' as const, lineHeight: 18 },
  countLarge: { fontSize: 72, fontWeight: 'bold' as const, lineHeight: 86 },
  countMedium: { fontSize: 24, fontWeight: 'bold' as const, lineHeight: 29 },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const LAYOUT = {
  borderRadius: {
    md: 8,
    lg: 12,
    pill: 9999,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};

// Webアプリケーション用のCSS変数としても使用可能
export const CSS_VARIABLES = {
  colors: {
    '--color-primary-main': COLORS.primary.main,
    '--color-primary-light': COLORS.primary.light,
    '--color-primary-dark': COLORS.primary.dark,
    '--color-primary-background': COLORS.primary.background,
    '--color-secondary-main': COLORS.secondary.main,
    '--color-secondary-light': COLORS.secondary.light,
    '--color-secondary-dark': COLORS.secondary.dark,
    '--color-secondary-background': COLORS.secondary.background,
    '--color-accent-main': COLORS.accent.main,
    '--color-accent-light': COLORS.accent.light,
    '--color-accent-dark': COLORS.accent.dark,
    '--color-accent-background': COLORS.accent.background,
    '--color-status-error': COLORS.status.error,
    '--color-status-success': COLORS.status.success,
    '--color-status-warning': COLORS.status.warning,
    '--color-status-info': COLORS.status.info,
    '--color-text-primary': COLORS.text.primary,
    '--color-text-secondary': COLORS.text.secondary,
    '--color-text-placeholder': COLORS.text.placeholder,
    '--color-text-disabled': COLORS.text.disabled,
    '--color-background-main': COLORS.background.main,
    '--color-background-card': COLORS.background.card,
    '--color-border': COLORS.border,
  },
  spacing: {
    '--spacing-xs': `${SPACING.xs}px`,
    '--spacing-sm': `${SPACING.sm}px`,
    '--spacing-md': `${SPACING.md}px`,
    '--spacing-lg': `${SPACING.lg}px`,
    '--spacing-xl': `${SPACING.xl}px`,
    '--spacing-xxl': `${SPACING.xxl}px`,
  },
  typography: {
    '--font-size-h1': `${TYPOGRAPHY.h1.fontSize}px`,
    '--font-size-h2': `${TYPOGRAPHY.h2.fontSize}px`,
    '--font-size-h3': `${TYPOGRAPHY.h3.fontSize}px`,
    '--font-size-body': `${TYPOGRAPHY.body.fontSize}px`,
    '--font-size-caption': `${TYPOGRAPHY.caption.fontSize}px`,
    '--line-height-h1': `${TYPOGRAPHY.h1.lineHeight}px`,
    '--line-height-h2': `${TYPOGRAPHY.h2.lineHeight}px`,
    '--line-height-h3': `${TYPOGRAPHY.h3.lineHeight}px`,
    '--line-height-body': `${TYPOGRAPHY.body.lineHeight}px`,
    '--line-height-caption': `${TYPOGRAPHY.caption.lineHeight}px`,
  },
  layout: {
    '--border-radius-md': `${LAYOUT.borderRadius.md}px`,
    '--border-radius-lg': `${LAYOUT.borderRadius.lg}px`,
    '--border-radius-pill': `${LAYOUT.borderRadius.pill}px`,
  },
};
