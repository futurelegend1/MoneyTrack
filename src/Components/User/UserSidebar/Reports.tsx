import { BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import ComparisonReport from "./ReportElement/ComparisonReport";
import CashFlow from "./ReportElement/CashFlow";
import FinancialHabits from "./ReportElement/FinancialHabits";

interface Transactions {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

function Report({ setSection }: { setSection: (section: string) => void }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  });

  // Fetch transactions for the current user
  useEffect(() => {
    if (!currentUser) return;
    const userDocRef = collection(db, "users", currentUser.uid, "transactions");
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      const transactionsData: Transactions[] = [];
      snapshot.forEach((doc) => {
        transactionsData.push({
          id: doc.id,
          category: doc.data().category,
          amount: doc.data().amount,
          description: doc.data().description,
          date: doc.data().date.toDate(),
        });
      });
      setTransactions(transactionsData);
      setTimeout(() => {
        setLoading(false);
      }, 350); // Simulate loading delay for better UX
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="h-full w-full p-4">
      {loading ? (
        // Loading indicator
          <p className="text-white text-2xl font-bold flex items-center justify-center">
            Loading Your Reports...
          </p>
      ) : transactions.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-start h-full text-center">
          <BarChart3 size={60} className="text-slate-500 mb-4" />

          <h2 className="text-2xl font-semibold text-white">
            No reports available
          </h2>

          <p className="mt-4 text-slate-400 max-w-md">
            Reports are generated from your transaction history. Add
            transactions to see spending trends and charts.
          </p>

          <button
            onClick={() => setSection("Transactions")}
            className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white transition-colors"
          >
            Add Transaction
          </button>
        </div>
      ) : (
        <div className="grid grid-rows-[4fr_3fr] gap-4 h-full w-full overflow-y-auto">
          <div>
            <ComparisonReport transactions={transactions}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CashFlow transactions={transactions} />
            <FinancialHabits transactions={transactions} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Report;
