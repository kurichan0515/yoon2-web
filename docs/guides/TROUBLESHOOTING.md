# トラブルシューティング

## 開発環境の問題

### 依存関係エラー

```bash
rm -rf node_modules package-lock.json
npm install
npm cache clean --force
```

### ポート競合 (3000番)

```bash
lsof -ti:3000 | xargs kill -9
npm run dev
# または別ポートで起動
PORT=3001 npm run dev
```

### TypeScript エラー

```bash
npx tsc --noEmit
# エラー内容を確認して修正
```

### ビルドエラー

```bash
rm -rf .next
npm run build
```

---

## Firebase 関連

### Auth エラー

- Firebase Console → Authentication → Sign-in method → メール/パスワード が有効か確認
- `.env.local` の `NEXT_PUBLIC_FIREBASE_*` が正しく設定されているか確認

### Firestore 接続エラー

- Firebase Console → Firestore Database が作成済みか確認
- セキュリティルール (`firestore.rules`) が適切か確認

### 環境変数確認

```bash
# Next.js で NEXT_PUBLIC_ 変数の確認
node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)"
```

---

## デプロイ・ビルドの問題

### メモリ不足 (exit code 137)

```bash
# Node.jsのメモリを増やす
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### GitHub Actions デプロイ失敗

1. リポジトリ Settings → Secrets で Firebase 設定が正しいか確認
2. `.github/workflows/` の workflow ファイルを確認
3. Actions タブでエラーログを確認

---

## Next.js App Router の注意点

### `useState`/`useEffect` でエラー

Server Component でクライアント側 API を使っているケース。
ファイル先頭に `'use client'` を追加する。

### ルーティング

- App Router のページは `app/` 以下に配置
- ビュー (UI) は `src/views/` に配置し `app/*/page.tsx` からインポート

---

## よくある質問

**Q: 管理画面にアクセスできない**  
A: `/system/login` でログイン。管理者アカウントがない場合は [ADMIN_ACCESS.md](../setup/ADMIN_ACCESS.md) 参照。

**Q: Google Calendar の予約が表示されない**  
A: `NEXT_PUBLIC_GOOGLE_API_KEY` と `NEXT_PUBLIC_GOOGLE_CALENDAR_ID` の設定確認。[GOOGLE_CALENDAR_SETUP.md](../setup/GOOGLE_CALENDAR_SETUP.md) 参照。

**Q: AdSense 広告が表示されない**  
A: localhost では表示されない (正常動作)。本番環境で審査通過後に表示される。
