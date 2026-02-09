# CounterCardコンポーネント使用ガイド

**対象**: yoon²ゆんゆん Webアプリケーション  
**作成日**: 2026年2月8日

---

## 📋 概要

カウント値を表示するカード形式のコンポーネントです。ダッシュボードや統計情報の表示に使用します。

---

## 🚀 基本的な使用方法

### インポート

```javascript
import CounterCard from '../components/common/CounterCard';
```

### 基本的な使用例

```javascript
// 基本的なカード
<CounterCard 
  name="予約数" 
  count={150}
  todayCount={5}
  description="今月の予約総数"
/>

// クリック可能なカード
<CounterCard 
  name="予約数" 
  count={150}
  todayCount={5}
  description="今月の予約総数"
  onClick={() => console.log('カードがクリックされました')}
/>
```

---

## 🎨 コンポーネントの構成

### ヘッダー部分
- **名前/タイトル**: カードのタイトル
- **今日のバッジ**: 今日の増加数を表示（オプション）

### メイン部分
- **カウント値**: 大きな数値で表示

### フッター部分（オプション）
- **説明文**: カードの説明（最大2行）

---

## 💡 使用例

### ダッシュボードでの使用

```javascript
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 150,
    todayBookings: 5,
    totalRevenue: 750000,
    todayRevenue: 25000,
  });

  return (
    <div className="dashboard-grid">
      <CounterCard 
        name="予約総数" 
        count={stats.totalBookings}
        todayCount={stats.todayBookings}
        description="今月の予約総数"
        onClick={() => navigateToBookings()}
      />
      
      <CounterCard 
        name="売上" 
        count={stats.totalRevenue}
        todayCount={stats.todayRevenue}
        description="今月の売上総額（円）"
        onClick={() => navigateToRevenue()}
      />
    </div>
  );
};
```

### 統計情報の表示

```javascript
const Analytics = () => {
  return (
    <div className="analytics-cards">
      <CounterCard 
        name="ページビュー" 
        count={1250}
        todayCount={45}
        description="今月のページビュー数"
      />
      
      <CounterCard 
        name="ユニークユーザー" 
        count={850}
        todayCount={32}
        description="今月のユニークユーザー数"
      />
      
      <CounterCard 
        name="コンバージョン" 
        count={125}
        todayCount={8}
        description="今月のコンバージョン数"
      />
    </div>
  );
};
```

### クリック可能なカード

```javascript
const handleCardClick = (cardType) => {
  switch (cardType) {
    case 'bookings':
      navigateToBookings();
      break;
    case 'revenue':
      navigateToRevenue();
      break;
    default:
      break;
  }
};

<CounterCard 
  name="予約数" 
  count={150}
  todayCount={5}
  description="詳細を見る"
  onClick={() => handleCardClick('bookings')}
/>
```

---

## 🎯 プロパティ一覧

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `name` | `string` | **必須** | カードの名前/タイトル |
| `count` | `number` | **必須** | 表示するカウント値 |
| `todayCount` | `number` | - | 今日の増加数（オプション） |
| `description` | `string` | - | 説明文（オプション、最大2行） |
| `onClick` | `function` | - | クリック時のハンドラ関数（オプション） |
| `className` | `string` | `''` | 追加のCSSクラス |

---

## 🎨 スタイリング

### カスタムクラスの追加

```javascript
<CounterCard 
  name="予約数" 
  count={150}
  className="custom-counter-card"
/>
```

```css
.custom-counter-card {
  border: 2px solid var(--color-primary-main);
  background: linear-gradient(135deg, var(--color-background-card) 0%, var(--color-primary-background) 100%);
}
```

### グリッドレイアウトでの使用

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg-px);
}
```

---

## ♿ アクセシビリティ

CounterCardコンポーネントは、以下のアクセシビリティ機能を備えています：

- **キーボード操作**: `onClick`が設定されている場合、Tabキーでフォーカス、Enter/Spaceでクリック可能
- **フォーカス表示**: 明確なフォーカスインジケーター
- **ARIA属性**: `role="button"`を自動設定（クリック可能な場合）
- **ツールチップ**: `title`属性でフルテキストを表示

---

## 📱 レスポンシブ

モバイルデバイスでは、自動的にレイアウトが調整されます：

- **デスクトップ**: 標準レイアウト
- **タブレット**: パディングとフォントサイズが調整
- **モバイル**: ヘッダーが縦並び、フォントサイズが縮小

---

## 🔗 関連ドキュメント

- [デザインシステム](./design-system.md)
- [Buttonコンポーネント](./button-component-guide.md)
- [テーマ定義](../../src/constants/theme.ts)

---

**最終更新日**: 2026年2月8日
