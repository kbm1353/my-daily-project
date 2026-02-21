Todo List App (Optimization & Global State)
プロジェクトの目的
useReducer を活用した複雑な状態管理ロジックの分離・集約

Context API によるプロパティ・ドリリング(Prop Drilling)の解消

useMemo と useCallback を組み合わせたレンダリングパフォーマンスの極大化

技術的ポイント
Context の分割設計 (State & Dispatch):
TodoStateContext（データ）と TodoDispatchContext（関数）を分離。データが更新されても、関数のみを参照するコンポーネント（Editorなど）の不要な再レンダリングを完全に防止。

useReducer による宣言的UIの実装:
状態遷移（追加・修正・削除）を reducer 関数に一括管理させ、App コンポーネントをクリーンに保ちつつ、デバッグのしやすい構造を構築。

Memoization (メモ化) の徹底:
useMemo で Dispatch オブジェクトをキャッシュし、useCallback で関数を永続化。さらに子コンポーネントを React.memo で保護することで、React の最適化ベストプラクティスを実装。

使用技術
React / Vite

useReducer, createContext (Context API)

useCallback, useMemo, React.memo

今後の改善点
localStorage を利用したデータの永続化

React Context の代わりに Zustand や Recoil などの状態管理ライブラリとの比較検討