# 環境変数設定ガイド

## ファイル

- `.env.local` — ローカル開発用 (gitignore済み)
- `env.example` — テンプレート

## 変数一覧

```bash
# SNS (appConfig.ts でも直接設定可能)
NEXT_PUBLIC_LINE_URL=
NEXT_PUBLIC_INSTAGRAM_URL=

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
```

## ローカル開発

```bash
cp env.example .env.local
npm run dev
```

## 本番 (Firebase Hosting)

GitHub Actions が main push 時に自動デプロイ。  
シークレットは GitHub リポジトリの Settings → Secrets で管理。
