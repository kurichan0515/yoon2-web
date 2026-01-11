# カスタムドメイン設定ガイド

`yoon2.com` をFirebase Hostingに設定する手順です。

## 前提条件

- ✅ ドメイン `yoon2.com` を取得済み
- ✅ Firebaseプロジェクト `react-firebase-app-2025` が設定済み
- ✅ Firebase Hostingが有効化済み

## 設定手順

### ステップ1: Firebase Consoleでカスタムドメインを追加

1. **Firebase Consoleにアクセス**
   - https://console.firebase.google.com/
   - プロジェクト `react-firebase-app-2025` を選択

2. **Hostingセクションを開く**
   - 左メニューから「Hosting」を選択

3. **カスタムドメインを追加**
   - 「カスタムドメインを追加」ボタンをクリック
   - ドメイン名に `yoon2.com` を入力
   - 「続行」をクリック

### ステップ2: DNS設定

Firebase Consoleに表示されるDNSレコードを、ドメイン管理画面で設定します。

#### 表示されるDNSレコード例

通常、以下のいずれかのパターンが表示されます：

**パターンA: Aレコード**
```
タイプ: A
名前: @ (または空白)
値: 151.101.1.195
             151.101.65.195
```

**パターンB: CNAMEレコード**
```
タイプ: CNAME
名前: @ (または空白)
値: react-firebase-app-2025.web.app
```

#### DNS設定手順（お名前.comの場合）

1. **お名前.comにログイン**
   - https://www.onamae.com/ にアクセス
   - 会員ログイン

2. **ドメイン管理画面を開く**
   - 「ドメイン」→「ドメイン設定」→「ネームサーバー設定」
   - `yoon2.com` を選択

3. **DNSレコードを追加**
   - Firebase Consoleに表示されたレコードをそのまま設定
   - 保存

#### DNS設定手順（ムームードメインの場合）

1. **ムームードメインにログイン**
   - https://muumuu-domain.com/ にアクセス

2. **DNS設定画面を開く**
   - 「ドメイン操作」→「DNS関連機能の設定」
   - `yoon2.com` を選択

3. **DNSレコードを追加**
   - Firebase Consoleに表示されたレコードを設定
   - 保存

### ステップ3: DNS伝播の確認

DNS設定後、反映まで数分〜48時間かかることがあります。

#### 確認方法

```bash
# DNSレコードの確認
nslookup yoon2.com

# または
dig yoon2.com
```

Firebase Consoleでも自動的に検証が行われます。

### ステップ4: SSL証明書の自動発行

DNS設定が正しく反映されると、Firebaseが自動でLet's EncryptのSSL証明書を発行します。

- **所要時間**: 数分〜数時間
- **ステータス**: Firebase ConsoleのHostingセクションで確認可能
- **完了**: 「証明書がアクティブです」と表示されれば完了

### ステップ5: 動作確認

1. **ブラウザでアクセス**
   - `https://yoon2.com` にアクセス
   - SSL証明書が正しく表示されることを確認

2. **リダイレクトの確認**
   - `http://yoon2.com` → `https://yoon2.com` に自動リダイレクトされることを確認

## トラブルシューティング

### DNS設定が反映されない

- **確認**: DNS設定が正しく保存されているか
- **待機**: 最大48時間かかる場合があります
- **確認コマンド**: `nslookup yoon2.com` で確認

### SSL証明書が発行されない

- **確認**: DNS設定が正しく反映されているか
- **待機**: 数時間かかる場合があります
- **再試行**: Firebase Consoleで「再試行」ボタンをクリック

### アクセスできない

- **確認**: Firebase Hostingにデプロイされているか
- **確認コマンド**: `firebase hosting:sites:list`
- **デプロイ**: `npm run build && firebase deploy --only hosting`

## デプロイ手順

カスタムドメイン設定後、通常通りデプロイします：

```bash
# 1. ビルド
npm run build

# 2. デプロイ
firebase deploy --only hosting

# 3. 確認
firebase hosting:sites:list
```

## 注意事項

- **wwwサブドメイン**: `www.yoon2.com` も設定したい場合は、別途追加が必要です
- **DNS伝播時間**: 設定変更後、反映まで時間がかかることがあります
- **SSL証明書**: 自動更新されるため、手動での更新は不要です

## 参考リンク

- [Firebase Hosting カスタムドメイン](https://firebase.google.com/docs/hosting/custom-domain)
- [DNS設定ガイド](https://firebase.google.com/docs/hosting/custom-domain#set_up_dns)



