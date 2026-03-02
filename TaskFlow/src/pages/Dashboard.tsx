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

  const deleteTask = async (id: number) => {
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      // サーバーで該当IDのデータを削除
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      // 自分の画面でも該当IDだけを除いて再度リストを作成
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      alert("削除に失敗しました！");
    }
  };

  // 状態変更関数（PUT/PATCH）
  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === "進行中" ? "完了" : "進行中";

    try {
      // サーバーのデータを修正（該当IDのstatusのみ変更）
      await axios.patch(`http://localhost:3001/tasks/${task.id}`, {
        status: newStatus,
      });
      // 画面でも状態を更新
      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)),
      );
    } catch (error) {
      alert("状態変更に失敗しました！");
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
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center group transition-all hover:border-blue-300"
            >
              <div className="flex items-center gap-3">
                {/* 状態変更チェックボックスの役割のボタン */}
                <button
                  onClick={() => toggleStatus(task)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.status === "完了"
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-slate-300 hover:border-blue-500"
                  }`}
                >
                  {task.status === "完了" && "✓"}
                </button>

                <span
                  className={`font-medium transition-all ${
                    task.status === "完了"
                      ? "text-slate-400 line-through"
                      : "text-slate-700"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              {/* 削除ボタン - 普段は透明で、マウスを乗せると(group-hover)表示 */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
