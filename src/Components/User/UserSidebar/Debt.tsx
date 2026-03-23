import { TrendingDown } from "lucide-react";

function Debt() {
    return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <TrendingDown size={60} className="text-slate-500 mb-4" />

      <h2 className="text-2xl font-semibold text-white">
       Congratulation you have no debt
      </h2>

      <p className="mt-4 text-slate-400 max-w-md">
        You Currently don't have any debts now! Keep it up!
      </p>

      <button
        className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
      >
        Add Debts
      </button>
    </div>
  );    
}

export default Debt;