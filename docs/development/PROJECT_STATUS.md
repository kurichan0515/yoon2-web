# プロジェクト状況

最終更新: 2026-06-02

## 現在の状態

### 完了済み

- [x] Next.js 15 App Router 移行 (CRA廃止)
- [x] 全ソース TypeScript 化 (.js → .ts/.tsx)
- [x] tsconfig: strict: true + noUncheckedIndexedAccess
- [x] DDD設計導入 (domain / application / infrastructure)
- [x] jest + ts-jest テスト環境構築 (17テスト通過)
- [x] Firebase Hosting + GitHub Actions 自動デプロイ
- [x] Google AdSense 統合
- [x] Google Ads コンバージョン計測
- [x] Google Analytics (GA4) 統合
- [x] Google Calendar API 連携 (予約管理)
- [x] SEO: 構造化データ (JSON-LD)、OGP、サイトマップ
- [x] 画像 WebP 化・遅延読み込み最適化

### 進行中 / 今後の対応

- [ ] deprecated services/ を UseCase 直呼びに移行 (CourseCreatePage等)
- [ ] Firebase Course Repository を本番環境で使用 (現状 Mock)
- [ ] Admin Settings の保存処理 (現状モック)
- [ ] テストカバレッジ拡充

## ビルド / テスト状態

```bash
npm run build   # ✅ 成功
npm test        # ✅ 17テスト全パス
npx tsc --noEmit # ✅ エラーなし
```

## 本番 URL

https://yoon2.com

## デプロイ方法

main ブランチに push → GitHub Actions が自動的に `firebase deploy` を実行。
