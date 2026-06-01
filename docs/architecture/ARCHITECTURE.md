# yoon² アーキテクチャドキュメント

## 技術スタック

- **Next.js 15** (App Router) — フレームワーク
- **React 19** — UI
- **TypeScript 5** (strict: true) — 型安全
- **Firebase 12** — Auth / Firestore
- **Tailwind CSS 3** — ユーティリティCSS
- **jest + ts-jest** — テスト

## アーキテクチャ: DDD (Domain-Driven Design)

```
src/
├── domain/              # ドメイン層 — ビジネスルール
│   ├── course/          # Course Entity / CourseCategory VO / ICourseRepository
│   ├── booking/         # Booking Entity / TimeSlot・BookingSource・CustomerPriority VO / IBookingRepository
│   └── auth/            # Admin Entity / IAdminRepository
│
├── application/         # アプリケーション層 — ユースケース
│   ├── course/          # CreateCourse / GetAllCourses / UpdateCourse / DeleteCourse
│   └── booking/         # GetAvailableSlots / GetBookingsByDateRange / GetMonthlyStats
│
├── infrastructure/      # インフラ層 — 外部依存の実装
│   ├── firebase/        # FirebaseCourseRepository / FirebaseAdminRepository
│   ├── google/          # GoogleCalendarBookingRepository
│   ├── mock/            # MockCourseRepository (開発用)
│   └── container.ts     # DI組み立て
│
├── services/            # @deprecated 互換ラッパー (将来削除予定)
│   ├── courseService.ts     → application/course/ UseCase に委譲
│   ├── calendarService.ts   → application/booking/ UseCase に委譲
│   ├── authService.ts       → Firebase Auth直接使用
│   ├── analyticsService.ts  → Firebase / gtag
│   └── googleAdsService.ts  → gtag
│
├── views/               # プレゼンテーション層 — ページコンポーネント
├── components/          # UIコンポーネント
├── layouts/             # レイアウト
├── contexts/            # AuthContext
├── hooks/               # useAuth
├── config/              # appConfig.ts — 店舗設定一元管理
├── data/                # faqData.ts / menuData.ts — 静的データ
├── types/               # global.d.ts / gapi.d.ts 等
└── utils/               # logger / validation / seoHelper 等
```

## ルーティング (Next.js App Router)

```
app/
├── page.tsx               → / (ホーム)
├── sns/page.tsx           → /sns (SNS導線ページ)
├── privacy/page.tsx       → /privacy (プライバシーポリシー)
└── system/
    ├── page.tsx           → /system (管理者ダッシュボード) ※要認証
    ├── login/page.tsx     → /system/login
    ├── analytics/page.tsx → /system/analytics ※要認証
    └── settings/page.tsx  → /system/settings ※要認証
```

## データフロー

```
UI Component
  → UseCase (application/)
    → Repository Interface (domain/)
      → Repository Implementation (infrastructure/)
        → Firebase / Google Calendar API
```

## 認証

- Firebase Authentication (メール/パスワード)
- `AuthContext` + `useAuth` フックで状態共有
- `PrivateRoute` コンポーネントで管理画面保護
- Firestore `admins/{uid}` で管理者ロール確認

## 設定管理

`src/config/appConfig.ts` — 店舗情報・SNS・AdSense・Google Ads を一元管理。  
環境変数 (`NEXT_PUBLIC_*`) から Firebase・API Key 等を取得。

## デプロイ

- **ホスティング**: Firebase Hosting
- **CI/CD**: GitHub Actions (main ブランチ push → 自動デプロイ)

## テスト

```bash
npm test              # jest (17テスト)
npm run test:coverage # カバレッジ付き
npx tsc --noEmit      # 型チェック
```

- `jest.config.ts` — ts-jest + jsdom
- `tsconfig.test.json` — テスト専用TSコンフィグ
- `__mocks__/` — firebase / next/navigation / next/link モック
