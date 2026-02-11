# コスト削減の実装例

このドキュメントでは、実際のプロジェクトに適用できるコスト削減の実装例を提供します。

## 📋 目次

1. [Google Calendar APIのキャッシュ実装](#google-calendar-apiのキャッシュ実装)
2. [Firestoreの最適化実装](#firestoreの最適化実装)
3. [予約サービスの最適化](#予約サービスの最適化)
4. [画像最適化の設定](#画像最適化の設定)

## Google Calendar APIのキャッシュ実装

### calendarService.js へのキャッシュ機能追加

`src/services/calendarService.js` を以下のように修正します：

```javascript
// Google Calendar APIサービス
// ホットペッパービューティー → Google Calendar → HP の連携

class CalendarService {
  constructor() {
    this.gapi = null;
    this.isInitialized = false;
    this.calendarId = process.env.REACT_APP_GOOGLE_CALENDAR_ID;
    this.apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    
    // キャッシュ関連のプロパティを追加
    this.eventsCache = new Map(); // キャッシュストレージ
    this.cacheTimestamp = new Map(); // キャッシュのタイムスタンプ
    this.CACHE_DURATION = 5 * 60 * 1000; // 5分（ミリ秒）
  }

  // ... 既存のコード ...

  // カレンダーのイベントを取得（キャッシュ機能付き）
  async getEvents(timeMin = null, timeMax = null) {
    try {
      await this.initialize();

      const now = new Date();
      const startTime = timeMin || new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const endTime = timeMax || new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();
      
      // キャッシュキーを生成
      const cacheKey = `${startTime}-${endTime}`;
      
      // キャッシュが有効な場合は返す
      if (this.eventsCache.has(cacheKey)) {
        const cachedData = this.eventsCache.get(cacheKey);
        const cachedTimestamp = this.cacheTimestamp.get(cacheKey);
        const now = Date.now();
        
        if (cachedTimestamp && (now - cachedTimestamp) < this.CACHE_DURATION) {
          console.log('📦 Calendar API: キャッシュから取得');
          return cachedData;
        }
      }

      // API呼び出し
      console.log('🌐 Calendar API: APIから取得');
      const response = await this.gapi.client.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startTime,
        timeMax: endTime,
        showDeleted: false,
        singleEvents: true,
        maxResults: 100,
        orderBy: 'startTime'
      });

      const events = this.formatEvents(response.result.items || []);
      
      // キャッシュに保存
      this.eventsCache.set(cacheKey, events);
      this.cacheTimestamp.set(cacheKey, Date.now());
      
      // 古いキャッシュを削除（メモリリーク防止）
      this.cleanupOldCache();
      
      return events;
    } catch (error) {
      console.error('イベント取得エラー:', error);
      throw error;
    }
  }

  // 古いキャッシュを削除
  cleanupOldCache() {
    const now = Date.now();
    const keysToDelete = [];
    
    this.cacheTimestamp.forEach((timestamp, key) => {
      if (now - timestamp > this.CACHE_DURATION * 2) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => {
      this.eventsCache.delete(key);
      this.cacheTimestamp.delete(key);
    });
  }

  // キャッシュをクリア（手動で更新が必要な場合）
  clearCache() {
    this.eventsCache.clear();
    this.cacheTimestamp.clear();
    console.log('🗑️ Calendar API: キャッシュをクリアしました');
  }

  // 特定日のイベントを取得（キャッシュ機能付き）
  async getEventsByDate(date) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      // getEvents内でキャッシュが効く
      const events = await this.getEvents(
        startOfDay.toISOString(),
        endOfDay.toISOString()
      );

      return events;
    } catch (error) {
      console.error('日付別イベント取得エラー:', error);
      throw error;
    }
  }

  // ... 既存のコード ...
}

export default new CalendarService();
```

### 使用例

```javascript
import calendarService from './services/calendarService';

// 初回呼び出し: APIから取得
const events1 = await calendarService.getEvents();

// 5分以内の再呼び出し: キャッシュから取得（API呼び出しなし）
const events2 = await calendarService.getEvents();

// キャッシュをクリアして強制的に更新
calendarService.clearCache();
const events3 = await calendarService.getEvents(); // APIから取得
```

## Firestoreの最適化実装

### 予約サービスの最適化版

`src/services/bookingService.js` を作成または更新します：

```javascript
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc,
  writeBatch,
  serverTimestamp,
  Timestamp,
  limit
} from 'firebase/firestore';
import { db } from '../firebase/config';

class BookingService {
  constructor() {
    // キャッシュ関連のプロパティ
    this.bookingsCache = null;
    this.cacheTimestamp = null;
    this.CACHE_DURATION = 2 * 60 * 1000; // 2分（ミリ秒）
    this.cacheKey = null;
  }

  // 予約を追加（バッチ処理対応）
  async addBooking(bookingData) {
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'pending'
      });
      
      // キャッシュを無効化
      this.invalidateCache();
      
      return docRef.id;
    } catch (error) {
      console.error('予約追加エラー:', error);
      throw error;
    }
  }

  // 予約を取得（キャッシュ機能付き）
  async getBookings(filters = {}) {
    try {
      // キャッシュキーを生成
      const cacheKey = JSON.stringify(filters);
      const now = Date.now();
      
      // キャッシュが有効な場合は返す
      if (this.bookingsCache && 
          this.cacheTimestamp && 
          this.cacheKey === cacheKey &&
          (now - this.cacheTimestamp) < this.CACHE_DURATION) {
        console.log('📦 Firestore: キャッシュから取得');
        return this.bookingsCache;
      }

      // Firestoreから取得
      console.log('🌐 Firestore: データベースから取得');
      let q = query(collection(db, 'bookings'));
      
      if (filters.date) {
        q = query(q, where('date', '==', filters.date));
      }
      
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      if (filters.email) {
        q = query(q, where('email', '==', filters.email));
      }
      
      // 必要に応じて制限を追加
      if (filters.limit) {
        q = query(q, limit(filters.limit));
      }
      
      const querySnapshot = await getDocs(q);
      const bookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // キャッシュに保存
      this.bookingsCache = bookings;
      this.cacheTimestamp = now;
      this.cacheKey = cacheKey;
      
      return bookings;
    } catch (error) {
      console.error('予約取得エラー:', error);
      throw error;
    }
  }

  // 特定日の予約を取得（最適化版）
  async getBookingsByDate(date) {
    return this.getBookings({ date });
  }

  // 予約を更新（一度の書き込み）
  async updateBooking(id, updates) {
    try {
      const docRef = doc(db, 'bookings', id);
      
      // 一度の書き込みで全ての更新を実行
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      // キャッシュを無効化
      this.invalidateCache();
      
      return true;
    } catch (error) {
      console.error('予約更新エラー:', error);
      throw error;
    }
  }

  // 複数の予約を一括更新（バッチ処理）
  async updateBookingsBatch(updates) {
    try {
      const batch = writeBatch(db);
      
      updates.forEach(({ id, data }) => {
        const docRef = doc(db, 'bookings', id);
        batch.update(docRef, {
          ...data,
          updatedAt: serverTimestamp()
        });
      });
      
      await batch.commit();
      
      // キャッシュを無効化
      this.invalidateCache();
      
      return true;
    } catch (error) {
      console.error('一括更新エラー:', error);
      throw error;
    }
  }

  // 予約を削除
  async deleteBooking(id) {
    try {
      const docRef = doc(db, 'bookings', id);
      await deleteDoc(docRef);
      
      // キャッシュを無効化
      this.invalidateCache();
      
      return true;
    } catch (error) {
      console.error('予約削除エラー:', error);
      throw error;
    }
  }

  // 古い予約を一括削除（バッチ処理）
  async cleanupOldBookings(daysOld = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);
      
      const q = query(
        collection(db, 'bookings'),
        where('status', '==', 'cancelled'),
        where('createdAt', '<', Timestamp.fromDate(cutoffDate))
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log('削除する古い予約はありません');
        return 0;
      }
      
      // バッチ処理で削除（最大500件まで）
      const batch = writeBatch(db);
      let count = 0;
      const maxBatchSize = 500;
      
      querySnapshot.docs.forEach((docSnapshot) => {
        if (count < maxBatchSize) {
          batch.delete(docSnapshot.ref);
          count++;
        }
      });
      
      await batch.commit();
      
      // キャッシュを無効化
      this.invalidateCache();
      
      console.log(`古い予約 ${count} 件を削除しました`);
      return count;
    } catch (error) {
      console.error('古い予約削除エラー:', error);
      throw error;
    }
  }

  // キャッシュを無効化
  invalidateCache() {
    this.bookingsCache = null;
    this.cacheTimestamp = null;
    this.cacheKey = null;
    console.log('🗑️ Firestore: キャッシュを無効化しました');
  }

  // キャッシュを手動でクリア
  clearCache() {
    this.invalidateCache();
  }
}

export default new BookingService();
```

### 使用例

```javascript
import bookingService from './services/bookingService';

// 予約を取得（初回はFirestoreから、2分以内はキャッシュから）
const bookings = await bookingService.getBookings();

// フィルタ付きで取得
const todayBookings = await bookingService.getBookings({ 
  date: '2024-01-15',
  status: 'confirmed'
});

// 予約を追加（キャッシュが自動的に無効化される）
const bookingId = await bookingService.addBooking({
  name: '山田太郎',
  email: 'yamada@example.com',
  date: '2024-01-20',
  time: '14:00',
  service: 'イヤーエステ 60分コース'
});

// 複数の予約を一括更新
await bookingService.updateBookingsBatch([
  { id: 'booking1', data: { status: 'confirmed' } },
  { id: 'booking2', data: { status: 'confirmed' } }
]);

// 古い予約を削除（30日以上前のキャンセル済み予約）
await bookingService.cleanupOldBookings(30);
```

## 予約サービスの最適化

### Reactコンポーネントでの使用例

```javascript
import { useState, useEffect, useCallback } from 'react';
import bookingService from '../services/bookingService';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 予約を取得（キャッシュを活用）
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch (error) {
      console.error('予約取得エラー:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
    
    // 5分ごとに自動更新（キャッシュが効くので実際のAPI呼び出しは少ない）
    const interval = setInterval(() => {
      fetchBookings();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchBookings]);

  // 予約を更新
  const handleUpdateBooking = async (id, updates) => {
    try {
      await bookingService.updateBooking(id, updates);
      // キャッシュが無効化されるので、再取得で最新データが取得される
      await fetchBookings();
    } catch (error) {
      console.error('予約更新エラー:', error);
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      {bookings.map(booking => (
        <div key={booking.id}>
          {/* 予約情報の表示 */}
        </div>
      ))}
    </div>
  );
}
```

## 画像最適化の設定

### firebase.json の更新

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "redirects": [
      {
        "source": "/index.html",
        "destination": "/",
        "type": 301
      }
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
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

### package.json に画像最適化スクリプトを追加

```json
{
  "scripts": {
    "build": "DISABLE_ESLINT_PLUGIN=true NODE_OPTIONS=--max-old-space-size=4096 react-scripts build",
    "build:optimize": "npm run optimize-images && npm run build",
    "optimize-images": "node scripts/optimize-images.js"
  },
  "devDependencies": {
    "sharp": "^0.32.0"
  }
}
```

### 画像最適化スクリプト（scripts/optimize-images.js）

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const publicDir = path.join(__dirname, '../public');
  const imagesDir = path.join(publicDir, 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.log('画像ディレクトリが見つかりません');
    return;
  }

  const files = fs.readdirSync(imagesDir);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (!imageExtensions.includes(ext)) {
      continue;
    }
    
    try {
      const stats = fs.statSync(filePath);
      const originalSize = stats.size;
      
      // WebP形式に変換
      const webpPath = filePath.replace(ext, '.webp');
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      const webpStats = fs.statSync(webpPath);
      const newSize = webpStats.size;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
      
      console.log(`${file}: ${(originalSize / 1024).toFixed(2)}KB → ${(newSize / 1024).toFixed(2)}KB (${savings}%削減)`);
    } catch (error) {
      console.error(`画像最適化エラー: ${file}`, error);
    }
  }
}

optimizeImages();
```

## 実装の優先順位

1. **最優先**: Google Calendar APIのキャッシュ実装
   - 最も効果が高い
   - 実装が簡単

2. **高優先**: Firestoreのキャッシュ実装
   - 読み取り回数を大幅に削減
   - ユーザー体験も向上

3. **中優先**: バッチ処理の実装
   - 書き込み回数を削減
   - パフォーマンスも向上

4. **低優先**: 画像最適化
   - Hosting転送量の削減
   - 実装に時間がかかる

## 効果測定

実装後、以下の指標を確認してください：

1. **Firebase Console** → 「使用量と請求」
   - Firestore読み取り/書き込み回数の変化
   - Hosting転送量の変化

2. **Google Cloud Console** → 「APIとサービス」→ 「ダッシュボード」
   - Google Calendar APIの呼び出し回数

3. **アプリケーションのパフォーマンス**
   - ページ読み込み時間の改善
   - API呼び出しの減少

---

**注意**: これらの実装は段階的に適用することをお勧めします。まずキャッシュ機能から実装し、効果を確認してから次の最適化に進んでください。
