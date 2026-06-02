# 実装ロードマップ

## 完了済み

### インフラ・基盤
- [x] Next.js 15 App Router 移行
- [x] TypeScript 全面採用 (strict: true)
- [x] DDD設計 (domain/application/infrastructure)
- [x] DI コンテナ (container.ts)
- [x] jest テスト環境 (ts-jest)
- [x] GitHub Actions 自動デプロイ (Firebase Hosting)

### DDD 移行
- [x] domain 層 (Course / Booking / Auth エンティティ・VO・リポジトリIF)
- [x] application 層 (Course CRUD / Booking 統計・スロット / 日付範囲取得)
- [x] infrastructure 層 (Firebase / GoogleCalendar / Mock リポジトリ実装)
- [x] deprecated courseService 削除 (CourseCreatePage / HomeNew → UseCase 直呼び)
- [x] deprecated calendarService 削除 (Calendar / AdminBookingDetails → UseCase 直呼び)
- [x] deprecated courseTypes 削除

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
- [ ] AdminSettings の Firestore 保存処理 (現状モック、保存されない)

### 優先度: 中
- [ ] テストカバレッジ拡充 (views / components の主要ファイル)
- [ ] Google Calendar API 本番環境での動作確認

### 優先度: 低
- [ ] E2E テスト (Playwright)
- [ ] PWA 対応
