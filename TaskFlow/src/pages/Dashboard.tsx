import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskItem from "../components/TaskItem";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("taskflow-data");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("全て");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("taskflow-data", JSON.stringify(tasks));
  }, [tasks]);

  const navigate = useNavigate();

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

    const newTaskObj: Task = {
      id: Date.now(),
      title: newTask,
      status: "進行中",
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  // ステータス変更（進行中 <-> 完了）
  const toggleStatus = (task: Task) => {
    const newStatus = task.status === "進行中" ? "完了" : "進行中";
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)),
    );
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
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title: editTitle } : t)));
    setEditingId(null);
  };

  // タスク削除
  const deleteTask = (id: number) => {
    if (!window.confirm("本当に削除しますか？")) return;
    setTasks(tasks.filter((task) => task.id !== id));
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
