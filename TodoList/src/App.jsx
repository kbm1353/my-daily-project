import "./App.css";
import { useState, useRef, useReducer, useCallback } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

// 仮データ生成
const mockData = [
  {
    id: 0,
    inDone: false,
    content: "React 勉強",
    date: new Date().getTime(),
  },
  {
    id: 1,
    inDone: false,
    content: "部屋の掃除",
    date: new Date().getTime(),
  },
  {
    id: 2,
    inDone: false,
    content: "散歩",
    date: new Date().getTime(),
  },
];

// reducer: 実際に状態をどのように変更するかを定義した関数。dispatch が呼び出されると、React がこの関数を実行する。
function reducer(state, action) {
  // state: 現在の todos の値
  // action: dispatch から送られたオブジェクト

  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];

    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item,
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData);
  // useReducer → 状態管理ロジックをコンポーネントの外部に分離するときに使う
  // todos: 現在の状態（データ）の値
  // dispatch: 状態を変更してほしいとリクエストする関数。この関数を実行するときに action オブジェクトを引数として渡す

  const idRef = useRef(3); // id値が変更されたときに不要なレンダリングを防ぐために、Refを使用

  // const onCreate = (content) => {
  //   const newTodo = {
  //     id: idRef.current++,
  //     isDone: false,
  //     content: content,
  //     date: new Date().getTime(),
  //   };

  //   setTodos([newTodo, ...todos]);
  // };

  // useCallback → 関数は最初の1回だけ作って、次からは作ったものをそのまま再利用する
  // 1つ目の引数 = 実行を防ぎたい関数
  // 2つ目の引数 = 依存配列、空であれば、この関数は絶対に再生成しないという意味
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  // const onUpdate = (targetId) => {
  //   // todosステートの値の中で
  //   // targetIdと一致するidを持つtodo itemのisDoneを変更する

  //   // 引数：todos配列の中で、targetIdと一致するidを持つ要素のデータだけを変更した新しい配列
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
  //     ),
  //   );
  // };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  // const onDelete = (targetId) => {
  //   // 引数：Todos配列の中で、TargetIdと一致するidを持つ要素のみを削除した新しい配列
  //   setTodos(todos.filter((todo) => todo.id !== targetId));
  // };

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
