# クイックスタート

## 前提条件

- Node.js v18 以上
- npm
- Git

## セットアップ

```bash
git clone <repository-url>
cd yoon2-web
npm install
```

## 環境変数

```bash
cp env.example .env.local
# .env.local を編集
```

必須の環境変数 (詳細は `env.example` 参照):
- `NEXT_PUBLIC_FIREBASE_*` — Firebase 設定
- `NEXT_PUBLIC_GOOGLE_API_KEY` — Google Calendar API
- `NEXT_PUBLIC_GOOGLE_CALENDAR_ID` — カレンダー ID

## 開発サーバー起動

```bash
npm run dev
# http://localhost:3000
```

## ビルド・テスト

```bash
npm run build     # 本番ビルド (静的エクスポート)
npm test          # テスト実行 (jest)
npx tsc --noEmit  # 型チェック
```

## デプロイ

main ブランチに push → GitHub Actions が自動デプロイ。  
詳細: [deployment/DEPLOYMENT.md](../deployment/DEPLOYMENT.md)

## 管理画面

`/system/login` — Firebase Auth でログイン。  
初期管理者アカウント作成: [ADMIN_ACCESS.md](ADMIN_ACCESS.md)
