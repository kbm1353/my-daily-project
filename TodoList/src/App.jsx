import "./App.css";
import { useState, useRef } from "react";
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

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3); // id値が変更されたときに不要なレンダリングを防ぐために、Refを使用

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId) => {
    // todosステートの値の中で
    // targetIdと一致するidを持つtodo itemのisDoneを変更する

    // 引数：todos配列の中で、targetIdと一致するidを持つ要素のデータだけを変更した新しい配列
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  const onDelete = (targetId) => {
    // 引数：Todos配列の中で、TargetIdと一致するidを持つ要素のみを削除した新しい配列
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
