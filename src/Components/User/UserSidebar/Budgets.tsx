import { Wallet } from "lucide-react";

function Budget({setSection}: {setSection: (section: string) => void}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Wallet size={60} className="text-slate-500 mb-4" />

      <h2 className="text-2xl font-semibold text-white">No spending yet</h2>

      <p className="mt-4 text-slate-400 max-w-md">
        Budgets are calculated from your transactions. Start by adding a
        transaction to see how your spending compares.
      </p>

      <button onClick={() => setSection("Transactions")} className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white transition-colors">
        Add Transaction
      </button>
    </div>
  );
}
export default Budget;
