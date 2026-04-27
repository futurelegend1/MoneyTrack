import { BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import DashboardTransaction from "./DashboardElement/DashboardTransaction";
import DashBoardRecentTransaction from "./DashboardElement/DashboardRecentTransaction";
// import DashboardSaving from "./DashboardElement/DashboardSaving";
// import DashboardDebt from "./DashboardElement/DashboardDebt";

function Dashboard({ setSection }: { setSection: (section: string) => void }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  type Transaction = {
    id: string;
    category: string;
    amount: number;
    description: string;
    date: Date;
  };
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  type Debt = {
    id: string;
    debt: string;
    amountPay: number;
    currentAmountPayed: number;
    dueDate: Date;
  };
  const [debt, setDebt] = useState<Debt[]>([]);
  type SavingGoal = {
    id: string;
    targetGoal: string;
    targetAmount: number;
    CurrentAmount: number;
    expectedCompletionDate: Date;
  };
  const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([]);

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

  // Fetch debts for the current user
  useEffect(() => {
    if (!currentUser) return;
    const userDocRef = collection(db, "users", currentUser.uid, "debts");
    const debtsQuery = query(userDocRef, orderBy("dueDate", "asc"));
    const unsubscribe = onSnapshot(debtsQuery, (snapshot) => {
      const debtsData: Debt[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        debt: doc.data().debt,
        amountPay: doc.data().amountPay,
        currentAmountPayed: doc.data().currentAmountPayed,
        dueDate: doc.data().dueDate.toDate(),
      }));
      setDebt(debtsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Fetch saving goals for the current user
  useEffect(() => {
    if (!currentUser) return;
    const userDocRef = collection(db, "users", currentUser.uid, "savingGoals");
    const savingGoalsQuery = query(
      userDocRef,
      orderBy("expectedCompletionDate", "asc"),
    );
    const unsubscribe = onSnapshot(savingGoalsQuery, (snapshot) => {
      const savingGoalsData: SavingGoal[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        targetGoal: doc.data().targetGoal,
        targetAmount: doc.data().targetAmount,
        CurrentAmount: doc.data().CurrentAmount,
        expectedCompletionDate: doc.data().expectedCompletionDate.toDate(),
      }));
      setSavingGoals(savingGoalsData);
      setTimeout(() => setLoading(false), 350); // Simulate loading time
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Filter transactions based on selected month and year
  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      date.getMonth() === selectedMonth && date.getFullYear() === selectedYear && t.category !== "Income"
    );
  });

  // Check if there is any data
  const isEmpty =
    filteredTransactions.length === 0 &&
    debt.length === 0 &&
    savingGoals.length === 0;

  return (
    <div className="h-full w-full p-4">
      {loading ? (
        <p className="text-white text-2xl font-bold flex items-center justify-center">
          Loading Your Dashboard...
        </p>
      ) : isEmpty && !loading ? (
        <div className="flex flex-col items-center justify-start h-full text-center">
          <BarChart3 size={60} className="text-slate-500 mb-4" />

          <h2 className="text-2xl font-semibold text-white">
            No data for this month
          </h2>

          <p className="mt-4 text-slate-400 max-w-md">
            You haven't added any transactions yet. Start by adding your first
            transaction to track your spending.
          </p>

          <button
            onClick={() => setSection("Transactions")}
            className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
          >
            Add Transaction
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[4fr_2fr] gap-6 h-full overflow-y-auto">
          {/*Transaction Column*/}
          <div className="grid grid-rows-[5fr_3fr] gap-4">
            <DashboardTransaction
              transactions={transactions}
              filteredTransactions={filteredTransactions}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          {/*Recent Transaction Column*/}
           <DashBoardRecentTransaction transactions={transactions} />
          </div>

          <div className="grid grid-rows-[1fr_1fr] gap-4">
            {/*Saving Goal Column*/}
            {/* <DashboardSaving savingGoals={savingGoals} /> */}
            {/*Debt Column*/}
            {/* <DashboardDebt debts={debt} /> */}
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
