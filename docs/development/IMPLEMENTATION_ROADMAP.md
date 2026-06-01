# 実装ロードマップ

## 完了済み

### インフラ・基盤
- [x] Next.js 15 App Router 移行
- [x] TypeScript 全面採用 (strict: true)
- [x] DDD設計 (domain/application/infrastructure)
- [x] jest テスト環境 (ts-jest)
- [x] GitHub Actions 自動デプロイ (Firebase Hosting)

### 機能
- [x] 公開ページ (/, /sns, /privacy)
- [x] 管理画面 (/system/*)
- [x] Firebase Auth 管理者認証
- [x] Google Calendar API 予約管理
- [x] Firebase Firestore アナリティクス
- [x] Google AdSense 広告
- [x] Google Ads コンバージョン計測
- [x] SEO (構造化データ・OGP・サイトマップ)
- [x] 画像 WebP 化・パフォーマンス最適化

---

## 残課題

### 優先度: 高
- [ ] deprecated `services/` を UseCase 直呼びに移行
  - CourseCreatePage.tsx → `courseUseCases` 直接使用
  - HomeNew.tsx / HomeSns.tsx → 同上
- [ ] Firebase Course Repository 本番投入 (現状 MockCourseRepository)

### 優先度: 中
- [ ] AdminSettings の Firestore 保存処理 (現状モック)
- [ ] テストカバレッジ拡充 (views/components)
- [ ] Google Calendar → DDD IBookingRepository 経由で完全動作確認

### 優先度: 低
- [ ] E2Eテスト (Playwright)
- [ ] PWA 対応
