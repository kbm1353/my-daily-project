// 検索欄とフィルターボタンが集まっている場所

interface TaskFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const TaskFilter = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}: TaskFilterProps) => (
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
);

export default TaskFilter;
