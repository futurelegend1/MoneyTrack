import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Transaction {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

interface BudgetForm {
  budgetAmount: string;
  date: string;
}

interface Budget {
  amount: number;
  createdAt: Date;
}
function Budget({ setSection }: { setSection: (section: string) => void }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [budget, setBudget] = useState<Budget[]>([]);
  const [budgetForm, setBudgetForm] = useState<BudgetForm>({
    budgetAmount: "",
    date: "",
  });
  const [showBudgetForm, setShowBudgetForm] = useState<boolean>(false);
  const COLORS: { [key: string]: string } = {
    Food: "#F87171",
    Utilities: "#60A5FA",
    Transport: "#FBBF24",
    Entertainment: "#A78BFA",
    Shopping: "#EC4899",
    Other: "#94A3B8",
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  // Fetch the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch transactions for the current user
  useEffect(() => {
    if (!currentUser) return;
    const userDocRef = collection(db, "users", currentUser.uid, "transactions");
    const transactionsQuery = query(userDocRef, orderBy("date", "desc"));
    const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
      const transactionsData: Transaction[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        category: doc.data().category,
        amount: doc.data().amount,
        description: doc.data().description,
        date: doc.data().date.toDate(),
      }));
      setTransactions(transactionsData);
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Fetch budgets for the current user
  useEffect(() => {
    if (!currentUser) return;
    const userBudgetDocRef = collection(
      db,
      "users",
      currentUser.uid,
      "budgets",
    );
    const unsubscribe = onSnapshot(userBudgetDocRef, (snapshot) => {
      const budgetData: Budget[] = snapshot.docs.map((doc) => ({
        amount: doc.data().amount,
        createdAt: doc.data().createdAt.toDate(),
      }));
      setBudget(budgetData);
      setTimeout(() => setLoading(false), 350);
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Function to handle setting a budget for a specific month/year
  const handleSetBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      budgetForm.budgetAmount.trim() === "" ||
      budgetForm.budgetAmount === "0"
    ) {
      alert("Please enter a valid budget amount.");
      return;
    }
    try {
      const budgetId = `${selectedYear}-${selectedMonth}`;
      await setDoc(doc(db, "users", currentUser!.uid, "budgets", budgetId), {
        id: budgetId,
        amount: Number(budgetForm.budgetAmount),
        createdAt: Timestamp.fromDate(
          new Date(budgetForm.date.replace(/-/g, "/")),
        ),
      });
      setShowBudgetForm(false);
      setBudgetForm({ budgetAmount: "", date: "" });
    } catch (_error) {
      console.error("Error setting budget:", _error);
    }
  };

  // Get unique years from transactions for the year filter dropdown
  const avaliableYears = Array.from(
    new Set(transactions.map((t) => new Date(t.date).getFullYear())),
  ).sort((a, b) => b - a);

  // Filter transactions based on selected month and year, exclude Income category
  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      date.getMonth() === selectedMonth &&
      date.getFullYear() === selectedYear &&
      t.category !== "Income"
    );
  });

  // Calculate category totals
  const categoryTotals = filteredTransactions.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    },
    {} as { [category: string]: number },
  );

  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
    category: name,
    total: value,
    fill: COLORS[name] || COLORS.Other,
  }));

  // Find if a budget exists for the currently selected month/year
  const viewedDate = new Date(selectedYear, selectedMonth);
  const activeBudget = budget
    .filter((b: Budget) => {
      // Only look at budgets created ON or BEFORE the month we are looking at
      const bDate = new Date(b.createdAt.getFullYear(), b.createdAt.getMonth());
      return bDate <= viewedDate;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

  const monthlyLimit = activeBudget ? activeBudget.amount : 0;
  const totalSpent = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  let typeForms = (
    <div className="h-full w-full p-4 grid grid-cols-[4fr_3fr] gap-5">
      <div className="bg-slate-700 rounded-3xl p-4">

        {/* Header with month/year and filters */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          <h2 className="ml-4 text-white text-lg">
            Budget Amount:{" "}
            <span className="font-bold text-xl text-emerald-500">
              ${monthlyLimit.toFixed(2)}
            </span>
          </h2>
          <h2 className="text-center text-xl text-white">Budget Diagram</h2>
          <div className="flex items-center justify-end gap-6 mr-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-slate-800 text-white py-1 px-3 border border-white rounded-lg hover:bg-slate-600 hover:cursor-pointer hover:scale-105 transition-all duration-150"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-slate-800 text-white py-1 px-3 border border-white rounded-lg hover:bg-slate-600 hover:cursor-pointer hover:scale-105 transition-all duration-150"
            >
              {avaliableYears.length === 0 ? (
                <option>No Data</option>
              ) : (
                avaliableYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <div className="h-px bg-white/60 mx-4 mt-4"></div>

        {/*circle diagram*/}
        <div className="relative h-[500px] mx-4 **:outline-none">
          {/* TOP RIGHT: Daily Burn Rate */}
          <div className="absolute top-10 right-4 z-10">
            <p className="text-white text-xl uppercase tracking-widest">
              Daily Avg
            </p>
            <p className="text-emerald-500 text-right text-2xl font-bold">
              ${(totalSpent / new Date().getDate()).toFixed(2)}
            </p>
          </div>

          {/* TOP LEFT: Category Legend */}
          <div className="absolute top-10 left-0 flex flex-col gap-4 pointer-events-none">
            {chartData.map((entry) => (
              <div
                key={entry.category}
                className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-lg backdrop-blur-sm"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="text-white text-lg font-medium">
                  {entry.category}
                </span>
              </div>
            ))}
          </div>

          {/* BOTTOM RIGHT: Remainding Budget */}
          <div className="absolute bottom-4 right-4 z-10">
            <p className="text-white text-xl uppercase tracking-widest">
              Remainding Budget
            </p>
            <p className="text-emerald-500 text-right text-2xl font-bold">
              ${(monthlyLimit - totalSpent).toFixed(2)}
            </p>
          </div>

          {filteredTransactions.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart style={{ outline: "none" }}>
                <Pie
                  data={chartData}
                  innerRadius={110}
                  outerRadius={160}
                  paddingAngle={5}
                  dataKey="total"
                  nameKey="category"
                  stroke="none"
                  activeShape={false}
                  isAnimationActive={true}
                  style={{ outline: "none" }}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      style={{ outline: "none" }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  wrapperStyle={{ zIndex: 100, outline: "none" }}
                  contentStyle={{
                    backgroundColor: "#000000",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                  }}
                  itemStyle={{ color: "#fff" }}
                  cursor={false}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400 text-2xl italic">
              No transactions for this month
            </div>
          )}
          {filteredTransactions.length > 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-white/60 text-lg uppercase tracking-[0.2em]">
                Spent
              </p>
              <p className="text-white text-5xl font-black">
                ${totalSpent.toLocaleString()}
              </p>
              {monthlyLimit && (
                <div className="mt-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                  <p className="text-md text-white/80 font-medium">
                    {((totalSpent / monthlyLimit) * 100).toFixed(2)}% of Budget
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
      </div>

      <div className="bg-slate-700 rounded-3xl p-4">
        <div className="mt-2 mx-4 grid grid-cols-[7fr_3fr] gap-2">
          <h2 className="text-white text-xl text-end">Category Breakdown</h2>
          <p className="text-white/70 text-lg text-end">
            {months[selectedMonth]} {selectedYear} Progress
          </p>
        </div>
        <div className="h-px bg-white/60 mx-4 mt-4"></div>
        <div className="p-4 mt-2">
          {chartData.length > 0 ? (
            chartData.map((entry) => {
              const percentage = ((entry.total / monthlyLimit) * 100).toFixed(
                2,
              );
              return (
                <div
                  key={entry.category}
                  className="bg-slate-800 px-4 py-2 rounded-2xl mb-4"
                >
                  <div className="flex justify-between items-end mb-1">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-8 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[entry.category] || COLORS.Other,
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-slate-200 font-semibold text-md leading-none">
                          {entry.category}
                        </span>
                        <span className="text-sm text-slate-400 mt-1 uppercase font-medium">
                          Spent
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-md leading-none">
                        ${entry.total.toLocaleString()}
                      </p>
                      <p className="text-sm text-slate-400 mt-1 font-medium">
                        {percentage}%
                      </p>
                    </div>
                  </div>

                  <div className="h-3 w-full bg-slate-400/50 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.min(parseFloat(percentage), 100)}%`,
                        backgroundColor: COLORS[entry.category] || COLORS.Other,
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-white/60 text-lg text-center">
              No category data available
            </p>
          )}
        </div>
        {monthlyLimit > 0 && (
          <div className="mx-4 mt-[-15px]">
            <div className="bg-slate-800 rounded-3xl px-4 py-2">
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 rounded-full bg-emerald-500" />
                  <div className="flex flex-col">
                    <span className="text-slate-200 font-semibold text-md leading-none">
                      Total Budget Capacity
                    </span>
                    <span className="text-sm text-slate-400 mt-1 uppercase font-medium">
                      SPENT
                    </span>
                  </div>
                </div>
                <span>{((totalSpent / monthlyLimit) * 100).toFixed(0)}%</span>
              </div>

              <div className="h-2 w-full bg-slate-400/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${totalSpent > monthlyLimit ? "bg-red-500" : "bg-emerald-500"}`}
                  style={{
                    width: `${Math.min((totalSpent / monthlyLimit) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (transactions.length === 0) {
    typeForms = (
      <div className="h-full w-full p-4 flex flex-col items-center justify-start text-center">
        <Wallet size={60} className="text-slate-500 mb-4" />
        <h2 className="text-2xl font-semibold text-white">No spending yet</h2>
        <p className="mt-4 text-slate-400 max-w-md">
          Budgets are calculated from your transactions. Start by adding a
          transaction to see how your spending compares.
        </p>
        <button
          onClick={() => setSection("Transactions")}
          className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white transition-colors"
        >
          Add Transaction
        </button>
      </div>
    );
  }

  if (transactions.length > 0 && budget.length === 0) {
    typeForms = (
      <div className="h-full w-full p-4 flex flex-col items-center justify-start text-center">
        <div className="relative mb-4">
          <Wallet size={60} className="text-slate-500" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-slate-700"></div>
        </div>
        <h2 className="text-2xl font-semibold text-white">
          Didn't set a budget yet
        </h2>
        <p className="mt-4 text-slate-400 max-w-md">
          You have transactions, but you haven't set any spending goals. Set a
          budget to stay on track this month!
        </p>
        <button
          onClick={() => setShowBudgetForm(true)}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-colors"
        >
          Set Budget
        </button>

        {showBudgetForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-slate-800 p-8 rounded-2xl w-[400px] shadow-xl">
              <h2 className="text-2xl text-white font-semibold mb-4">
                Set Your Monthly Budget
              </h2>
              <div className="h-px bg-white/60 mb-4"></div>

              <form onSubmit={handleSetBudget} className="flex flex-col gap-3">
                <label className="text-white text-xl text-start">
                  Budget Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter budget amount"
                  value={budgetForm.budgetAmount}
                  onChange={(e) =>
                    setBudgetForm({
                      ...budgetForm,
                      budgetAmount: e.target.value,
                    })
                  }
                  className="bg-slate-700 w-full text-white rounded-md p-2 border-2 border-transparent focus:outline-none focus:border-emerald-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-lg text-white rounded-xl p-3 transition-all hover:scale-105 duration-200"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBudgetForm(false)}
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

  return (
    <div className="h-full w-full p-4">
      {loading ? (
        <p className="text-white text-2xl font-bold flex items-center justify-center">
          Loading Your Budget...
        </p>
      ) : (
        typeForms
      )}
    </div>
  );
}
export default Budget;
