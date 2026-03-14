import { BarChart3 } from "lucide-react";

function Dashboard({ setSection }: { setSection: (section: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <BarChart3 size={60} className="text-slate-500 mb-4" />

      <h2 className="text-2xl font-semibold text-white">
        No data for this month
      </h2>

      <p className="mt-4 text-slate-400 max-w-md">
        You haven't added any transactions yet. Start by adding your first
        transaction to track your spending.
      </p>

      <button
        onClick={() => setSection("Transactions")}
        className="mt-6 px-6 py-3 text-xl bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
      >
        Add Transaction
      </button>
    </div>
  );
}
export default Dashboard;
