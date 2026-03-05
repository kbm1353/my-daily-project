import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  editTitle: string;
  setEditTitle: (value: string) => void;
  onToggle: (task: Task) => void;
  onStartEdit: (task: Task) => void;
  onCancelEdit: () => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem = ({
  task,
  isEditing,
  editTitle,
  setEditTitle,
  onToggle,
  onStartEdit,
  onCancelEdit,
  onSave,
  onDelete,
}: TaskItemProps) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center group hover:border-blue-200 transition-all w-full">
    <div className="flex items-center gap-4 flex-1">
      <button
        onClick={() => onToggle(task)}
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          task.status === "完了"
            ? "bg-green-500 border-green-500 text-white"
            : "border-slate-200 bg-white"
        }`}
      >
        {task.status === "完了" && "✓"}
      </button>

      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="flex-1 px-3 py-1 border-b-2 border-blue-500 outline-none bg-blue-50/50 font-semibold text-lg"
          autoFocus
        />
      ) : (
        <span
          className={`font-semibold text-lg transition-all ${task.status === "完了" ? "text-slate-300 line-through" : "text-slate-700"}`}
        >
          {task.title}
        </span>
      )}
    </div>

    <div className="flex items-center gap-2 ml-4">
      {isEditing ? (
        <>
          <button
            onClick={() => onSave(task.id)}
            className="text-blue-600 font-bold text-sm hover:bg-blue-50 px-3 py-2 rounded-xl"
          >
            保存
          </button>
          <button
            onClick={onCancelEdit}
            className="text-slate-400 font-bold text-sm hover:bg-slate-50 px-3 py-2 rounded-xl"
          >
            キャンセル
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => onStartEdit(task)}
            className="text-slate-300 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-blue-50 rounded-xl text-sm font-bold"
          >
            編集
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-xl text-sm font-bold"
          >
            削除
          </button>
        </>
      )}
    </div>
  </div>
);

export default TaskItem;
