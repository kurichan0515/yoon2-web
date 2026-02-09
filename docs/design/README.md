# デザインシステムドキュメント

yoon²ゆんゆんのWebアプリケーションで使用するデザインシステムのドキュメント集です。

## 📚 ドキュメント一覧

### 1. [デザインシステム](./design-system.md)
統一されたデザインシステムの詳細な仕様です。

**主な内容**:
- カラーパレット（プライマリ、セカンダリ、アクセント、ステータス）
- タイポグラフィ（見出し、本文、キャプション）
- スペーシングシステム
- レイアウト（ボーダー半径、シャドウ）
- 使用方法（TypeScript、CSS、React）

### 2. [Buttonコンポーネント使用ガイド](./button-component-guide.md)
統一されたButtonコンポーネントの使用方法ガイドです。

**主な内容**:
- 基本的な使用方法
- バリアント（primary, secondary, danger, success, warning）
- サイズ（small, medium, large）
- 状態（ローディング、無効）
- 使用例とベストプラクティス

### 2. [色感統一ガイド](../images/COLOR_HARMONY_GUIDE.md)
画像制作時の色感統一のためのガイドです。

**主な内容**:
- 既存のカラーパレット（ナチュラル・エレガント）
- 色の特徴と使用場所
- 画像に求められる色感

### 3. [デザインコンセプト](../images/DESIGN_CONCEPT_PROMPT.md)
デザインコンセプトの詳細な説明です。

**主な内容**:
- 現在のデザインコンセプト（ナチュラル・エレガント）
- 新しいデザインコンセプト（モダン・クール・エレガント）
- カラーパレット要件

---

## 🎨 デザインシステムの構成

### 実装ファイル

- **TypeScript定義**: `src/constants/theme.ts`
- **CSS変数**: `src/App.css` の `:root` セクション

### 使用方法

#### TypeScript/JavaScriptでの使用

```typescript
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from '../constants/theme';

const buttonStyle = {
  backgroundColor: COLORS.primary.main,
  color: '#FFFFFF',
  padding: `${SPACING.sm}px ${SPACING.md}px`,
  borderRadius: LAYOUT.borderRadius.md,
};
```

#### CSS変数での使用

```css
.button {
  background-color: var(--color-primary-main);
  color: #FFFFFF;
  padding: var(--spacing-sm-px) var(--spacing-md-px);
  border-radius: var(--border-radius-md-new);
}
```

---

## 🔄 既存デザインとの関係

現在のプロジェクトでは、2つのデザインシステムが併用されています：

### 1. 既存デザインシステム（ナチュラル・エレガント）
- **用途**: 一般ユーザー向けページ
- **カラー**: ベージュ、ゴールド系
- **CSS変数**: `--color-primary`, `--color-accent` など

### 2. 新しいデザインシステム（モダン・クール）
- **用途**: 管理画面、新しいコンポーネント
- **カラー**: ブルー、グリーン、オレンジ系
- **CSS変数**: `--color-primary-main`, `--color-status-success` など

### 統合方針

- **段階的な移行**: 新しいコンポーネントから新しいデザインシステムを適用
- **用途による使い分け**: ページの種類に応じて適切なデザインシステムを選択
- **将来的な統一**: 必要に応じて全体を統一

---

## 📝 更新履歴

- **2026年2月8日**: デザインシステムの追加
  - TypeScript定義ファイルの作成
  - CSS変数の追加
  - デザインシステムドキュメントの作成

---

**最終更新日**: 2026年2月8日
