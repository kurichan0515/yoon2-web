# サイトマップ（sitemap.xml）修正ガイド

yoon2.comのサイトマップを修正・更新する方法を説明します。

## ファイルの場所

```
public/sitemap.xml
```

## サイトマップの基本構造

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- 各ページのURLエントリ -->
  <url>
    <loc>https://yoon2.com/</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
</urlset>
```

## 各要素の説明

### `<loc>` - URL（必須）
ページの完全なURLを指定します。

```xml
<loc>https://yoon2.com/</loc>
```

**注意**: 
- `https://` から始まる完全なURLを指定
- 末尾のスラッシュ（`/`）に注意
- ドメインは `yoon2.com` を使用

### `<lastmod>` - 最終更新日（推奨）
ページの最終更新日を指定します。

```xml
<lastmod>2025-01-27</lastmod>
```

**形式**: `YYYY-MM-DD`（ISO 8601形式）

**更新タイミング**:
- ページの内容を変更したとき
- 定期的に更新する場合（例：毎月1日）

### `<changefreq>` - 更新頻度（オプション）
ページの更新頻度を指定します。

```xml
<changefreq>weekly</changefreq>
```

**指定可能な値**:
- `always` - アクセスするたびに変更される（例：リアルタイム情報）
- `hourly` - 1時間ごとに更新される
- `daily` - 1日ごとに更新される（例：カレンダーページ）
- `weekly` - 1週間ごとに更新される（例：ホームページ）
- `monthly` - 1ヶ月ごとに更新される（例：店舗情報、コース情報）
- `yearly` - 1年ごとに更新される
- `never` - 変更されない（アーカイブページなど）

### `<priority>` - 優先度（オプション）
ページの重要度を指定します。0.0〜1.0の範囲で指定します。

```xml
<priority>1.0</priority>
```

**推奨値**:
- `1.0` - ホームページ（最重要）
- `0.9` - カレンダーページ（予約に直結）
- `0.8` - 店舗情報、コースページ（重要）
- `0.5` - その他のページ

## ページを追加する方法

### 例1: 新しいページを追加

```xml
<!-- 新しいページ -->
<url>
  <loc>https://yoon2.com/new-page</loc>
  <lastmod>2025-01-27</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

### 例2: 既存ページの更新

```xml
<!-- カレンダーページの更新 -->
<url>
  <loc>https://yoon2.com/calendar</loc>
  <lastmod>2025-01-28</lastmod>  <!-- 日付を更新 -->
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>
```

## 現在のサイトマップ構成

現在、以下の公開ページが含まれています：

1. **ホームページ** (`/`)
   - Priority: 1.0（最重要）
   - Changefreq: weekly

2. **店舗情報ページ** (`/shop`)
   - Priority: 0.8
   - Changefreq: monthly

3. **カレンダーページ** (`/calendar`)
   - Priority: 0.9（予約に直結）
   - Changefreq: daily

4. **コースページ** (`/courses`)
   - Priority: 0.8
   - Changefreq: monthly

**注意**: 管理者ページ（`/system/*`）は含まれていません。これは正しい設定です（robots.txtでも除外されています）。

## 修正手順

### 1. ファイルを編集

```bash
# エディタで開く
nano public/sitemap.xml
# または
code public/sitemap.xml
```

### 2. 変更内容

#### 日付を更新する場合
```xml
<!-- 変更前 -->
<lastmod>2025-01-27</lastmod>

<!-- 変更後 -->
<lastmod>2025-01-28</lastmod>
```

#### 新しいページを追加する場合
```xml
<!-- 既存のページの後に追加 -->
<url>
  <loc>https://yoon2.com/new-page</loc>
  <lastmod>2025-01-28</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

#### ページを削除する場合
該当する `<url>...</url>` ブロック全体を削除します。

### 3. XML形式の確認

修正後、XML形式が正しいか確認してください：

- すべてのタグが正しく閉じられているか
- 特殊文字がエスケープされているか（`&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`）
- 日付形式が正しいか（`YYYY-MM-DD`）

### 4. ビルドとデプロイ

```bash
# ビルド
npm run build

# デプロイ
firebase deploy --only hosting
```

### 5. 確認

デプロイ後、以下のURLで確認してください：

```
https://yoon2.com/sitemap.xml
```

ブラウザで開いて、XML形式が正しく表示されることを確認してください。

## Google Search Consoleでの更新

サイトマップを更新した後、Google Search Consoleでも更新を通知できます：

1. **Google Search Consoleにアクセス**
   - https://search.google.com/search-console

2. **Sitemapセクションを開く**
   - 左メニューから「Sitemap」を選択

3. **再送信（オプション）**
   - 既に送信済みの場合は、自動的に再クロールされます
   - 必要に応じて、削除してから再送信することも可能

## よくある修正例

### 例1: 日付を一括更新

すべてのページの `lastmod` を今日の日付に更新：

```xml
<lastmod>2025-01-28</lastmod>
```

### 例2: 優先度を調整

カレンダーページの優先度を上げる：

```xml
<!-- 変更前 -->
<priority>0.8</priority>

<!-- 変更後 -->
<priority>0.9</priority>
```

### 例3: 更新頻度を変更

店舗情報ページを週次更新に変更：

```xml
<!-- 変更前 -->
<changefreq>monthly</changefreq>

<!-- 変更後 -->
<changefreq>weekly</changefreq>
```

## 注意事項

1. **管理者ページは含めない**
   - `/system/*` のパスは含めないでください
   - robots.txtでも除外されています

2. **公開されているページのみ**
   - 一般ユーザーがアクセスできるページのみを含めます

3. **URLの正確性**
   - すべてのURLが正しく動作することを確認してください
   - 404エラーのページは含めないでください

4. **定期的な更新**
   - ページを更新したら、`lastmod` も更新してください
   - 少なくとも月に1回は確認することを推奨します

## トラブルシューティング

### XML形式エラー

**問題**: サイトマップが正しく表示されない

**解決方法**:
1. XML形式を確認（タグが正しく閉じられているか）
2. オンラインXMLバリデーターで確認
   - https://www.xmlvalidation.com/
3. ブラウザで直接開いて確認

### Google Search Consoleでエラー

**問題**: Search Consoleでサイトマップエラーが表示される

**解決方法**:
1. サイトマップのURLが正しいか確認
2. すべてのURLがアクセス可能か確認
3. robots.txtでブロックされていないか確認

## 参考リンク

- [Sitemap プロトコル](https://www.sitemaps.org/protocol.html)
- [Google Search Console - Sitemap](https://support.google.com/webmasters/answer/183668)
- [XML形式のガイドライン](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
