# Google Search Console セットアップガイド

yoon2.com をGoogle検索に表示させるための設定手順です。

## 前提条件

- ✅ サイトが `https://yoon2.com` で公開されている
- ✅ sitemap.xmlが作成されている（`https://yoon2.com/sitemap.xml`）
- ✅ robots.txtが正しく設定されている

## セットアップ手順

### ステップ1: Google Search Consoleにアクセス

1. **Google Search Consoleにアクセス**
   - https://search.google.com/search-console にアクセス
   - Googleアカウントでログイン

2. **プロパティを追加**
   - 「プロパティを追加」をクリック
   - 「URLプレフィックス」を選択
   - `https://yoon2.com` を入力
   - 「続行」をクリック

### ステップ2: 所有権の確認

Google Search Consoleでは、サイトの所有者であることを確認する必要があります。

#### 推奨方法: HTMLファイルのアップロード

1. **HTMLファイルをダウンロード**
   - Google Search ConsoleからHTMLファイルをダウンロード
   - ファイル名は `google[ランダムな文字列].html` の形式

2. **ファイルをpublicフォルダに配置**
   ```bash
   # ダウンロードしたファイルをpublicフォルダにコピー
   cp ~/Downloads/google[ランダムな文字列].html public/
   ```

3. **デプロイ**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

4. **確認**
   - Google Search Consoleで「確認」ボタンをクリック
   - `https://yoon2.com/google[ランダムな文字列].html` にアクセスできることを確認

#### 代替方法: HTMLタグの追加

1. **HTMLタグを取得**
   - Google Search ConsoleからHTMLタグをコピー
   - `<meta name="google-site-verification" content="[検証コード]" />` の形式

2. **index.htmlに追加**
   - `public/index.html` の `<head>` セクションに追加
   - 例：
   ```html
   <head>
     <!-- 既存のメタタグ -->
     <meta name="google-site-verification" content="[検証コード]" />
     <!-- 他のメタタグ -->
   </head>
   ```

3. **デプロイ**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

4. **確認**
   - Google Search Consoleで「確認」ボタンをクリック

### ステップ3: Sitemapの送信

1. **Sitemapセクションを開く**
   - 左メニューから「Sitemap」を選択

2. **Sitemapを送信**
   - 「新しいSitemapを追加」に `sitemap.xml` を入力
   - 「送信」をクリック

3. **確認**
   - 数分後に「成功」と表示されることを確認
   - エラーがある場合は、エラーメッセージを確認して修正

### ステップ4: インデックス登録のリクエスト（オプション）

1. **URL検査ツールを使用**
   - 左メニューから「URL検査」を選択
   - `https://yoon2.com` を入力
   - 「インデックス登録をリクエスト」をクリック

2. **主要ページをリクエスト**
   - ホームページ: `https://yoon2.com/`
   - ホームページ（店舗情報・コース情報を含む）: `https://yoon2.com/`

## 確認事項

### サイトがインデックスされているか確認

1. **Google検索で確認**
   ```
   site:yoon2.com
   ```
   この検索でサイトが表示されれば、インデックスされています。

2. **Search Consoleで確認**
   - 「カバレッジ」セクションでインデックス状況を確認
   - 「有効」なページが表示されていることを確認

### robots.txtの確認

以下のURLでrobots.txtが正しく表示されることを確認：
```
https://yoon2.com/robots.txt
```

### sitemap.xmlの確認

以下のURLでsitemap.xmlが正しく表示されることを確認：
```
https://yoon2.com/sitemap.xml
```

## よくある問題と解決方法

### サイトがインデックスされない

**原因**:
- サイトが新しく、まだクロールされていない
- robots.txtでブロックされている
- サイトの品質が低いと判断されている

**解決方法**:
1. 数日〜数週間待つ（新規サイトは時間がかかります）
2. robots.txtを確認して、ブロックされていないか確認
3. サイトのコンテンツを充実させる
4. 外部リンクを増やす（SNSなどからリンクを張る）

### Sitemapがエラーになる

**原因**:
- sitemap.xmlの形式が正しくない
- URLが正しくない
- アクセスできない

**解決方法**:
1. sitemap.xmlのXML形式を確認
2. URLが `https://yoon2.com/` で始まっているか確認
3. ブラウザで直接アクセスして確認

### 所有権の確認ができない

**原因**:
- HTMLファイルが正しくデプロイされていない
- HTMLタグが正しく追加されていない
- DNS設定が正しくない

**解決方法**:
1. デプロイが成功しているか確認
2. HTMLファイルに直接アクセスして確認
3. ブラウザの開発者ツールでHTMLタグを確認

## インデックス登録までの時間

- **新規サイト**: 数日〜数週間
- **既存サイトの更新**: 数時間〜数日
- **Sitemap送信後**: 通常1週間以内

## 定期的なメンテナンス

1. **Search Consoleを定期的に確認**
   - エラーがないか確認
   - インデックス状況を確認

2. **Sitemapを更新**
   - 新しいページを追加したら、sitemap.xmlを更新
   - デプロイ後にSearch Consoleで再送信

3. **パフォーマンスを確認**
   - 「パフォーマンス」セクションで検索結果の表示状況を確認
   - クリック率や表示回数を確認

## 参考リンク

- [Google Search Console ヘルプ](https://support.google.com/webmasters/)
- [Sitemap ガイドライン](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [robots.txt ガイドライン](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
