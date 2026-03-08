import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Task } from "../types";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskItem from "../components/TaskItem";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("全て");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  // サーバーデータの初期読み込み
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("データを取得できませんでした:", error);
      }
    };
    fetchTasks();
  }, []);

  // ログアウト
  const handleLogout = () => {
    if (window.confirm("ログアウトしますか？")) {
      navigate("/");
    }
  };

  // タスク追加
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const response = await axios.post("http://localhost:3001/tasks", {
        title: newTask,
        status: "進行中",
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      alert("登録に失敗しました！");
    }
  };

  // ステータス変更（進行中 <-> 完了）
  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === "進行中" ? "完了" : "進行中";
    try {
      await axios.patch(`http://localhost:3001/tasks/${task.id}`, {
        status: newStatus,
      });
      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)),
      );
    } catch (error) {
      alert("状態変更に失敗しました！");
    }
  };

  // 編集モード操作
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

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

  // タスク削除
  const deleteTask = async (id: number) => {
    if (!window.confirm("本当に削除しますか？")) return;
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      alert("削除に失敗しました！");
    }
  };

  // フィルタリングロジック
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "全て" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">
        <Header onLogout={handleLogout} />

        <div className="flex flex-col gap-6 w-full">
          <TaskForm newTask={newTask} setNewTask={setNewTask} onAdd={addTask} />
          <TaskFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-end w-full px-2">
            <h2 className="text-2xl font-bold text-slate-800">Task List</h2>
            <span className="text-sm text-slate-400 font-medium">
              合計: {filteredTasks.length}件
            </span>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <AnimatePresence initial={false}>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      x: -100,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    layout
                    className="w-full"
                  >
                    <TaskItem
                      key={task.id}
                      task={task}
                      isEditing={editingId === task.id}
                      editTitle={editTitle}
                      setEditTitle={setEditTitle}
                      onToggle={toggleStatus}
                      onStartEdit={startEdit}
                      onCancelEdit={cancelEdit}
                      onSave={saveEdit}
                      onDelete={deleteTask}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 text-slate-400 w-full"
                >
                  該当するタスクがありません。
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
