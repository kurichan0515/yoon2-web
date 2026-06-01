# 開発ガイド

## 技術スタック

- Next.js 15 (App Router) + TypeScript 5 (strict)
- DDD設計 (domain/application/infrastructure)
- Firebase (Auth / Firestore)
- Tailwind CSS
- jest + ts-jest

## 開発環境

```bash
npm run dev       # 開発サーバー (http://localhost:3000)
npm run build     # 本番ビルド
npm test          # jest テスト
npx tsc --noEmit  # 型チェック
npm run lint      # ESLint (next/core-web-vitals)
```

## ブランチ戦略

```bash
git checkout -b feature/xxx   # 機能追加
git checkout -b fix/xxx       # バグ修正
git checkout -b chore/xxx     # 設定・依存関係
# main に merge → GitHub Actions が自動デプロイ
```

## コミット規約 (Conventional Commits)

```
feat:     新機能
fix:      バグ修正
refactor: リファクタリング
chore:    設定・依存関係・ビルド
docs:     ドキュメント
test:     テスト追加・修正
perf:     パフォーマンス改善
```

## アーキテクチャ規約

### 新機能の追加手順

1. `src/domain/` にエンティティ・VOを定義
2. `src/application/` にユースケースを作成
3. `src/infrastructure/` にリポジトリ実装
4. `src/infrastructure/container.ts` でDI
5. views/components からユースケースを呼ぶ

### 既存互換ラッパー (deprecated)

`src/services/` の各サービスは互換ラッパー。新規コードは直接ユースケースを使う。

```typescript
// ❌ 旧
import courseService from '../services/courseService';
await courseService.getAllCourses();

// ✅ 新
import { courseUseCases } from '../infrastructure/container';
await courseUseCases.getAll.execute();
```

## コンポーネント設計規約

```typescript
// ✅ TypeScript + props 型定義
interface Props {
  title: string;
  onClick?: () => void;
}

const Component = ({ title, onClick }: Props) => {
  return <div onClick={onClick}>{title}</div>;
};

export default Component;
```

- `'use client'` は必要な場合のみ（hooks・イベントハンドラを使うとき）
- CSS は同名 `.css` ファイルをインポート
- 対応する CSS ファイルがある場合は必ず import する

## ファイル構成

```
src/
├── domain/          # ビジネスロジック (外部依存なし)
├── application/     # ユースケース
├── infrastructure/  # 外部サービス実装
├── views/           # ページコンポーネント
├── components/      # 共通UIコンポーネント
│   ├── common/      # 汎用コンポーネント
│   ├── public/      # 公開ページ用
│   └── admin/       # 管理画面用
├── layouts/         # レイアウトコンポーネント
├── contexts/        # React Context
├── hooks/           # カスタムhooks
├── config/          # appConfig.ts
├── data/            # 静的データ
├── services/        # @deprecated 互換ラッパー
├── types/           # 型定義・宣言ファイル
└── utils/           # ユーティリティ
```

## テスト

```bash
npm test                          # 全テスト実行
npm test -- --testPathPattern=Header  # 特定ファイル
npm run test:coverage             # カバレッジ
```

- テストファイル: `*.test.tsx` を `src/` 以下に配置
- Firebase / next/navigation は `__mocks__/` でモック済み
- グローバル設定: `src/setupTests.ts`

## 設定変更

店舗情報・メニュー・SNS設定: `src/config/appConfig.ts` を直接編集。  
環境変数: `.env.local` (本番は GitHub Secrets 経由)。

## VSCode 推奨拡張機能

- `esbenp.prettier-vscode`
- `dbaeumer.vscode-eslint`
- `bradlc.vscode-tailwindcss`
- `firebase.vscode-firebase-explorer`
