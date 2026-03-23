import { PiggyBank } from "lucide-react";

function Saving() {
    return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <PiggyBank size={60} className="text-slate-500 mb-4" />

      <h2 className="text-2xl font-semibold text-white">
        No savings goals yet
      </h2>

      <p className="mt-4 text-slate-400 max-w-md">
        You haven't added any savings goals yet. Start by adding your first
        goal to track your progress.
      </p>

      <button
        className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
      >
        Add Saving Goals
      </button>
    </div>
  );    
}

export default Saving;