# QRコード実装ガイド

## 概要
yoon²ゆんゆん のホームページに公式LINEと公式InstagramのQRコードセクションを追加しました。

## 現在の状態
- QRコードセクションが実装されています
- プレースホルダー画像が表示されています
- 正しいリンク先URLが設定されています

## 実際のQRコード画像に置き換える方法

### 1. QRコード画像を準備
以下の形式で QRコード画像を準備してください：
- **LINE QRコード**: `line-qr.png` または `line-qr.jpg`
- **Instagram QRコード**: `instagram-qr.png` または `instagram-qr.jpg`
- 推奨サイズ: 300x300px 以上
- ファイル形式: PNG, JPG, SVG

### 2. 画像ファイルの配置
```
public/
  images/
    line-qr.png
    instagram-qr.png
```

### 3. コードの更新
`src/components/QRCodes.js` ファイルの以下の部分を更新：

```javascript
// 現在（プレースホルダー）
<img src={generateQRPlaceholder('LINE', '#00c300')} alt="LINE QRコード" />

// 更新後（実際の画像）
<img src="/images/line-qr.png" alt="LINE QRコード" />
```

```javascript
// 現在（プレースホルダー）
<img src={generateQRPlaceholder('IG', '#ff6347')} alt="Instagram QRコード" />

// 更新後（実際の画像）
<img src="/images/instagram-qr.png" alt="Instagram QRコード" />
```

## 設定済み内容

### SNSリンク
- **LINE**: https://lin.ee/lyyKSqu
- **Instagram**: https://www.instagram.com/yoo.n.yoo.n

### QRコードセクション機能
- ✅ 美しいデザインのQRコード表示エリア
- ✅ ホバーエフェクトとアニメーション
- ✅ モバイル対応のレスポンシブデザイン
- ✅ 直接リンクボタン
- ✅ 使用方法の説明
- ✅ お電話でのお問い合わせについての注意書き

### レスポンシブ対応
- デスクトップ: 2カラムレイアウト
- タブレット: 2カラムレイアウト
- モバイル: 1カラムレイアウト

## 今後の改善案
1. 実際のQRコード画像への置き換え
2. QRコード読み取り成功時のアニメーション
3. QRコードの説明文の詳細化
4. アクセス解析の追加

## 問い合わせ
QRコード画像の準備や実装でご不明な点がございましたら、お気軽にお問い合わせください。

