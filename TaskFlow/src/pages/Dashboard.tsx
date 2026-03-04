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
  const [searchTerm, setSearchTerm] = useState(""); // 検索ワードを保存
  const [filterStatus, setFilterStatus] = useState("全て"); // フィルター状態（全て/進行中/完了）
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // 編集モードに入る
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  // 編集キャンセル
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  // 編集保存（PATCH）
  const saveEdit = async (id: number) => {
    if (!editTitle.trim()) return;
    try {
      await axios.patch(`http://localhost:3001/tasks/${id}`, {
        title: editTitle,
      });
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, title: editTitle } : t)),
      );
      setEditingId(null);
    } catch (error) {
      alert("修正に失敗しました。");
    }
  };

  // データフィルタリングロジック（タイプミスおよびロジック修正）
  const filteredTasks = tasks.filter((task) => {
    // 1. 検索ワードのチェック: タスクのタイトルに検索ワードが含まれているか？
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // 2. ステータスのチェック: 現在のフィルターが「全て」か、タスクのステータスとフィルターが一致するか？
    const matchesStatus =
      filterStatus === "全て" || task.status === filterStatus;

    return matchesSearch && matchesStatus; // // 両方とも一致する場合のみ画面に表示
  });

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

  // タスク追加
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

  // タスク削除
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
    <div className="bg-slate-50 min-h-screen p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">
        {/* 1. ヘッダー */}
        <header className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-black text-blue-600 tracking-tighter">
            TaskFlow
          </h1>
          <button
            onClick={() => {
              if (window.confirm("ログアウトしますか？"))
                alert("ログアウトしました");
            }}
            className="text-slate-400 hover:text-red-500 font-medium text-sm transition-colors"
          >
            Logout
          </button>
        </header>

        {/* 2. コントロールエリア */}
        <div className="flex flex-col gap-6 w-full">
          {/* タスク追加フォーム */}
          <form onSubmit={addTask} className="flex gap-3 w-full">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="新しいタスクを入力してください"
              className="flex-1 px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm transition-all"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 text-lg font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
            >
              追加
            </button>
          </form>

          {/* 検索 & フィルターバー */}
          <div className="flex flex-row items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 w-full">
            <div className="flex-1 w-full relative">
              <input
                type="text"
                placeholder="タスク名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 text-base rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              />
            </div>

            <div className="flex bg-slate-100 p-1.5 rounded-xl shrink-0 gap-1">
              {["全て", "進行中", "完了"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    filterStatus === status
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. タスクリストエリア */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-end w-full px-2">
            <h2 className="text-2xl font-bold text-slate-800">Task List</h2>
            <span className="text-sm text-slate-400 font-medium">
              合計: {filteredTasks.length}件
            </span>
          </div>

          <div className="flex flex-col gap-3 w-full">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center group hover:border-blue-200 transition-all w-full"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* ステータス切替ボタン */}
                    <button
                      onClick={() => toggleStatus(task)}
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        task.status === "完了"
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      {task.status === "完了" && "✓"}
                    </button>

                    {/* 編集モードかどうかの条件分岐 */}
                    {editingId === task.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 px-3 py-1 border-b-2 border-blue-500 outline-none bg-blue-50/50 font-semibold text-lg"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`font-semibold text-lg transition-all ${
                          task.status === "完了"
                            ? "text-slate-300 line-through"
                            : "text-slate-700"
                        }`}
                      >
                        {task.title}
                      </span>
                    )}
                  </div>

                  {/* 右側のボタンエリア */}
                  <div className="flex items-center gap-2 ml-4">
                    {editingId === task.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(task.id)}
                          className="text-blue-600 font-bold text-sm hover:bg-blue-50 px-3 py-2 rounded-xl transition-colors"
                        >
                          保存
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-slate-400 font-bold text-sm hover:bg-slate-50 px-3 py-2 rounded-xl transition-colors"
                        >
                          キャンセル
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(task)}
                          className="text-slate-300 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-blue-50 rounded-xl text-sm font-bold"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-xl text-sm font-bold"
                        >
                          削除
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 text-slate-400 w-full">
                該当するタスクがありません。
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
