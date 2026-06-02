# プロジェクト状況

最終更新: 2026-06-02

## 現在の状態

### 完了済み

**アーキテクチャ・基盤:**
- [x] Next.js 15 App Router 移行 (CRA廃止)
- [x] 全ソース TypeScript 化 (.js → .ts/.tsx)
- [x] tsconfig: strict: true + noUncheckedIndexedAccess
- [x] DDD設計導入 (domain / application / infrastructure)
- [x] DI コンテナ (container.ts) による依存性注入
- [x] deprecated ラッパー完全削除 (courseService / calendarService / courseTypes)
- [x] Firebase Course Repository 実装 (本番環境対応)
- [x] Google Calendar Booking Repository (GoogleCalendarBookingRepository.ts)

**テスト・品質:**
- [x] jest + ts-jest テスト環境構築 (17テスト通過)
- [x] next.config.js: ignoreBuildErrors / ignoreDuringBuilds 削除
- [x] ESLint 削除 (next lint 非使用)
- [x] `*.tsbuildinfo` を .gitignore 追加

**デプロイ・インフラ:**
- [x] Firebase Hosting + GitHub Actions 自動デプロイ
- [x] Google AdSense 統合 (layout.tsx で直接 `<script>` タグ)
- [x] Google Ads コンバージョン計測
- [x] Google Analytics (GA4) 統合
- [x] SEO: 構造化データ (JSON-LD)、OGP、viewport export
- [x] 画像 WebP 化・遅延読み込み最適化

**クリーンアップ:**
- [x] Docker 関連ファイル削除
- [x] CRA 遺物削除 (App.js / index.js 等)
- [x] 空ディレクトリ削除
- [x] .kiro/ / skills-lock.json を .gitignore 追加
- [x] env.example を NEXT_PUBLIC_* 変数に更新
- [x] docs を現状に合わせて全面更新

### 進行中 / 今後

- [ ] AdminSettings の Firestore 保存処理 (現状モック)
- [ ] テストカバレッジ拡充 (現状: views / components 未カバー)
- [ ] Google Calendar → DDD IBookingRepository 経由の動作確認 (本番環境)

## ビルド / テスト状態

```bash
npm run build      # ✅ 成功
npm test           # ✅ 17テスト全パス
npm run typecheck  # ✅ エラーなし
```

## 本番 URL

https://yoon2.com

## デプロイ方法

main ブランチに push → GitHub Actions が自動的に `firebase deploy` を実行。
