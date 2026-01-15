# Google Cloud / Firebase コスト削減ガイド

このガイドでは、Google CloudとFirebaseの有料版から無料版（Sparkプラン）への移行方法と、コストを最小限に抑える最適化方法を説明します。

## 📋 目次

1. [現在の使用状況の確認](#現在の使用状況の確認)
2. [Firebase無料プラン（Sparkプラン）の制限](#firebase無料プランスparkプランの制限)
3. [Google Cloud無料枠の活用](#google-cloud無料枠の活用)
4. [コスト削減の具体的な方法](#コスト削減の具体的な方法)
5. [移行手順](#移行手順)
6. [モニタリングとアラート設定](#モニタリングとアラート設定)

## 現在の使用状況の確認

### 1. Firebase Consoleで使用量を確認

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. プロジェクトを選択
3. 「使用量と請求」→「使用量」タブを確認

**確認すべき項目：**
- Firestore: 読み取り/書き込み/削除の回数
- Firebase Hosting: 転送量（GB）
- Firebase Authentication: 認証回数
- Cloud Functions: 呼び出し回数と実行時間（使用している場合）

### 2. Google Cloud Consoleで使用量を確認

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 「請求」→「レポート」を確認

**確認すべき項目：**
- Google Calendar API: リクエスト数
- Google Ads API: リクエスト数（使用している場合）
- その他のAPI使用量

## Firebase無料プラン（Sparkプラン）の制限

### Firestore（データベース）

| 項目 | 無料枠 | 超過時の料金 |
|------|--------|--------------|
| ドキュメント読み取り | 50,000回/日 | $0.06/100,000回 |
| ドキュメント書き込み | 20,000回/日 | $0.18/100,000回 |
| ドキュメント削除 | 20,000回/日 | $0.02/100,000回 |
| ストレージ | 1GB | $0.18/GB/月 |

**最適化のポイント：**
- 不要な読み取りを減らす（キャッシュの活用）
- バッチ処理で書き込み回数を減らす
- 古いデータの定期削除

### Firebase Hosting

| 項目 | 無料枠 | 超過時の料金 |
|------|--------|--------------|
| ストレージ | 10GB | $0.026/GB/月 |
| 転送量 | 360MB/日 | $0.15/GB |

**最適化のポイント：**
- 画像の最適化（WebP形式、圧縮）
- 静的アセットのCDNキャッシュ活用
- 不要なファイルの削除

### Firebase Authentication

| 項目 | 無料枠 | 超過時の料金 |
|------|--------|--------------|
| 認証 | 無制限 | 無料 |

**最適化のポイント：**
- 認証は無料なので問題なし

### Cloud Functions（使用している場合）

| 項目 | 無料枠 | 超過時の料金 |
|------|--------|--------------|
| 呼び出し | 125,000回/月 | $0.40/1,000,000回 |
| 実行時間 | 40,000GB秒/月 | $0.0000025/GB秒 |
| ネットワーク送信 | 5GB/月 | $0.12/GB |

## Google Cloud無料枠の活用

### Google Calendar API

| 項目 | 無料枠 | 超過時の料金 |
|------|--------|--------------|
| リクエスト | 1,000,000回/日 | 有料プランが必要 |

**最適化のポイント：**
- 1日100万リクエストまで無料
- キャッシュを活用してリクエスト数を減らす
- バッチ処理で複数のイベントを一度に取得

### Google Ads API

| 項目 | 無料枠 | 超過時の料金 |
|------|--------|--------------|
| リクエスト | 15,000回/日 | 有料プランが必要 |

**最適化のポイント：**
- 1日15,000リクエストまで無料
- 必要な時だけAPIを呼び出す
- データの更新頻度を調整

## コスト削減の具体的な方法

### 1. Firestoreの最適化

#### 読み取り回数の削減

```javascript
// ❌ 悪い例: 毎回データベースから取得
const getBookings = async () => {
  const snapshot = await getDocs(collection(db, 'bookings'));
  return snapshot.docs.map(doc => doc.data());
};

// ✅ 良い例: キャッシュを活用
let bookingsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5分

const getBookings = async () => {
  const now = Date.now();
  if (bookingsCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return bookingsCache;
  }
  
  const snapshot = await getDocs(collection(db, 'bookings'));
  bookingsCache = snapshot.docs.map(doc => doc.data());
  cacheTimestamp = now;
  return bookingsCache;
};
```

#### 書き込み回数の削減

```javascript
// ❌ 悪い例: 複数回の書き込み
const updateBooking = async (id, updates) => {
  await updateDoc(doc(db, 'bookings', id), { status: updates.status });
  await updateDoc(doc(db, 'bookings', id), { updatedAt: new Date() });
};

// ✅ 良い例: 一度の書き込み
const updateBooking = async (id, updates) => {
  await updateDoc(doc(db, 'bookings', id), {
    ...updates,
    updatedAt: new Date()
  });
};
```

#### バッチ処理の活用

```javascript
// ✅ 良い例: バッチ書き込み
const batch = writeBatch(db);
bookings.forEach(booking => {
  const docRef = doc(db, 'bookings', booking.id);
  batch.set(docRef, booking);
});
await batch.commit();
```

#### クエリの最適化

```javascript
// ❌ 悪い例: 全データを取得してフィルタリング
const getTodayBookings = async () => {
  const snapshot = await getDocs(collection(db, 'bookings'));
  const today = new Date().toISOString().split('T')[0];
  return snapshot.docs
    .map(doc => doc.data())
    .filter(booking => booking.date === today);
};

// ✅ 良い例: クエリでフィルタリング
const getTodayBookings = async () => {
  const today = new Date().toISOString().split('T')[0];
  const q = query(
    collection(db, 'bookings'),
    where('date', '==', today)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
```

### 2. Firebase Hostingの最適化

#### 画像の最適化

```javascript
// 画像をWebP形式に変換
// ビルド時に自動的に最適化する設定を追加
```

**推奨設定：**
- 画像をWebP形式に変換（約30%のサイズ削減）
- 画像の遅延読み込み（lazy loading）
- 適切なサイズの画像を使用（レスポンシブ画像）

#### キャッシュ戦略の最適化

```json
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000, public"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000, public"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ]
  }
}
```

### 3. Google Calendar APIの最適化

#### キャッシュの活用

```javascript
// calendarService.js に追加
class CalendarService {
  constructor() {
    this.eventsCache = null;
    this.cacheTimestamp = null;
    this.CACHE_DURATION = 5 * 60 * 1000; // 5分
  }

  async getEvents(timeMin = null, timeMax = null) {
    const now = Date.now();
    const cacheKey = `${timeMin}-${timeMax}`;
    
    // キャッシュが有効な場合は返す
    if (this.eventsCache && 
        this.cacheTimestamp && 
        (now - this.cacheTimestamp) < this.CACHE_DURATION &&
        this.cacheKey === cacheKey) {
      return this.eventsCache;
    }

    // API呼び出し
    const response = await this.gapi.client.calendar.events.list({
      calendarId: this.calendarId,
      timeMin: startTime,
      timeMax: endTime,
      showDeleted: false,
      singleEvents: true,
      maxResults: 100,
      orderBy: 'startTime'
    });

    this.eventsCache = this.formatEvents(response.result.items || []);
    this.cacheTimestamp = now;
    this.cacheKey = cacheKey;
    
    return this.eventsCache;
  }
}
```

#### 必要な期間だけ取得

```javascript
// ❌ 悪い例: 長期間のデータを取得
const events = await calendarService.getEvents(
  null, // デフォルトで2ヶ月分
  null
);

// ✅ 良い例: 必要な期間だけ取得
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
const events = await calendarService.getEvents(
  today.toISOString(),
  nextWeek.toISOString()
);
```

### 4. 古いデータの定期削除

```javascript
// 30日以上前の予約データを削除するスクリプト
const cleanupOldBookings = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const q = query(
    collection(db, 'bookings'),
    where('createdAt', '<', Timestamp.fromDate(thirtyDaysAgo)),
    where('status', '==', 'cancelled')
  );
  
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);
  
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();
  console.log(`削除した予約数: ${snapshot.docs.length}`);
};
```

## 移行手順

### ステップ1: 現在の使用量を確認

1. Firebase Consoleで使用量を確認
2. Google Cloud Consoleで請求を確認
3. どのサービスが無料枠を超えているか特定

### ステップ2: 最適化を実装

1. 上記の最適化方法を実装
2. キャッシュ機能を追加
3. 不要なAPI呼び出しを削減

### ステップ3: プランを変更

1. Firebase Console → 「使用量と請求」→「プランと請求」
2. 「Sparkプラン（無料）」に変更
3. 確認メッセージを読んで承認

**注意：**
- Blazeプラン（従量課金）からSparkプランに変更すると、一部の機能が制限されます
- Cloud Functionsを使用している場合は、Sparkプランでは使用できません
- 外部API（Google Calendar APIなど）は引き続き使用可能ですが、無料枠内に収める必要があります

### ステップ4: モニタリング

1. 使用量を定期的に確認
2. 無料枠を超えそうな場合はアラートを設定
3. 必要に応じて追加の最適化を実施

## モニタリングとアラート設定

### Firebase Consoleでのアラート設定

1. Firebase Console → 「使用量と請求」→「アラート」
2. 「アラートを作成」をクリック
3. 以下のアラートを設定：

**推奨アラート：**
- Firestore読み取り: 40,000回/日（無料枠の80%）
- Firestore書き込み: 16,000回/日（無料枠の80%）
- Hosting転送量: 300MB/日（無料枠の80%）

### Google Cloud Consoleでのアラート設定

1. Google Cloud Console → 「監視」→「アラート」
2. 「アラートポリシーを作成」
3. メトリクスを選択：
   - API呼び出し数
   - ネットワーク転送量

### 使用量の定期確認

**推奨頻度：**
- 週1回: 使用量の確認
- 月1回: コストレポートの確認
- 無料枠の80%を超えた場合: 即座に最適化を実施

## 無料枠で運用するためのチェックリスト

- [ ] Firestoreの読み取り回数を削減（キャッシュの活用）
- [ ] Firestoreの書き込み回数を削減（バッチ処理の活用）
- [ ] Firebase Hostingの転送量を削減（画像最適化、キャッシュ設定）
- [ ] Google Calendar APIの呼び出しを削減（キャッシュの活用）
- [ ] 古いデータの定期削除を実装
- [ ] 不要なAPI呼び出しを削除
- [ ] アラート設定を完了
- [ ] 使用量の定期確認を開始

## 追加の最適化アイデア

### 1. クライアント側でのデータ管理

- ローカルストレージ（localStorage）を活用
- IndexedDBを使用したオフライン対応
- Service Workerによるキャッシュ

### 2. サーバーサイドレンダリング（SSR）の検討

- Next.jsへの移行を検討
- 静的サイト生成（SSG）の活用
- 外部ホスティング（Vercel、Netlify）の検討

### 3. CDNの活用

- Firebase HostingのCDN機能を最大限活用
- 静的アセットの適切なキャッシュ設定

## トラブルシューティング

### Q: 無料枠を超えてしまった場合

**A:** 以下の対応を実施：
1. 即座に最適化を実施
2. 不要なデータを削除
3. キャッシュを強化
4. 必要に応じて一時的に機能を制限

### Q: Sparkプランに変更できない

**A:** 以下の理由が考えられます：
- Blazeプランで使用したクレジットが残っている
- Cloud Functionsを使用している（Sparkプランでは使用不可）
- 外部APIの使用量が多い

### Q: 無料枠内で運用できない

**A:** 以下の対策を検討：
1. より積極的な最適化
2. 外部ホスティングへの移行（Vercel、Netlify）
3. 別のデータベースサービス（Supabase、MongoDB Atlas）の検討

## 参考リンク

- [Firebase料金プラン](https://firebase.google.com/pricing)
- [Google Cloud無料枠](https://cloud.google.com/free)
- [Firestore料金](https://firebase.google.com/docs/firestore/pricing)
- [Firebase Hosting料金](https://firebase.google.com/docs/hosting/pricing)

---

**注意**: このガイドは2024年時点の情報に基づいています。料金や無料枠は変更される可能性があるため、最新の情報は公式ドキュメントを確認してください。
