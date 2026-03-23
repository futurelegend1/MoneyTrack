import { ReceiptText } from "lucide-react";

function Transactions({
  showForm,
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <ReceiptText size={60} className="text-slate-500 mb-4" />

      <h2 className="text-2xl font-semibold text-white">No transactions yet</h2>

      <p className="mt-4 text-slate-400 max-w-md">
        Start tracking your finances by adding your first transaction. This will
        power your dashboard, budgets, and reports.
      </p>

      <button
        onClick={() => setShowForm(true)}
        className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white transition-colors"
      >
        Add Transaction
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-800 p-8 rounded-2xl w-[400px] shadow-xl">
            <h2 className="text-2xl text-white font-semibold mb-4">
              Add Transaction
            </h2>

            {/*Divider*/}
            <div className="h-px bg-white/60 mb-4"></div>

            <form className="flex flex-col gap-4">
              {/*Category*/}
              <div className="flex flex-col gap-1">
                <label className="self-start text-white font-medium">
                  Category
                </label>

                <div className="relative">
                  <select className="bg-slate-700 w-full text-white rounded-md appearance-none p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500">
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Shopping</option>
                    <option>Entertainment</option>
                    <option>Utilities</option>
                    <option>Other</option>
                  </select>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    ▼
                  </div>
                </div>
              </div>

              {/*Amount*/}
              <div className="flex flex-col gap-1">
                <label className="self-start text-white font-medium">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="$0.00"
                  className="bg-slate-700 text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/*Description*/}
              <div className="flex flex-col gap-1">
                <label className="text-white self-start font-medium">
                  Description
                </label>
                <textarea className="bg-slate-700 h-30 max-h-60 text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500" />
              </div>

              {/*Date*/}
              <div className="flex flex-col gap-1">
                <label className="text-white self-start font-medium">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="bg-slate-700 w-full text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/*Buttons*/}
              <div className="flex flex-col gap-3">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-lg text-white rounded-xl p-3 transition-all hover:scale-105 duration-200">
                  Save
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-600 hover:bg-slate-700 text-lg text-white rounded-xl p-3 transition-all hover:scale-105 duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Transactions;
