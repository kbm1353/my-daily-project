import "./DiaryItem.css";
import Button from "./Button";

const DiaryItem = () => {
  return (
    <div className="DiaryItem">
      <div className="button_section">
        <Button text={"修正する"} />
      </div>
    </div>
  );
};

export default DiaryItem;
