const Dashboard = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">タスクリスト</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            + タスク追加
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-slate-500 text-center py-10">
            タスクがまだありません。まずはタスクを追加しましょう！
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
