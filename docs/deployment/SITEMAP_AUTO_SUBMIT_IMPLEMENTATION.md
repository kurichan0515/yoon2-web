# サイトマップ自動送信の実装状況と必要な対応

## ✅ 実装済みの内容

### 1. スクリプトの作成
- ✅ `scripts/submit-sitemap.js` - Google Search Console APIを使用してサイトマップを送信するスクリプト
  - エラーハンドリング完備
  - 詳細なログ出力
  - デプロイ失敗を防ぐための`continue-on-error`設定

### 2. デプロイワークフローの更新
- ✅ `.github/workflows/deploy.yml`にサイトマップ送信ステップを追加
  - Firebase Hostingへのデプロイ後に自動実行
  - エラーが発生してもデプロイは成功として扱う

### 3. ドキュメントの作成
- ✅ `docs/deployment/GOOGLE_SEARCH_CONSOLE_AUTO_SUBMIT.md` - 詳細なセットアップガイド

## ⚠️ 必要な対応（手動で実施が必要）

### ステップ1: Google Search Console APIを有効化

1. **Google Cloud Consoleにアクセス**
   ```
   https://console.cloud.google.com/
   ```

2. **プロジェクトを選択**
   - Firebaseプロジェクトと同じプロジェクトを使用

3. **Search Console APIを有効化**
   - 左メニュー: 「APIとサービス」→「ライブラリ」
   - 検索: 「Google Search Console API」
   - 「有効にする」をクリック

### ステップ2: サービスアカウントの作成

1. **サービスアカウントを作成**
   - 左メニュー: 「IAMと管理」→「サービスアカウント」
   - 「サービスアカウントを作成」をクリック
   - 名前: `search-console-sitemap-submitter`（任意）
   - 「作成して続行」→「完了」

2. **JSONキーをダウンロード**
   - 作成したサービスアカウントをクリック
   - 「キー」タブ → 「キーを追加」→「新しいキーを作成」
   - タイプ: JSON → 「作成」
   - JSONファイルがダウンロードされる

### ステップ3: Google Search Consoleで権限を付与

1. **Search Consoleにアクセス**
   ```
   https://search.google.com/search-console
   ```

2. **プロパティを選択**
   - `https://yoon2.com` を選択

3. **設定を開く**
   - 左メニュー: 「設定」
   - 「ユーザーと権限」セクション

4. **サービスアカウントを追加**
   - 「ユーザーを追加」をクリック
   - サービスアカウントのメールアドレスを入力
     - JSONファイルの`client_email`フィールドの値をコピー
     - 形式: `search-console-sitemap-submitter@[PROJECT-ID].iam.gserviceaccount.com`
   - 権限: 「所有者」または「フル」
   - 「追加」をクリック

### ステップ4: GitHub Secretsの設定

1. **GitHubリポジトリの設定を開く**
   ```
   https://github.com/[USERNAME]/[REPO]/settings/secrets/actions
   ```

2. **サービスアカウントJSONを追加**
   - 「New repository secret」をクリック
   - **Name**: `GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT`
   - **Value**: ダウンロードしたJSONファイルの内容全体をコピー＆ペースト
     ```json
     {
       "type": "service_account",
       "project_id": "...",
       "private_key_id": "...",
       "private_key": "...",
       "client_email": "...",
       ...
     }
     ```
   - 「Add secret」をクリック

3. **サイトURLを追加（オプション）**
   - 「New repository secret」をクリック
   - **Name**: `SEARCH_CONSOLE_SITE_URL`
   - **Value**: `https://yoon2.com`
   - 「Add secret」をクリック
   - 注意: このシークレットが設定されていない場合、デフォルトで`https://yoon2.com`が使用されます

## 📋 確認チェックリスト

実装が完了したら、以下を確認してください：

- [ ] Google Search Console APIが有効化されている
- [ ] サービスアカウントが作成されている
- [ ] サービスアカウントのJSONキーがダウンロードされている
- [ ] Google Search Consoleでサービスアカウントに権限が付与されている
- [ ] GitHub Secretsに`GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT`が設定されている
- [ ] GitHub Secretsに`SEARCH_CONSOLE_SITE_URL`が設定されている（オプション）

## 🧪 動作確認

### テスト方法1: ヘルパースクリプトを使用（推奨）

サービスアカウントのJSONファイルがある場合、以下のコマンドで簡単にテストできます：

```bash
# JSONファイルのパスを指定して実行
./scripts/test-submit-sitemap.sh [JSONファイルのパス]

# 例:
./scripts/test-submit-sitemap.sh ~/Downloads/service-account.json
./scripts/test-submit-sitemap.sh ./service-account.json
```

このスクリプトは：
- JSONファイルを自動的に読み込む
- 環境変数を設定する
- サイトマップ送信スクリプトを実行する
- 結果を分かりやすく表示する

### テスト方法2: 手動で環境変数を設定

```bash
# 環境変数を設定（JSONファイルの内容を1行に変換）
export GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT='{"type":"service_account",...}'
export SEARCH_CONSOLE_SITE_URL='https://yoon2.com'

# スクリプトを実行
node scripts/submit-sitemap.js
```

**注意**: JSONを1行に変換する必要があります（改行を削除）。

### テスト方法2: GitHub Actionsで確認

1. `main`ブランチにプッシュ
2. GitHub Actionsのワークフローを確認
3. 「Submit sitemap to Google Search Console」ステップのログを確認
4. 「✅ サイトマップが正常に送信されました」と表示されれば成功

### Google Search Consoleで確認

1. https://search.google.com/search-console にアクセス
2. 左メニュー: 「Sitemap」
3. `sitemap.xml`が表示され、ステータスが「成功」になっていることを確認

## 🔧 トラブルシューティング

### エラー: "Permission denied" (403)

**原因**: サービスアカウントにSearch Consoleの権限が付与されていない

**解決方法**:
1. Google Search Consoleの「設定」→「ユーザーと権限」で確認
2. サービスアカウントのメールアドレスが追加されているか確認
3. 権限が「所有者」または「フル」になっているか確認

### エラー: "API not enabled" (403)

**原因**: Google Search Console APIが有効化されていない

**解決方法**:
1. Google Cloud Consoleで「APIとサービス」→「ライブラリ」を開く
2. 「Google Search Console API」を検索
3. 「有効にする」をクリック

### エラー: "Invalid JSON"

**原因**: GitHub SecretsのJSONが正しくコピーされていない

**解決方法**:
1. JSONファイルを再度開く
2. すべての内容をコピー（改行やスペースも含む）
3. GitHub Secretsを削除して再作成

## 📝 注意事項

1. **セキュリティ**
   - サービスアカウントのJSONキーは絶対にリポジトリにコミットしない
   - GitHub Secretsのみに保存する
   - 定期的にキーをローテーションすることを推奨

2. **エラーハンドリング**
   - サイトマップ送信に失敗してもデプロイは続行される（`continue-on-error: true`）
   - エラーが発生した場合は、GitHub Actionsのログを確認して手動で送信する

3. **API制限**
   - Google Search Console APIにはレート制限があります
   - 通常の使用では問題ありませんが、頻繁なデプロイの場合は注意が必要です

## 🎯 次のステップ

1. 上記の手順に従って設定を完了
2. テストデプロイを実行して動作確認
3. Google Search Consoleでサイトマップが正常に送信されているか確認
4. 定期的にデプロイログを確認してエラーがないかチェック

## 📚 参考リンク

- [詳細なセットアップガイド](./GOOGLE_SEARCH_CONSOLE_AUTO_SUBMIT.md)
- [Google Search Console API ドキュメント](https://developers.google.com/webmaster-tools/search-console-api-original)
- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
