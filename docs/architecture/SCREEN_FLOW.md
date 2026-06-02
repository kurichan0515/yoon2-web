# yoon² 画面フロー設計書

## ルート一覧

```
/         → ホーム (Home.tsx)
/sns      → SNS導線ページ (HomeSns.tsx)
/privacy  → プライバシーポリシー (PrivacyPolicy.tsx)
```

## ユーザーフロー

```
/ (ホーム)
├── LINEで予約 → 外部 LINE
├── メニューを見る → #menu スクロール
├── /sns → SNS導線・LINEへの誘導
└── /privacy → プライバシーポリシー
```

## ページ詳細

### / (ホーム) — `src/views/Home.tsx`
- Hero (LINE予約CTA + 耳つぼジュエリー価格バナー + 口コミバッジ)
- ConcernSection — お悩みリスト
- MenuDiagnosis — メニュー診断
- FlowSection — 施術の流れ
- ReviewsSection — 口コミ (ホットペッパービューティー)
- MenuSection — メニュー・料金 (カテゴリタブ切り替え)
- FAQ — よくある質問
- SocialFeed — Instagram誘導
- 店舗情報 + Googleマップ embed + 駐車場写真
- 営業時間 + 予約CTA

### /sns — `src/views/HomeSns.tsx`
- SNS流入向けダークテーマデザイン
- Navbar / Hero / 口コミ / メニュー・料金 (FAQ含む) / 店舗情報 / 予約CTA (LINE + Instagram)

### /privacy — `src/views/PrivacyPolicy.tsx`
- プライバシーポリシー文書

## レイアウト

```
全ページ: PublicLayout → PublicHeader + {children} + PublicFooter
```
