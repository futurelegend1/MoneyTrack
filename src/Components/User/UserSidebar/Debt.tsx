import { TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { Edit, Plus, Trash2, Minus } from "lucide-react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

function Debt({
  showDebtForm,
  setShowDebtForm,
}: {
  showDebtForm: boolean;
  setShowDebtForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  type DebtForm = {
    debt: string;
    amount: string;
    currentAmountPayed: string;
    dueDate: string;
  };

  type Debt = {
    id: string;
    debt: string;
    amountPay: number;
    currentAmountPayed: number;
    dueDate: Date;
  };

  const [user, setUser] = useState<User | null>(null);
  const [debt, setDebt] = useState<Debt[]>([]);
  const [form, setForm] = useState<DebtForm>({
    debt: "",
    amount: "",
    currentAmountPayed: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [currentAmountInput, setCurrentAmountInput] = useState<{
    [key: string]: string;
  }>({});

  // Listen for authentication state changes to get the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  //listens to real-time changes in the user's debt collection and updates the state accordingly
  useEffect(() => {
    if (!user) return;
    user?.reload();
    const q = query(
      collection(db, "users", user.uid, "debts"),
      orderBy("dueDate", "asc"),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const debtsData: Debt[] = [];
      querySnapshot.forEach((doc) => {
        debtsData.push({
          id: doc.id,
          debt: doc.data().debt,
          amountPay: doc.data().amountPay,
          currentAmountPayed: doc.data().currentAmountPayed,
          dueDate: doc.data().dueDate.toDate(),
        });
      });
      setDebt(debtsData);
      setTimeout(() => {
        setLoading(false);
      }, 350);
    });
    return () => unsubscribe();
  }, [user]);

  const handleUpdateCurrentAmount = async (
    debtId: string,
    newAmount: number,
  ) => {
    if (!user) return;
    try {
      const debtRef = doc(db, "users", user.uid, "debts", debtId);
      const debtDoc = await getDoc(debtRef);
      if (debtDoc.exists()) {
        const data = debtDoc.data();
        const currentAmount = data?.currentAmountPayed || 0;
        const targetAmount = data?.amountPay || 0;
        if (currentAmount + newAmount > targetAmount) {
          alert(
            `Wait! Adding this would put you over your $${targetAmount} goal. You only need $${(targetAmount - currentAmount).toFixed(2)} more.`,
          );
          return;
        }
        await updateDoc(debtRef, {
          currentAmountPayed: increment(newAmount),
        });
        setCurrentAmountInput({ ...currentAmountInput, [debtId]: "" });
      }
    } catch (error) {
      console.error("Error updating current amount:", error);
    }
  };

  // Handle form submission to add a new debt to Firestore
  const handleSubmitDebt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.debt || !Number(form.amount) || !form.dueDate) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      if (!user) {
        alert("user not authenticated");
        return;
      }
      const [year, month, date] = form.dueDate.split("-").map(Number);
      const localDueDate = new Date(year, month - 1, date);
      await addDoc(collection(db, "users", user.uid, "debts"), {
        debt: form.debt,
        amountPay: Number(form.amount),
        currentAmountPayed: Number("0"),
        dueDate: Timestamp.fromDate(localDueDate),
      });
      setForm({ debt: "", amount: "", currentAmountPayed: "", dueDate: "" });
      setShowDebtForm(false);
    } catch (error: unknown) {
      console.error("Error adding debt: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {loading ? (
        <p className="text-white text-2xl font-bold">Loading Your Debt...</p>
      ) : debt.length === 0 ? (
        <div className="flex flex-col items-center justify-start h-full text-center p-4">
          <TrendingDown size={60} className="text-slate-500 mb-4" />

          <h2 className="text-2xl font-semibold text-white">
            Congratulation you have no debt
          </h2>

          <p className="mt-4 text-slate-400 max-w-md">
            You Currently don't have any debts now! Keep it up!
          </p>

          <button
            onClick={() => setShowDebtForm(true)}
            className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
          >
            Add Debts
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-5 w-full text-left mb-4 px-8">
            <p className="text-lg font-semibold text-white ">Debt</p>
            <p className="text-lg font-semibold text-white">Debt Amount</p>
            <p className="text-lg font-semibold text-white">
              Current Amount Paid
            </p>
            <p className="text-lg font-semibold text-white">
              Expected Completion Date
            </p>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 w-full">
            {debt.map((debt) => {
              const debtCompleted = debt.currentAmountPayed === debt.amountPay;

              return (
                <div
                  className={`group grid grid-cols-5 items-center rounded-2xl border-2 py-2 px-8 text-left ${debtCompleted ? "bg-goldenrod border-emerald-500" : "bg-slate-700"}`}
                  key={debt.id}
                >
                  <h3 className="text-white text-lg font-semibold">
                    {debt.debt}
                  </h3>
                  <p className="text-red-300 text-lg font-medium">
                    ${debt.amountPay.toFixed(2)}
                  </p>
                  <p className="text-emerald-400 text-lg font-medium">
                    ${debt.currentAmountPayed.toFixed(2)}
                  </p>
                  <p className="text-slate-300 text-lg mr-10">
                    {debt.dueDate.toLocaleDateString()}
                  </p>

                  <div className="flex items-center justify-end gap-6 ml-[-30px]">
                    <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-2 w-50 mr-4">
                      <button
                        disabled={debtCompleted}
                        onClick={() =>
                          handleUpdateCurrentAmount(
                            debt.id,
                            Number(currentAmountInput[debt.id] || 0),
                          )
                        }
                        className={`p-1 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors ${debtCompleted ? "cursor-not-allowed opacity-50" : ""}`}
                      >
                        <Plus size={20} />
                      </button>
                      <input
                        disabled={debtCompleted}
                        placeholder="0"
                        type="number"
                        className={`w-full min-w-0 bg-slate-700 text-white placeholder:text-slate-400 border border-transparent rounded-lg px-2 py-1 focus:outline-none focus:border-white ${debtCompleted ? "cursor-not-allowed opacity-50" : ""}`}
                        value={currentAmountInput[debt.id] || ""}
                        onChange={(e) =>
                          setCurrentAmountInput((prev) => ({
                            ...prev,
                            [debt.id]: e.target.value,
                          }))
                        }
                      />
                      <button
                        disabled={debtCompleted}
                        onClick={() =>
                          handleUpdateCurrentAmount(
                            debt.id,
                            -Number(currentAmountInput[debt.id] || 0),
                          )
                        }
                        className={`p-1 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors ${debtCompleted ? "cursor-not-allowed opacity-50" : ""}`}
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

      {showDebtForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-800 p-8 rounded-2xl w-[400px] shadow-xl">
            <h2 className="text-2xl text-white font-semibold mb-4">Add Debt</h2>

            {/*Divider*/}
            <div className="h-px bg-white/60 mb-4"></div>

            <form onSubmit={handleSubmitDebt} className="flex flex-col gap-4">
              {/* Debt Name */}
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium self-start">
                  Debt to pay off
                </label>
                <input
                  onChange={(e) => setForm({ ...form, debt: e.target.value })}
                  value={form.debt}
                  type="text"
                  className="bg-slate-700 w-full text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Total Amount */}
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium self-start">
                  Total Amount
                </label>
                <input
                  type="number"
                  className="bg-slate-700 w-full text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  value={form.amount}
                />
              </div>

              {/* Expect Complete Date */}
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium self-start">
                  Expect pay off Date
                </label>
                <input
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  type="date"
                  className="bg-slate-700 text-white w-full rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-lg text-white rounded-xl p-3 transition-all hover:scale-105 duration-200"
                >
                  Add Debt
                </button>
                <button
                  type="button"
                  className="bg-slate-600 hover:bg-slate-700 text-lg text-white rounded-xl p-3 transition-all hover:scale-105 duration-200"
                  onClick={() => setShowDebtForm(false)}
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

export default Debt;
