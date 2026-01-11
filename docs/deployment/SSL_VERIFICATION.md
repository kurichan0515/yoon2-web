# SSL証明書の検証ガイド

`yoon2.com` のSSL証明書の状態を確認する方法です。

## SSL証明書の状態確認

### 1. コマンドラインでの確認

#### 証明書の詳細を確認
```bash
openssl s_client -connect yoon2.com:443 -servername yoon2.com < /dev/null 2>&1 | openssl x509 -noout -text
```

#### 証明書の有効期限を確認
```bash
echo | openssl s_client -connect yoon2.com:443 -servername yoon2.com 2>/dev/null | openssl x509 -noout -dates
```

#### 証明書チェーンを確認
```bash
openssl s_client -connect yoon2.com:443 -servername yoon2.com -showcerts < /dev/null 2>&1
```

#### TLSバージョンを確認
```bash
curl -v https://yoon2.com 2>&1 | grep -i "ssl\|tls"
```

### 2. SSL Labs SSL Test（推奨）

最も包括的なSSL/TLS設定の評価が可能です。

1. **SSL Labs SSL Testにアクセス**
   - https://www.ssllabs.com/ssltest/
   
2. **ドメインを入力**
   - Hostname欄に `yoon2.com` を入力
   - 「Submit」ボタンをクリック

3. **結果を確認**
   - 評価が完了するまで数分かかります
   - 以下の情報が表示されます：
     - **Overall Grade**: 総合評価（A+, A, Bなど）
     - **Certificate**: 証明書の詳細情報
     - **Protocol Support**: サポートされているTLSバージョン
     - **Cipher Suites**: 使用されている暗号スイート
     - **Vulnerability Assessment**: 脆弱性の検出結果

### 3. ブラウザでの確認

#### Chrome/Edge
1. `https://yoon2.com` にアクセス
2. アドレスバーの左側の鍵アイコンをクリック
3. 「接続は安全です」と表示されればOK
4. 「証明書」をクリックして詳細を確認

#### Firefox
1. `https://yoon2.com` にアクセス
2. アドレスバーの左側の鍵アイコンをクリック
3. 「接続は保護されています」と表示されればOK
4. 「詳細」→「証明書を表示」で詳細を確認

### 4. 現在の証明書情報（確認済み）

```
発行者: Google Trust Services (WR3)
有効期限: 2026年1月10日 14:56:48 GMT ～ 2026年4月10日 15:56:09 GMT
サブジェクト: CN = yoon2.com
TLSバージョン: TLS 1.3
証明書チェーン: 正常
```

## 「保護されていない」と表示される原因

### 1. 混合コンテンツ（Mixed Content）

HTTPSページでHTTPリソースを読み込んでいる場合、ブラウザが警告を表示します。

**確認方法:**
- ブラウザの開発者ツール（F12）を開く
- 「Console」タブで警告メッセージを確認
- 「Network」タブでHTTPリソースがないか確認

**解決方法:**
- すべてのリソース（画像、CSS、JavaScript、API）をHTTPSに変更
- 相対パスを使用（`//example.com/resource` ではなく `/resource`）

### 2. ブラウザのキャッシュ

古いキャッシュが原因で警告が表示される場合があります。

**解決方法:**
- ブラウザのキャッシュをクリア
- シークレット/プライベートモードで確認
- ハードリロード（Ctrl+Shift+R / Cmd+Shift+R）

### 3. 証明書チェーンの問題

中間証明書が正しく配信されていない場合があります。

**確認方法:**
```bash
openssl s_client -connect yoon2.com:443 -servername yoon2.com -showcerts < /dev/null 2>&1 | grep -A 2 "Certificate chain"
```

**解決方法:**
- Firebase Hostingは自動的に証明書チェーンを配信します
- 問題がある場合は、Firebase Consoleで証明書を再発行

### 4. HSTS（HTTP Strict Transport Security）の設定

HSTSヘッダーが正しく設定されているか確認します。

**確認方法:**
```bash
curl -I https://yoon2.com | grep -i "strict-transport-security"
```

**期待される結果:**
```
strict-transport-security: max-age=31556926
```

### 5. 証明書の検証エラー

証明書が正しく検証されていない場合があります。

**確認方法:**
```bash
curl -v https://yoon2.com 2>&1 | grep "certificate"
```

**期待される結果:**
```
SSL certificate verify ok.
```

## トラブルシューティング

### SSL証明書が発行されない

1. **DNS設定を確認**
   ```bash
   nslookup yoon2.com
   dig yoon2.com
   ```

2. **Firebase Consoleで確認**
   - Firebase Console → Hosting → カスタムドメイン
   - 証明書の状態を確認
   - 「再試行」ボタンをクリック

### 証明書が期限切れ

Firebase Hostingは自動的に証明書を更新しますが、問題がある場合は：

1. Firebase Consoleで証明書の状態を確認
2. 必要に応じて手動で再発行

### 混合コンテンツの警告

1. **開発者ツールで確認**
   - F12キーで開発者ツールを開く
   - Consoleタブで警告を確認
   - NetworkタブでHTTPリソースを特定

2. **コードを修正**
   - すべてのHTTP URLをHTTPSに変更
   - または相対パスを使用

## 参考リンク

- [SSL Labs SSL Test](https://www.ssllabs.com/ssltest/)
- [Firebase Hosting カスタムドメイン](https://firebase.google.com/docs/hosting/custom-domain)
- [Mixed Content - MDN](https://developer.mozilla.org/ja/docs/Web/Security/Mixed_content)
