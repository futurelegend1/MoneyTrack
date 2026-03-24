import { PiggyBank } from "lucide-react";

function Saving({
  showSavingForm,
  setShowSavingForm,
}: {
  showSavingForm: boolean;
  setShowSavingForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <PiggyBank size={60} className="text-slate-500 mb-4" />

      <h2 className="text-2xl font-semibold text-white">
        No savings goals yet
      </h2>

      <p className="mt-4 text-slate-400 max-w-md">
        You haven't added any savings goals yet. Start by adding your first goal
        to track your progress.
      </p>

      <button
        onClick={() => setShowSavingForm(true)}
        className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
      >
        Add Saving Goals
      </button>

      {showSavingForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-800 p-8 rounded-2xl w-[400px] shadow-xl">
            <h2 className="text-2xl text-white font-semibold mb-4">
              Add Saving Goal
            </h2>

            {/*Divider*/}
            <div className="h-px bg-white/60 mb-4"></div>

            <form className="flex flex-col gap-4">
              {/* Target Goal */}
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium self-start">Target Goal</label>
                <input
                  type="text"
                  className="bg-slate-700 w-full text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Target Amount */}
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium self-start">Target Amount</label>
                <input
                  type="number"
                  className="bg-slate-700 w-full text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Expect Complete Date */}
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium self-start">Expect Complete Date</label>
                <input type="date" className="bg-slate-700 text-white w-full rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"/>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-lg text-white rounded-xl p-3 transition-all hover:scale-105 duration-200">
                  Add Goal
                </button>
                <button
                  className="bg-slate-600 hover:bg-slate-700 text-lg text-white rounded-xl p-3 transition-all hover:scale-105 duration-200"
                  onClick={() => setShowSavingForm(false)}
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

export default Saving;
