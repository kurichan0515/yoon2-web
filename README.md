# yoon² ゆんゆん

松山市のイヤーエステ・耳つぼ専門サロン「yoon²」の公式ホームページ。

## 技術スタック

- **Next.js 15** (App Router, Static Export)
- **React 19** + **TypeScript 5** (strict)
- **DDD設計** (Domain-Driven Design)
- **Firebase** (Auth / Firestore / Hosting)
- **Tailwind CSS 3**
- **jest** + **ts-jest** (テスト)

## セットアップ

```bash
git clone <repository-url>
cd yoon2-web
npm install
cp env.example .env.local  # 環境変数を設定
npm run dev                 # http://localhost:3000
```

環境変数の詳細: [docs/setup/ENVIRONMENT_SETUP.md](docs/setup/ENVIRONMENT_SETUP.md)

## コマンド

```bash
npm run dev          # 開発サーバー
npm run build        # 本番ビルド (静的エクスポート)
npm test             # テスト (jest)
npm run typecheck    # 型チェック (tsc --noEmit)
```

## ルート構成

```
/              → ホーム (src/views/Home.tsx)
/sns           → SNS導線ページ (src/views/HomeSns.tsx)
/privacy       → プライバシーポリシー
/system/login  → 管理者ログイン
/system        → 管理者ダッシュボード (要認証)
/system/analytics → アナリティクス (要認証)
/system/settings  → 設定 (要認証)
```

## アーキテクチャ (DDD)

```
src/
├── domain/          # エンティティ・値オブジェクト・リポジトリIF
│   ├── course/      # Course, CourseCategory
│   ├── booking/     # Booking, TimeSlot, BookingSource, CustomerPriority
│   └── auth/        # Admin
├── application/     # ユースケース
│   ├── course/      # Create / GetAll / Update / Delete
│   └── booking/     # GetAvailableSlots / GetByDateRange / GetMonthlyStats
├── infrastructure/  # リポジトリ実装・DI
│   ├── firebase/    # FirebaseCourseRepository, FirebaseAdminRepository
│   ├── google/      # GoogleCalendarBookingRepository
│   ├── mock/        # MockCourseRepository (開発用)
│   └── container.ts # DI組み立て
├── views/           # ページコンポーネント
├── components/      # UIコンポーネント
├── services/        # 外部サービス (Analytics / Auth / GoogleAds)
├── config/          # appConfig.ts (店舗情報一元管理)
├── data/            # faqData.ts / menuData.ts (静的データ)
└── ...
```

詳細: [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)

## デプロイ

`main` ブランチに push → GitHub Actions が自動的に Firebase Hosting にデプロイ。

本番 URL: https://yoon2.com

## ドキュメント

[docs/README.md](docs/README.md) を参照。
