# yoon² アーキテクチャドキュメント

## 技術スタック

- **Next.js 15** (App Router, Static Export) — フレームワーク
- **React 19** — UI
- **TypeScript 5** (strict: true, noUncheckedIndexedAccess) — 型安全
- **Firebase Hosting** — 静的サイトホスティング (認証・DBは使用しない)
- **Tailwind CSS 3** — ユーティリティCSS
- **jest + ts-jest** — テスト

## ファイル構成

```
src/
├── views/               # ページコンポーネント
│   ├── Home.tsx         # ホームページ (/)
│   ├── HomeSns.tsx      # SNS導線ページ (/sns)
│   └── PrivacyPolicy.tsx
│
├── components/          # UIコンポーネント
│   ├── common/
│   │   ├── AdSense.tsx        # Google AdSense
│   │   ├── Button.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── LoadingSpinner.tsx
│   └── public/
│       ├── PublicHeader.tsx
│       └── PublicFooter.tsx
│
├── components/ (ページ固有)
│   ├── ConcernSection.tsx    # お悩みセクション
│   ├── FAQ.tsx               # よくある質問
│   ├── FlowSection.tsx       # 施術の流れ
│   ├── MenuDiagnosis.tsx     # メニュー診断
│   ├── MenuSection.tsx       # メニュー・料金
│   ├── ReviewsSection.tsx    # 口コミ
│   └── SocialFeed.tsx        # Instagram誘導
│
├── layouts/
│   └── PublicLayout.tsx      # PublicHeader + {children} + PublicFooter
│
├── services/
│   ├── analyticsService.ts   # GA4/gtag イベント送信
│   └── googleAdsService.ts   # Google Ads コンバージョン
│
├── config/
│   └── appConfig.ts          # 店舗情報・SNS・広告設定を一元管理
│
├── data/
│   ├── faqData.ts            # FAQ 静的データ
│   └── menuData.ts           # メニュー・料金 静的データ
│
├── types/
│   └── global.d.ts           # window.gtag / adsbygoogle 型定義
│
└── utils/
    ├── logger.ts
    ├── seoHelper.ts
    └── validation.ts
```

## ルーティング (Next.js App Router)

```
app/
├── page.tsx          → / (ホーム)
├── sns/page.tsx      → /sns (SNS導線ページ)
└── privacy/page.tsx  → /privacy (プライバシーポリシー)
```

## 設定管理

`src/config/appConfig.ts` — 店舗情報・SNS URL・AdSense・Google Ads を一元管理。  
環境変数 (`NEXT_PUBLIC_*`) から API Key 等を取得。

## 計測・広告

- **Google Analytics (GA4)**: `analyticsService.trackPageView()` でページビュー送信
- **Google Ads**: コンバージョン (`trackLineClick`, `trackHotpepperClick` 等)
- **Google AdSense**: `AdSense` コンポーネント, `layout.tsx` の `<script async>` タグ

## デプロイ

- **ホスティング**: Firebase Hosting (`output: 'export'` 静的エクスポート)
- **CI/CD**: GitHub Actions → main push で自動デプロイ

## テスト

```bash
npm test              # jest (2テスト)
npm run test:coverage # カバレッジ付き
npm run typecheck     # tsc --noEmit
```
