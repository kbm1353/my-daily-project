import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import getStringedDate from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();
  usePageTitle(`${params.id}件の日記`);

  const curDiaryItem = useDiary(params.id);

  if (!curDiaryItem) {
    return <div>データ読み込み中...!</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 記録`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 戻る"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"編集"} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
