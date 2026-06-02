# プロジェクト状況

最終更新: 2026-06-02

## 現在の状態

### 完了済み

**アーキテクチャ:**
- [x] Next.js 15 App Router 移行 (CRA廃止)
- [x] 全ソース TypeScript 化 (strict: true)
- [x] 管理画面を削除 (認証・DB不要のシンプル構成に)
- [x] DDD/Firebase/Calendar 等の不要レイヤーを削除
- [x] analyticsService を GA4専用に軽量化 (Firestore依存削除)

**品質:**
- [x] jest テスト環境 (ts-jest)
- [x] next.config.js: ignoreBuildErrors 削除

**デプロイ・機能:**
- [x] Firebase Hosting + GitHub Actions 自動デプロイ
- [x] Google AdSense 統合
- [x] Google Ads コンバージョン計測
- [x] Google Analytics (GA4) 統合
- [x] SEO: 構造化データ (JSON-LD)・OGP・viewport
- [x] 画像 WebP 化・遅延読み込み最適化

## ルート

```
/         → ホーム
/sns      → SNS導線ページ
/privacy  → プライバシーポリシー
```

## ビルド / テスト状態

```bash
npm run build      # ✅ 成功 (3ルート)
npm test           # ✅ 2テスト全パス
npm run typecheck  # ✅ エラーなし
```

## 本番 URL

https://yoon2.com

## デプロイ方法

main ブランチに push → GitHub Actions が自動的に `firebase deploy` を実行。
