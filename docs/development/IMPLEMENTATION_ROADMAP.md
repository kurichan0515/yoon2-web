# 実装ロードマップ

## 完了済み

### インフラ・基盤
- [x] Next.js 15 App Router 移行
- [x] TypeScript 全面採用 (strict: true)
- [x] GitHub Actions 自動デプロイ (Firebase Hosting)
- [x] jest テスト環境 (ts-jest)

### 機能
- [x] 公開ページ (/, /sns, /privacy)
- [x] Google AdSense 広告
- [x] Google Ads コンバージョン計測
- [x] SEO (構造化データ・OGP・サイトマップ)
- [x] 画像 WebP 化・パフォーマンス最適化

### クリーンアップ
- [x] 管理画面・認証・Firebase DB を削除 (シンプル構成に)
- [x] DDD/Application/Infrastructure レイヤー削除
- [x] analyticsService を GA4専用に軽量化

---

## 残課題

### 優先度: 高
- [ ] テストカバレッジ拡充 (現状: Home.tsx 2件のみ)

### 優先度: 低
- [ ] E2E テスト (Playwright)
- [ ] PWA 対応
