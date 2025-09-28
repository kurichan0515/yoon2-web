# Google Calendar API 設定手順

## 概要
このガイドでは、ホットペッパービューティーの予約情報をGoogle Calendarから取得するためのAPI設定方法を説明します。

## 手順1: Google Cloud Console設定

### 1.1 Google Cloud Consoleにアクセス
1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. Googleアカウントでログイン（お店で使用しているGoogleアカウントを推奨）

### 1.2 プロジェクトの作成
1. 画面上部の「プロジェクトを選択」をクリック
2. 「新しいプロジェクト」をクリック
3. プロジェクト名を入力（例：「yoon-calendar-api」）
4. 「作成」をクリック
5. 作成したプロジェクトを選択

### 1.3 Google Calendar APIを有効化
1. 左側メニューから「APIとサービス」→「ライブラリ」をクリック
2. 検索ボックスに「Google Calendar API」と入力
3. 「Google Calendar API」をクリック
4. 「有効にする」をクリック

### 1.4 APIキーの作成
1. 左側メニューから「APIとサービス」→「認証情報」をクリック
2. 「+認証情報を作成」→「APIキー」をクリック
3. APIキーが生成されるので、コピーして保存（後で使用）

### 1.5 APIキーの制限設定（セキュリティ強化）
1. 作成したAPIキーの「制限」をクリック
2. 「アプリケーションの制限」で「HTTPリファラー」を選択
3. 「項目を追加」をクリックして以下を追加：
   - `localhost:3000/*` （開発環境用）
   - `yourdomain.com/*` （本番環境用・実際のドメインに置き換え）
4. 「APIの制限」で「キーを制限」を選択
5. 「Google Calendar API」を選択
6. 「保存」をクリック

## 手順2: Google Calendarの設定

### 2.1 カレンダーの作成（推奨）
1. [Google Calendar](https://calendar.google.com/) にアクセス
2. 左側の「他のカレンダー」の「+」をクリック
3. 「新しいカレンダーの作成」をクリック
4. カレンダー名を入力（例：「yoon予約管理」）
5. 説明を入力（任意）
6. 「カレンダーを作成」をクリック

### 2.2 カレンダーIDの取得
1. 作成したカレンダーの「⋮」（縦三点）をクリック
2. 「設定と共有」をクリック
3. 「カレンダーの統合」セクションでカレンダーIDをコピー
   - 例：`abcd1234@group.calendar.google.com`

### 2.3 カレンダーの公開設定
1. 「アクセス権限」セクションで「一般公開して誰でも利用できるようにする」をチェック
2. または「特定のユーザーと共有」でサービスアカウントのメールアドレスを追加

## 手順3: ホットペッパービューティーとの連携

### 3.1 ホットペッパービューティー管理画面
1. [ホットペッパービューティー店舗管理画面](https://beauty-reserve.hotpepper.jp/) にログイン
2. 「予約管理」→「外部カレンダー連携」をクリック
3. 「Google Calendar」を選択
4. 指示に従ってGoogleアカウントと連携
5. 連携先カレンダーに先ほど作成したカレンダーを選択

### 3.2 連携設定の確認
1. テスト予約を作成して、Google Calendarに反映されるか確認
2. 予約詳細が正しく表示されるか確認

## 手順4: アプリケーションへの設定

### 4.1 環境変数ファイルの作成
1. プロジェクトルートに `.env` ファイルを作成
2. 以下の内容を記入：

```env
# 既存の設定（Firebase等）はそのまま残す

# Google Calendar API設定
REACT_APP_GOOGLE_API_KEY=手順1.4で取得したAPIキー
REACT_APP_GOOGLE_CALENDAR_ID=手順2.2で取得したカレンダーID
```

### 4.2 設定例
```env
# 例（実際の値に置き換えてください）
REACT_APP_GOOGLE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_GOOGLE_CALENDAR_ID=abcd1234@group.calendar.google.com
```

## 手順5: 動作確認

### 5.1 開発サーバーの再起動
```bash
# サーバーを停止（Ctrl+C）
# 再起動
npm start
```

### 5.2 機能確認
1. ブラウザで http://localhost:3000 にアクセス
2. 「予約状況」ページにアクセス
3. カレンダーが表示されることを確認
4. ホットペッパービューティーの予約が表示されることを確認

## トラブルシューティング

### エラー: API key not valid
- APIキーが正しく設定されているか確認
- APIキーの制限設定を確認
- Google Calendar APIが有効になっているか確認

### エラー: Calendar not found
- カレンダーIDが正しいか確認
- カレンダーの公開設定を確認

### 予約が表示されない
- ホットペッパービューティーとGoogle Calendarの連携を確認
- カレンダーにイベントが正しく作成されているか確認

### CORS エラー
- HTTPリファラーの制限設定を確認
- 開発環境用のリファラー（localhost:3000）が設定されているか確認

## セキュリティのベストプラクティス

### APIキー管理
- `.env` ファイルは `.gitignore` に含める
- 本番環境では環境変数でAPIキーを管理
- 定期的にAPIキーをローテーション

### カレンダーアクセス権限
- 必要最小限の権限のみ付与
- 定期的にアクセス権限を見直し

## サポート情報

### Google Calendar API制限
- 無料枠：1日あたり100万リクエスト
- レート制限：秒あたり100リクエスト

### よくある質問

**Q: 複数の店舗で使用できますか？**
A: はい。店舗ごとに異なるカレンダーIDを設定することで可能です。

**Q: 過去の予約も表示されますか？**
A: はい。設定した期間内の過去の予約も表示されます。

**Q: リアルタイムで更新されますか？**
A: ページ更新時に最新データを取得します。完全なリアルタイム更新には追加実装が必要です。

## 参考リンク
- [Google Calendar API Documentation](https://developers.google.com/calendar)
- [Google Cloud Console](https://console.cloud.google.com/)
- [ホットペッパービューティー店舗管理](https://beauty-reserve.hotpepper.jp/)
