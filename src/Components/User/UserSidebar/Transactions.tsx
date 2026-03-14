import { ReceiptText } from "lucide-react";
import { useState } from "react";

function Transactions() {
  const [showForm, setShowForm] = useState<boolean>(false);


  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <ReceiptText size={60} className="text-slate-500 mb-4" />

      <h2 className="text-2xl font-semibold text-white">No transactions yet</h2>

      <p className="mt-4 text-slate-400 max-w-md">
        Start tracking your finances by adding your first transaction. This will
        power your dashboard, budgets, and reports.
      </p>

      <button onClick={() => setShowForm(true)} className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white transition-colors">
        Add Transaction
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-800 p-8 rounded-2xl w-[400px] shadow-xl">
            <h2 className="text-2xl text-white font-semibold mb-6">Add Transaction</h2>
            <form>
              <button type="button" onClick={() => setShowForm(false)} >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Transactions;
