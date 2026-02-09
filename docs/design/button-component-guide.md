# Buttonコンポーネント使用ガイド

**対象**: yoon²ゆんゆん Webアプリケーション  
**作成日**: 2026年2月8日

---

## 📋 概要

統一されたデザインシステムに基づいたButtonコンポーネントです。アプリケーション全体で一貫性のあるボタンUIを提供します。

---

## 🚀 基本的な使用方法

### インポート

```javascript
import Button from '../components/common/Button';
```

### 基本的な使用例

```javascript
// プライマリボタン
<Button 
  title="送信" 
  onClick={handleSubmit} 
/>

// セカンダリボタン
<Button 
  title="キャンセル" 
  onClick={handleCancel}
  variant="secondary"
/>

// 危険ボタン（削除など）
<Button 
  title="削除" 
  onClick={handleDelete}
  variant="danger"
/>
```

---

## 🎨 バリアント（種類）

### Primary（プライマリ）

メインのアクションに使用します。

```javascript
<Button 
  title="予約する" 
  onClick={handleBooking}
  variant="primary"
/>
```

**スタイル**:
- 背景色: ブルー（`#2196F3`）
- テキスト色: 白
- 用途: 主要なアクション（送信、予約、確定など）

### Secondary（セカンダリ）

補助的なアクションに使用します。

```javascript
<Button 
  title="キャンセル" 
  onClick={handleCancel}
  variant="secondary"
/>
```

**スタイル**:
- 背景色: 白
- テキスト色: ブルー（`#2196F3`）
- ボーダー: ブルー
- 用途: 補助的なアクション（キャンセル、戻るなど）

### Danger（危険）

削除や危険な操作に使用します。

```javascript
<Button 
  title="削除" 
  onClick={handleDelete}
  variant="danger"
/>
```

**スタイル**:
- 背景色: 白
- テキスト色: 赤（`#F44336`）
- ボーダー: 赤
- 用途: 削除、危険な操作

### Success（成功）

成功状態や確認に使用します。

```javascript
<Button 
  title="確定" 
  onClick={handleConfirm}
  variant="success"
/>
```

**スタイル**:
- 背景色: 緑（`#4CAF50`）
- テキスト色: 白
- 用途: 確定、完了、成功状態

### Warning（警告）

警告や注意喚起に使用します。

```javascript
<Button 
  title="警告" 
  onClick={handleWarning}
  variant="warning"
/>
```

**スタイル**:
- 背景色: オレンジ（`#FF9800`）
- テキスト色: 白
- 用途: 警告、注意喚起

---

## 📏 サイズ

### Small（小）

小さなボタンやインライン要素に使用します。

```javascript
<Button 
  title="詳細" 
  onClick={handleDetail}
  size="small"
/>
```

**スタイル**:
- パディング: 8px 12px
- フォントサイズ: 12px
- 最小高さ: 36px

### Medium（中）- デフォルト

一般的な用途に使用します。

```javascript
<Button 
  title="送信" 
  onClick={handleSubmit}
  size="medium" // または省略可能
/>
```

**スタイル**:
- パディング: 16px 24px
- フォントサイズ: 16px
- 最小高さ: 48px

### Large（大）

重要なアクションや目立たせたいボタンに使用します。

```javascript
<Button 
  title="予約する" 
  onClick={handleBooking}
  size="large"
/>
```

**スタイル**:
- パディング: 24px 32px
- フォントサイズ: 18px
- 最小高さ: 56px

---

## 🔄 状態

### ローディング状態

非同期処理中にローディングスピナーを表示します。

```javascript
<Button 
  title="送信" 
  onClick={handleSubmit}
  isLoading={isSubmitting}
/>
```

### 無効状態

操作できない状態を表現します。

```javascript
<Button 
  title="送信" 
  onClick={handleSubmit}
  disabled={!isValid}
/>
```

### ローディング + 無効の組み合わせ

```javascript
<Button 
  title="送信" 
  onClick={handleSubmit}
  isLoading={isSubmitting}
  disabled={!isValid}
/>
```

---

## 📐 レイアウト

### フル幅

ボタンを親要素の幅いっぱいに広げます。

```javascript
<Button 
  title="送信" 
  onClick={handleSubmit}
  fullWidth={true}
/>
```

---

## 💡 使用例

### フォーム送信

```javascript
const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    await submitForm();
  } finally {
    setIsSubmitting(false);
  }
};

<Button 
  title="予約を確定する" 
  onClick={handleSubmit}
  variant="primary"
  isLoading={isSubmitting}
  disabled={!isFormValid}
  type="submit"
/>
```

### 確認ダイアログ

```javascript
const handleDelete = () => {
  if (window.confirm('本当に削除しますか？')) {
    deleteItem();
  }
};

<div className="button-group">
  <Button 
    title="キャンセル" 
    onClick={handleCancel}
    variant="secondary"
  />
  <Button 
    title="削除" 
    onClick={handleDelete}
    variant="danger"
  />
</div>
```

### モーダルフッター

```javascript
<div className="modal-footer">
  <Button 
    title="キャンセル" 
    onClick={handleClose}
    variant="secondary"
    size="medium"
  />
  <Button 
    title="保存" 
    onClick={handleSave}
    variant="primary"
    size="medium"
    isLoading={isSaving}
  />
</div>
```

---

## 🎯 プロパティ一覧

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `title` | `string` | **必須** | ボタンに表示するテキスト |
| `onClick` | `function` | - | クリック時のハンドラ関数 |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'success' \| 'warning'` | `'primary'` | ボタンのバリアント |
| `isLoading` | `boolean` | `false` | ローディング状態 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | ボタンのタイプ |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | ボタンのサイズ |
| `fullWidth` | `boolean` | `false` | フル幅表示 |
| `className` | `string` | `''` | 追加のCSSクラス |

---

## 🎨 スタイリング

### カスタムクラスの追加

```javascript
<Button 
  title="送信" 
  onClick={handleSubmit}
  className="custom-button"
/>
```

```css
.custom-button {
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}
```

### インラインスタイル

```javascript
<Button 
  title="送信" 
  onClick={handleSubmit}
  style={{ marginTop: '20px' }}
/>
```

---

## ♿ アクセシビリティ

Buttonコンポーネントは、以下のアクセシビリティ機能を備えています：

- **キーボード操作**: Tabキーでフォーカス、Enter/Spaceでクリック
- **フォーカス表示**: 明確なフォーカスインジケーター
- **ARIA属性**: `aria-busy`, `aria-disabled` を自動設定
- **最小サイズ**: タッチターゲットが48px以上

---

## 📱 レスポンシブ

モバイルデバイスでは、自動的にサイズが調整されます：

- **デスクトップ**: 標準サイズ
- **タブレット**: 標準サイズ
- **モバイル**: パディングが調整され、最小幅が100pxに設定

---

## 🔗 関連ドキュメント

- [デザインシステム](./design-system.md)
- [テーマ定義](../../src/constants/theme.ts)

---

**最終更新日**: 2026年2月8日
