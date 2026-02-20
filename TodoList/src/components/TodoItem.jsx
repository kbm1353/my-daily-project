import "./TodoItem.css";
import { useState, memo, useContext } from "react";
import { TodoDispathContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispathContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>削除</button>
    </div>
  );
};

export default memo(TodoItem);
