import type { User } from "firebase/auth";
import { PiggyBank, Edit, Trash2, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase";
import {
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  collection,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";

function Saving({
  showSavingForm,
  setShowSavingForm,
}: {
  showSavingForm: boolean;
  setShowSavingForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  type SavingGoal = {
    id: string;
    targetGoal: string;
    targetAmount: number;
    CurrentAmount: number;
    expectedCompletionDate: Date;
  };

  type SavingForm = {
    targetGoal: string;
    targetAmount: string;
    CurrentAmount: string;
    expectedCompletionDate: string;
  };

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentAmountInput, setCurrentAmountInput] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState<SavingForm>({
    targetGoal: "",
    targetAmount: "",
    CurrentAmount: "",
    expectedCompletionDate: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "users", currentUser.uid, "savingGoals"),
      orderBy("expectedCompletionDate", "asc"),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const savingGoals: SavingGoal[] = [];
      querySnapshot.forEach((doc) => {
        savingGoals.push({
          id: doc.id,
          targetGoal: doc.data().targetGoal,
          targetAmount: doc.data().targetAmount,
          CurrentAmount: doc.data().CurrentAmount,
          expectedCompletionDate: doc.data().expectedCompletionDate.toDate(),
        });
      });
      setSavingGoals(savingGoals);
      setTimeout(() => setLoading(false), 350);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleUpdateCurrentAmount = async (
    goalId: string,
    newAmount: number,
  ) => {
    if (!currentUser) return;
    try {
      const goalRef = doc(db, "users", currentUser.uid, "savingGoals", goalId);
      const goalDoc = await getDoc(goalRef);
      if (goalDoc.exists()) {
        const data = goalDoc.data();
        const currentAmount = data?.CurrentAmount || 0;
        const targetAmount = data?.targetAmount || 0;
        if (currentAmount + newAmount > targetAmount) {
          alert(
            `Wait! Adding this would put you over your $${targetAmount} goal. You only need $${(targetAmount - currentAmount).toFixed(2)} more.`,
          );
          return;
        }
        await updateDoc(goalRef, {
          CurrentAmount: increment(newAmount),
        });
        setCurrentAmountInput({ ...currentAmountInput, [goalId]: "" });
      }
    } catch (error) {
      console.error("Error updating current amount:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      await addDoc(collection(db, "users", currentUser.uid, "savingGoals"), {
        targetGoal: form.targetGoal,
        targetAmount: Number(form.targetAmount),
        CurrentAmount: Number("0"),
        expectedCompletionDate: Timestamp.fromDate(
          new Date(form.expectedCompletionDate.replace(/-/g, "/")),
        ),
      });
      setForm({
        targetGoal: "",
        targetAmount: "",
        CurrentAmount: "",
        expectedCompletionDate: "",
      });
      setShowSavingForm(false);
    } catch (error) {
      console.error("Error adding saving goal:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center overflow-hidden">
      {/* {savingGoals.length > 0 && (
        <div className="grid grid-cols-5 w-full text-left mb-4 px-8">
          <p className="text-lg font-semibold text-white ">Target Goal</p>
          <p className="text-lg font-semibold text-white">Target Amount</p>
          <p className="text-lg font-semibold text-white">
            Current Amount Saved
          </p>
          <p className="text-lg font-semibold text-white">
            Expected Completion Date
          </p>
        </div>
      )} */}
      {loading ? (
        <p className="text-white text-2xl font-bold">
          Loading Your Saving Goals...
        </p>
      ) : savingGoals.length === 0 ? (
        <>
          <PiggyBank size={60} className="text-slate-500 mb-4" />

          <h2 className="text-2xl font-semibold text-white">
            No savings goals yet
          </h2>

          <p className="mt-4 text-slate-400 max-w-md">
            You haven't added any savings goals yet. Start by adding your first
            goal to track your progress.
          </p>

          <button
            onClick={() => setShowSavingForm(true)}
            className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
          >
            Add Saving Goals
          </button>
        </>
      ) : (
        <>
          <div className="grid grid-cols-5 w-full text-left mb-4 px-8">
            <p className="text-lg font-semibold text-white ">Target Goal</p>
            <p className="text-lg font-semibold text-white">Target Amount</p>
            <p className="text-lg font-semibold text-white">
              Current Amount Saved
            </p>
            <p className="text-lg font-semibold text-white">
              Expected Completion Date
            </p>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 w-full">
            {savingGoals.map((goal) => {
              const savingGoalCompleted =
                goal.CurrentAmount === goal.targetAmount;

              return (
                <div
                  className={`group grid grid-cols-5 items-center rounded-2xl border-2 py-2 px-8 text-left ${savingGoalCompleted ? "bg-goldenrod border-emerald-500" : "bg-slate-700"}`}
                  key={goal.id}
                >
                  <h3 className="text-white text-lg font-semibold">
                    {goal.targetGoal}
                  </h3>
                  <p className="text-red-300 text-lg font-medium">
                    ${goal.targetAmount.toFixed(2)}
                  </p>
                  <p className="text-emerald-400 text-lg font-medium">
                    ${goal.CurrentAmount.toFixed(2)}
                  </p>
                  <p className="text-slate-300 text-lg mr-10">
                    {goal.expectedCompletionDate.toLocaleDateString()}
                  </p>

                  <div className="flex items-center justify-end gap-6 ml-[-30px]">
                    <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-2 w-50 mr-4">
                      <button
                        disabled={savingGoalCompleted}
                        onClick={() =>
                          handleUpdateCurrentAmount(
                            goal.id,
                            Number(currentAmountInput[goal.id] || 0),
                          )
                        }
                        className={`p-1 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors ${savingGoalCompleted ? "cursor-not-allowed opacity-50" : ""}`}
                      >
                        <Plus size={20} />
                      </button>
                      <input
                        disabled={savingGoalCompleted}
                        placeholder="0"
                        type="number"
                        className={`w-full min-w-0 bg-slate-700 text-white placeholder:text-slate-400 border border-transparent rounded-lg px-2 py-1 focus:outline-none focus:border-white ${savingGoalCompleted ? "cursor-not-allowed opacity-50" : ""}`}
                        value={currentAmountInput[goal.id] || ""}
                        onChange={(e) => setCurrentAmountInput((prev) => ({ ...prev, [goal.id]: e.target.value }))}
                      />
                      <button
                        disabled={savingGoalCompleted}
                        onClick={() =>
                          handleUpdateCurrentAmount(
                            goal.id,
                            -Number(currentAmountInput[goal.id] || 0),
                          )
                        }
                        className={`p-1 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors ${savingGoalCompleted ? "cursor-not-allowed opacity-50" : ""}`}
                      >
                        <Minus size={20} />
                      </button>
                    </div>

                    <button className="text-slate-300 hover:text-emerald-500 transition-all duration-150 hover:scale-115">
                      <Edit size={25} />
                    </button>

                    <button className="text-slate-300 hover:text-red-500 transition-all duration-150 hover:scale-115">
                      <Trash2 size={25} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

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
                <label className="text-white font-medium self-start">
                  Target Goal
                </label>
                <input
                  value={form.targetGoal}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      targetGoal: e.target.value,
                    }));
                  }}
                  type="text"
                  className="bg-slate-700 w-full text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Target Amount */}
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium self-start">
                  Target Amount
                </label>
                <input
                  value={form.targetAmount}
                  onChange={(e) => {
                    setForm({ ...form, targetAmount: e.target.value });
                  }}
                  type="number"
                  className="bg-slate-700 w-full text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Expect Complete Date */}
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium self-start">
                  Expect Complete Date
                </label>
                <input
                  value={form.expectedCompletionDate}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      expectedCompletionDate: e.target.value,
                    });
                  }}
                  type="date"
                  className="bg-slate-700 text-white w-full rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-lg text-white rounded-xl p-3 transition-all hover:scale-105 duration-200"
                >
                  Add Goal
                </button>
                <button
                  type="button"
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
