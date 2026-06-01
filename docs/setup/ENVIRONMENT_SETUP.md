# 環境セットアップガイド

## 環境変数ファイル

| ファイル | 用途 |
|---------|------|
| `.env.local` | ローカル開発用 (gitignore済み) |
| `.env.production` | 本番用 (gitignore済み) |
| `env.example` | テンプレート |

## 変数一覧

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google Calendar API (管理画面の予約確認に使用)
NEXT_PUBLIC_GOOGLE_API_KEY=
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=

# Google Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=

# Google AdSense
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=
NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT=
NEXT_PUBLIC_ADSENSE_ENABLED=false

# Google Ads コンバージョン
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=
NEXT_PUBLIC_GOOGLE_ADS_LINE_CONVERSION_LABEL=
NEXT_PUBLIC_GOOGLE_ADS_HOTPEPPER_CONVERSION_LABEL=
NEXT_PUBLIC_GOOGLE_ADS_ENABLED=false

# SNS (appConfig.ts でも設定可能)
NEXT_PUBLIC_LINE_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
```

## ローカル開発

```bash
cp env.example .env.local
npm run dev
```

## 本番 (Firebase Hosting)

GitHub Actions が main push 時に自動デプロイ。  
シークレットは GitHub リポジトリの Settings → Secrets で管理。
