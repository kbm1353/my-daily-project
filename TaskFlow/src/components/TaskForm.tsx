// 新しいタスクを追加する入力欄

interface TaskFormProps {
  newTask: string;
  setNewTask: (value: string) => void;
  onAdd: (e: React.FormEvent) => void;
}

const TaskForm = ({ newTask, setNewTask, onAdd }: TaskFormProps) => (
  <form onSubmit={onAdd} className="flex gap-3 w-full">
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
);

export default TaskForm;
