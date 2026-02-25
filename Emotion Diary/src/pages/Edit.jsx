import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);
  usePageTitle(`${params.id}日記件を編集`);

  const onClickDelete = () => {
    if (
      window.confirm("日記を本当に削除しますか？一度削除すると復元できません！")
    ); // ブラウザの組み込み機能を使用、引数 = ポップアップに表示するメッセージ
    {
      // 日記削除ロジック
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("日記を本当に編集しますか？")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content,
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"日記を編集する"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 戻る"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"削除"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
