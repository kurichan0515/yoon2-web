# Lighthouse 監査と改善メモ

**対象**: https://yoon2.com/  
**監査日**: 2026年2月（ユーザー報告ベース）  
**最終更新**: 2026年2月12日（パフォーマンス改善実施）

---

## 監査結果サマリ（直近）

| カテゴリ | スコア | 主な指標・課題 |
|----------|--------|----------------|
| パフォーマンス | 45 | FCP 4.2s、LCP 21.6s、TBT 560ms、CLS 0.014、SI 7.9s。画像 6,197 KiB 削減余地、未使用 JS 567 KiB |
| ユーザー補助 | 94 | コントラスト不足、見出しの降順 |
| おすすめの方法 | 81 | 非推奨API、CSP・HSTS・COOP 等のセキュリティヘッダ |
| SEO | 100 | 問題なし |

※ IndexedDB 等のローカルデータがスコアに影響するため、**シークレットウィンドウ**で再計測推奨。

### /sns ページ（SNS 導線向け）の監査（2026-02-12）

| カテゴリ | スコア | 主な指摘 |
|----------|--------|----------|
| パフォーマンス | 56 | 画像に width/height なし、画像配信 3,077 KiB、キャッシュ 858 KiB |
| ユーザー補助 | 78 | ボタンに名前なし、リンクに識別可能な名前なし、コントラスト、見出しの降順 |
| おすすめの方法 | 81 | 同上 |
| SEO | 100 | 問題なし |

→ **実施した改善**: 画像に width/height 追加、全ボタン・アイコンリンクに `aria-label`、見出しを H1→H2 の順に修正、ナビに `aria-label`、コントラスト用に文字色を `text-white/80` 等に変更。詳細は `src/pages/HomeSns.js`。

---

## 実施した改善（コード側）

### パフォーマンス
- **LCP 用 preload**: ヒーロー背景画像 `/images/hero/wait-room.png` を `<link rel="preload" as="image">` で先行読み込み（index.html）
- **preconnect**: `fonts.googleapis.com` / `fonts.gstatic.com` を事前接続
- **画像の width/height**: 主要な `<img>` に width/height を指定し CLS 防止。`img[width][height]` でレスポンシブ維持
- **キャッシュ**: Firebase Hosting で `/static/**`（JS/CSS のハッシュ付きファイル）に `Cache-Control: public, max-age=31536000, immutable` を設定。HTML は従来どおり no-cache（firebase.json）
- **コード分割**: ルート単位で `React.lazy` を導入。Home 以外（HomeSns, PrivacyPolicy, 管理画面等）を遅延読み込みし、初期 JS バンドルを削減。`Suspense` の fallback に LoadingSpinner を表示

### ユーザー補助
- **見出しの降順**: ヘッダーロゴを `<h1>` から `<span>` に変更。ページあたり H1 を 1 つに
- **コントラスト**: ヒーロー内の文字色を濃くして背景とのコントラストを改善

### その他
- フォントは既に `display=swap` 付きで読み込み済み

---

## 残っている課題・今後の検討

### パフォーマンス（要・継続改善）
- **画像配信**: 約 6,197 KiB の削減余地。`wait-room.png` 等の圧縮・リサイズ、WebP/AVIF 化、`srcset` による解像度切り替えを検討。ツール例: Squoosh, sharp, Next.js Image
- **JavaScript**: 未使用 JS 約 567 KiB、実行時間・長時間タスクの低減。必要に応じてさらにコンポーネント単位の lazy や tree-shaking の見直し
- **CSS**: 未使用 CSS 約 109 KiB。PurgeCSS 等の導入や、Critical CSS のインライン化を検討
- **LCP 21.6秒**: SPA のため「描画完了」が JS 実行後にずれている可能性。根本的には SSR/プリレンダリングの検討が有効。当面は画像の軽量化・preload の維持で改善を図る

### おすすめの方法
- **サードパーティ Cookie・非推奨 API**: Google 広告等によるもので、削除すると広告機能に影響。広告ポリシーの変更に追随して対応
- **CSP**: XSS 対策のため Content-Security-Policy ヘッダーの検討（広告スクリプトの許可が必要）
- **HSTS**: Firebase Hosting の挙動確認。必要に応じてサーバー設定で強制

### 計測のコツ
- スコアは端末・ネットワーク・IndexedDB 等のローカルデータに左右されるため、**シークレットウィンドウ**で再計測すると再現しやすい
- 本番と同等のネットワークで計測する（Lighthouse の「Slow 4G」等）

---

## 変更ファイル一覧（累計）

- `public/index.html` … preload, preconnect
- `src/App.js` … React.lazy + Suspense でルート単位コード分割
- `src/App.css` … img[width][height] の共通スタイル
- `src/pages/Home.js` … 各 img に width/height
- `src/pages/Home.css` … ヒーロー文字色（コントラスト）、.hero-title-main / .hero-title-sub
- `src/components/public/PublicHeader.js` … ロゴを span、aria-label
- `src/components/public/PublicHeader.css` … .public-logo-text, sup スタイル
- `firebase.json` … /static/** に長期キャッシュ（immutable）
- **/sns ページ** (`src/pages/HomeSns.js`): 画像 width/height、ボタン・リンクの aria-label、見出し順（H1 を先に）、ナビ aria-label、コントラスト（text-white/80 等）を実施
