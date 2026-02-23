import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

const DiaryList = () => {
  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select>
          <option>最新順</option>
          <option>古い順</option>
        </select>
        <Button text={"新しい日記を書く"} type={"POSITIVE"} />
      </div>
      <div className="list_wrapper"></div>
    </div>
  );
};

export default DiaryList;
