# yoon² アーキテクチャドキュメント

## 技術スタック

- **Next.js 15** (App Router, Static Export) — フレームワーク
- **React 19** — UI
- **TypeScript 5** (strict: true, noUncheckedIndexedAccess) — 型安全
- **Firebase 12** — Auth / Firestore / Hosting
- **Tailwind CSS 3** — ユーティリティCSS
- **jest + ts-jest** — テスト (17テスト)

## アーキテクチャ: DDD (Domain-Driven Design)

```
src/
├── domain/              # ドメイン層 — ビジネスルール (外部依存なし)
│   ├── course/
│   │   ├── Course.ts           # エンティティ (バリデーション含む)
│   │   ├── CourseCategory.ts   # 値オブジェクト
│   │   └── ICourseRepository.ts
│   ├── booking/
│   │   ├── Booking.ts          # エンティティ
│   │   ├── TimeSlot.ts         # 値オブジェクト
│   │   ├── BookingSource.ts    # 値オブジェクト
│   │   ├── CustomerPriority.ts # 値オブジェクト
│   │   └── IBookingRepository.ts
│   └── auth/
│       ├── Admin.ts            # エンティティ
│       └── IAdminRepository.ts
│
├── application/         # アプリケーション層 — ユースケース
│   ├── course/
│   │   ├── CreateCourseUseCase.ts
│   │   ├── GetAllCoursesUseCase.ts
│   │   ├── UpdateCourseUseCase.ts
│   │   └── DeleteCourseUseCase.ts
│   └── booking/
│       ├── GetAvailableSlotsUseCase.ts
│       ├── GetBookingsByDateRangeUseCase.ts
│       └── GetMonthlyStatsUseCase.ts
│
├── infrastructure/      # インフラ層 — 外部依存の実装
│   ├── firebase/
│   │   ├── FirebaseCourseRepository.ts
│   │   └── FirebaseAdminRepository.ts
│   ├── google/
│   │   └── GoogleCalendarBookingRepository.ts
│   ├── mock/
│   │   └── MockCourseRepository.ts  # 開発用 (Firebase未初期化時フォールバック)
│   └── container.ts     # DI組み立て (courseUseCases / bookingUseCases)
│
├── services/            # 外部サービス連携 (deprecated ではない)
│   ├── analyticsService.ts  # Firebase Firestore + GA4 + Google Ads
│   ├── authService.ts       # Firebase Auth ラッパー
│   └── googleAdsService.ts  # Google Ads コンバージョン送信
│
├── views/               # プレゼンテーション層 — ページコンポーネント
│   ├── Home.tsx / HomeSns.tsx / HomeNew.tsx
│   ├── Booking.tsx / BookingConfirmation.tsx
│   ├── PrivacyPolicy.tsx / MainScreen.tsx
│   ├── AdminDashboard.tsx / AdminLogin.tsx
│   └── admin/AdminSettings.tsx / common/UnauthorizedPage.tsx
│
├── components/          # UIコンポーネント
│   ├── common/          # Button, LoadingSpinner, ErrorBoundary 等
│   ├── public/          # PublicHeader, PublicFooter
│   ├── admin/           # AdminSidebar
│   └── (ページ固有コンポーネント群)
│
├── layouts/             # AdminLayout / PublicLayout
├── contexts/            # AuthContext
├── hooks/               # useAuth
├── config/              # appConfig.ts — 店舗設定一元管理
├── data/                # faqData.ts / menuData.ts — 静的データ
├── firebase/            # Firebase 初期化 (config.ts / fallback.ts)
├── types/               # global.d.ts / gapi.d.ts 等
└── utils/               # logger / validation / seoHelper 等
```

## ルーティング (Next.js App Router)

```
app/
├── page.tsx               → / (ホーム)
├── sns/page.tsx           → /sns (SNS導線ページ)
├── privacy/page.tsx       → /privacy
└── system/
    ├── page.tsx           → /system (管理者ダッシュボード) ※要認証
    ├── login/page.tsx     → /system/login
    ├── analytics/page.tsx → /system/analytics ※要認証
    └── settings/page.tsx  → /system/settings ※要認証
```

## データフロー

```
UI Component / View
  ↓
UseCase (application/)
  ↓
Repository Interface (domain/)
  ↓
Repository Implementation (infrastructure/)
  ↓
Firebase Firestore / Google Calendar API
```

## DI (Dependency Injection)

`src/infrastructure/container.ts` で組み立て:

```typescript
// Course: クライアント側でFirebase利用可能な場合はFirebaseCourseRepository
//         それ以外はMockCourseRepository (SSR / 未初期化時フォールバック)
export const courseUseCases = { getAll, create, update, delete };

// Booking: GoogleCalendarBookingRepository (Google Calendar API)
export const bookingUseCases = { getByDateRange, getAvailableSlots, getMonthlyStats };
```

## 認証

- Firebase Authentication (メール/パスワード)
- `AuthContext` + `useAuth` フックで状態共有
- `PrivateRoute` で管理画面保護 → 未認証は `/system/login` にリダイレクト
- Firestore `admins/{uid}` で管理者ロール確認

## 設定管理

`src/config/appConfig.ts` — 店舗情報・SNS・AdSense・Google Ads を一元管理。  
環境変数 (`NEXT_PUBLIC_*`) から Firebase・API Key 等を取得。

## デプロイ

- **ホスティング**: Firebase Hosting (`output: 'export'` 静的エクスポート)
- **CI/CD**: GitHub Actions → main push で自動デプロイ

## テスト

```bash
npm test              # jest (17テスト)
npm run test:coverage # カバレッジ付き
npm run typecheck     # tsc --noEmit
```

- `jest.config.ts` — ts-jest + jsdom
- `tsconfig.test.json` — テスト専用 TS コンフィグ
- `__mocks__/` — firebase / next/navigation / next/link モック
- `src/setupTests.ts` — IntersectionObserver / scrollTo / matchMedia グローバルモック
