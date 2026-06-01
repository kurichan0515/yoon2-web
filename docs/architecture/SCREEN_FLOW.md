# yoon² 画面フロー設計書

## ルート一覧

```
yoon²
├── / ──────────────── ホーム (Home.tsx)
├── /sns ───────────── SNS導線ページ (HomeSns.tsx)
├── /privacy ───────── プライバシーポリシー (PrivacyPolicy.tsx)
└── /system
    ├── /system/login     管理者ログイン (AdminLogin.tsx)
    ├── /system           管理者ダッシュボード (AdminDashboard.tsx) ※要認証
    ├── /system/analytics アナリティクス (AnalyticsDashboard.tsx) ※要認証
    └── /system/settings  設定 (AdminSettings.tsx) ※要認証
```

## ユーザーフロー

### 一般ユーザー

```
/ (ホーム)
├── LINEで予約 → 外部 LINE
├── メニューを見る → #menu スクロール
├── /sns → SNS導線・LINEへの誘導
└── /privacy → プライバシーポリシー
```

### 管理者

```
/system/login
  → Firebase Auth 認証
  → 管理者ロール確認 (Firestore admins/{uid})
  → /system (ダッシュボード)
     ├── /system/analytics
     └── /system/settings
```

## ページ詳細

### / (ホーム) — `src/views/Home.tsx`
- Hero (LINE予約CTA + 耳つぼジュエリー価格バナー)
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
- Navbar / Hero / 口コミ / メニュー・料金 / FAQ / 店舗情報 / 予約CTA (LINE + Instagram)

### /system/* — 管理画面
- `AdminLayout` (AdminHeader + AdminSidebar) でラップ
- `PrivateRoute` で未認証リダイレクト → `/system/login`
- ダッシュボード: 外部リンク + 店舗情報表示
- アナリティクス: Firebase pageViews / events 集計
- 設定: 店舗情報フォーム

## レイアウト構成

```
公開ページ: PublicLayout  → PublicHeader + {children} + PublicFooter
管理画面:   AdminLayout   → AdminHeader + AdminSidebar + {children}
```

## 認証ガード (PrivateRoute)

```
loading中 → LoadingSpinner
未認証    → router.replace('/system/login')
非管理者  → UnauthorizedPage
管理者    → children 表示
```
