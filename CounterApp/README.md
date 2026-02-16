# 🚀 React Step-by-Step: 開発習得ログ

このリポジトリは、React プロフェッショナルを目指すための日々の学習記録とプロジェクトをまとめたものです。単なるコーディングにとどまらず、ベストプラクティスの追求とコンポーネント設計の理解に重点を置いています。

---

## Simple Counter App

### プロジェクトの目的

- React の状態管理(State Management)の基礎習得
- コンポーネント間のデータフロー（Props）の構造的理解

### 技術的ポイント

- **State Lifting (状態の引き上げ)**:
  `Viewer` と `Controller` で共有する状態を親コンポーネント(`App`)で管理し、単一方向データフローを維持。
- **Props の活用**:
  関数を子コンポーネントに Props として渡し、子からのイベントで親の状態を更新するパターンを実装。

### 使用技術

- React / Vite
- CSS Modules (スタイリング)

### 今後の改善点

- `useEffect` を利用した値の変化の追跡
- `useCallback` によるパフォーマンス最適化の検討

---

## 構成 (Structure)

- `CounterApp`: useState / Props 基礎
- `TodoList`: (予定) CRUD 実装と配列の状態管理
