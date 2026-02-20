import "./List.css";
import TodoItem from "./TodoItem";
import { useContext, useMemo, useState } from "react";
import { TodoStateContext } from "../App";

const List = () => {
  const todos = useContext(TodoStateContext);
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilterdData = () => {
    if (search === "") {
      return todos;
    }

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const filterdTodos = getFilterdData();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  });

  return (
    <div className="List">
      <h4>Todo List🌱</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="検索語を入力してください"
      />
      <div className="todos_wrapper">
        {filterdTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
