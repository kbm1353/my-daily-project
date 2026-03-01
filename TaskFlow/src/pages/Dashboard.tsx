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
  const [newTask, setNewTask] = useState(""); // 入力欄に入力した文字の保存

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

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTask.trim()) return; // 空欄の場合は何もしない

    try {
      // 1. サーバー（JSON Server）にデータを送信（POST）
      const response = await axios.post("http://localhost:3001/tasks", {
        title: newTask,
        status: "進行中", // デフォルト値は「進行中」に設定
      });

      // 2. サーバーに保存されたデータを画面のリストにもすぐ反映
      setTasks([...tasks, response.data]);

      // 3. 入力欄を空にする
      setNewTask("");
    } catch (error) {
      alert("登録に失敗しました！");
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <form onSubmit={addTask} className="mb-8 flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="新しいタスクを入力してください"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              追加
            </button>
          </form>
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
