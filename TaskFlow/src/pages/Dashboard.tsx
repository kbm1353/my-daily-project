import { useEffect, useState } from "react";
import axios from "axios";

// データの「型」を定義する
interface Task {
  id: number;
  title: string;
  status: string;
}

const Dashboard = () => {
  // サーバーから受け取ったデータを保存するための領域（初期値は空の配列 []）
  const [tasks, setTasks] = useState<Task[]>([]);

  // 初回レンダリング時に実行される関数
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // ダミーサーバーのURLにデータをリクエストする
        const response = await axios.get("http://localhost:3001/tasks");
        setTasks(response.data); // 成功したらデータをtasksに保存する
      } catch (error) {
        console.error("データを取得できませんでした:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">タスクリスト</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            + タスク追加
          </button>
        </header>

        <div className="grid gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center"
              >
                <span className="font-medium text-slate-700">{task.title}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    task.status === "完了"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center py-10 text-slate-500">
              データを読み込み中...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
