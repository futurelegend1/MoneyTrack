import { ReceiptText, Trash2, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import type { User } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Timestamp, query, orderBy, onSnapshot } from "firebase/firestore";

function Transactions({
  showForm,
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  type TransactionForm = {
    category: string;
    amount: string;
    description: string;
    date: string;
  };

  type Transaction = {
    id: string;
    category: string;
    amount: number;
    description: string;
    date: Date;
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedTransactionDetail, setSelectedTransactionDetail] = useState<Transaction[]>([]);
  const [form, setForm] = useState<TransactionForm>({
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Listen for real-time updates to transactions
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    currentUser?.reload(); // Refresh user data to ensure we have the latest information
    const transactionsRef = collection(
      db,
      "users",
      currentUser.uid,
      "transactions",
    );
    const q = query(transactionsRef, orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactionsData: Transaction[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        category: doc.data().category,
        amount: doc.data().amount,
        description: doc.data().description,
        date: doc.data().date.toDate(),
      }));
      setTransactions(transactionsData);
      setTimeout(() => setLoading(false), 350); // Simulate loading delay for better UX
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Handle form submission to add a new transaction
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category || Number(form.amount) <= 0 || !form.date) {
      alert("Please fill in all required fields(description is optional).");
      return;
    }
    try {
      if (!currentUser) {
        alert("User not authenticated");
        return;
      }
      const [year, month, date] = form.date.split("-").map(Number);
      const localDate = new Date(year, month - 1, date);
      await addDoc(collection(db, "users", currentUser.uid, "transactions"), {
        category: form.category,
        amount: Number(form.amount),
        description: form.description,
        date: Timestamp.fromDate(localDate),
      });
      setForm({
        category: "",
        amount: "",
        description: "",
        date: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full text-center overflow-hidden">
        {/* {transactions.length > 0 && (
          <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] w-full items-center text-left mb-4 px-8">
            <p className="text-lg font-semibold text-white">Type</p>
            <p className="text-lg font-semibold text-white">Amount</p>
            <p className="text-lg font-semibold text-white">Description</p>
            <p className="text-lg font-semibold text-white text-center pl-16">
              Date
            </p>
          </div>
        )} */}
        {loading ? (
          <p className="text-white text-2xl font-bold">
            Loading transactions...
          </p>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-start h-full text-center p-4">
            <ReceiptText size={60} className="text-slate-500 mb-4" />

            <h2 className="text-2xl font-semibold text-white">
              No transactions yet
            </h2>

            <p className="mt-4 text-slate-400 max-w-md">
              Start tracking your finances by adding your first transaction.
              This will power your dashboard, budgets, and reports.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white transition-colors"
            >
              Add Transaction
            </button>
          </div>
        ) : (
          <>
          <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] w-full text-left mb-4 px-8">
            <p className="text-lg font-semibold text-white">Type</p>
            <p className="text-lg font-semibold text-white">Amount</p>
            <p className="text-lg font-semibold text-white">Description</p>
            <p className="text-lg font-semibold text-white text-center pl-16">
              Date
            </p>
          </div>
          <div className="flex-1 overflow-y-auto w-full">
            <div className="flex flex-col gap-4 w-full pb-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-slate-700 grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center text-left p-4 rounded-2xl"
                >
                  <h3 className="text-lg font-semibold text-white mx-4">
                    {transaction.category}
                  </h3>
                  <p className="text-emerald-400 text-lg font-medium mx-4">
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-5 mx-4 overflow-hidden">
                    <p className="text-slate-300 text-lg truncate flex-1">
                      {transaction.description || "No description"}
                    </p>
                    {transaction.description && (
                      <button
                        onClick={() =>
                          setSelectedTransactionDetail([transaction])
                        }
                        className="text-sm bg-slate-800 mr-2 px-4 py-2 rounded-md text-white/60 hover:text-emerald-500 hover:scale-110 hover:bg-slate-900 transition-all duration-150"
                        title="View full description"
                      >
                        More
                      </button>
                    )}
                  </div>
                  <p className="text-slate-300 text-lg mx-4 text-end">
                    {transaction.date.toLocaleDateString()}
                  </p>

                  <div className="flex items-center justify-end gap-6">
                    <button className="text-slate-300 hover:text-emerald-500 transition-all duration-150 hover:scale-115">
                      <Edit size={25} />
                    </button>

                    <button className="text-slate-300 hover:text-red-500 transition-all duration-150 hover:scale-115">
                      <Trash2 size={25} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </>
        )}

        {selectedTransactionDetail.length > 0 && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-slate-800 p-6 rounded-2xl w-[400px] min-h-[40vh] max-h-[60vh] shadow-2xl flex flex-col">
              <h2 className="text-2xl text-white font-semibold mb-4">
                Transaction Details
              </h2>
              {/*Divider*/}
              <div className="h-px bg-white/60 mb-4"></div>
              
              <div className="text-white text-left text-lg leading-loose">
                <p>Transaction Type: <span className="font-bold">{selectedTransactionDetail[0]?.category}</span></p>
                <p>Amount: <span className="font-bold">${selectedTransactionDetail[0]?.amount.toFixed(2)}</span></p>
                <p>Date: <span className="font-bold">{selectedTransactionDetail[0]?.date.toLocaleDateString()}</span></p>
                <p>Description:</p>
              </div>

              <div className="flex-1 overflow-y-auto border-2 border-slate-500 rounded-lg p-2 text-left">
                <p className="text-slate-300 text-lg wrap-break-word whitespace-pre-wrap">
                  {selectedTransactionDetail[0]?.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedTransactionDetail([])}
                className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-slate-800 p-8 rounded-2xl w-[400px] shadow-xl">
              <h2 className="text-2xl text-white font-semibold mb-4">
                Add Transaction
              </h2>

              {/*Divider*/}
              <div className="h-px bg-white/60 mb-4"></div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/*Category*/}
                <div className="flex flex-col gap-1">
                  <label className="self-start text-white font-medium">
                    Category
                  </label>

                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) => {
                        setForm({ ...form, category: e.target.value });
                      }}
                      className="bg-slate-700 w-full text-white rounded-md appearance-none p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                    >
                      <option disabled value="" className="text-slate-400">
                        Select Category
                      </option>
                      <option>Income</option>
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
                    value={form.amount}
                    onChange={(e) => {
                      setForm({ ...form, amount: e.target.value });
                    }}
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
                  <textarea
                    value={form.description}
                    onChange={(e) => {
                      setForm({ ...form, description: e.target.value });
                    }}
                    className="bg-slate-700 h-30 max-h-60 text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/*Date*/}
                <div className="flex flex-col gap-1">
                  <label className="text-white self-start font-medium">
                    Date
                  </label>
                  <input
                    value={form.date}
                    onChange={(e) => {
                      setForm({ ...form, date: e.target.value });
                    }}
                    type="date"
                    name="date"
                    className="bg-slate-700 w-full text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/*Buttons*/}
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-lg text-white rounded-xl p-3 transition-all hover:scale-105 duration-200"
                  >
                    Save
                  </button>
                  <button
                    type="button"
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
    </>
  );
}
export default Transactions;
