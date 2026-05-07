import { useState, useMemo } from "react";
interface Transactions {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

function CashFlow({ transactions }: { transactions: Transactions[] }) {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const avaliableYears = Array.from(
    new Set(transactions.map((transaction) => transaction.date.getFullYear())),
  );
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

  const { income, expenses } = useMemo(() => {
    const currentYear = selectedYear;
    const currentMonth = selectedMonth;
    const yearlyData = {
      income: 0,
      expenses: 0,
    };
    transactions.forEach((transaction) => {
      const month = transaction.date.getMonth();
      const year = transaction.date.getFullYear();
      if (year === currentYear && month === currentMonth) {
        if (transaction.category === "Income") {
          yearlyData.income += transaction.amount;
        } else {
          yearlyData.expenses += transaction.amount;
        }
      }
    });
    return yearlyData;
  }, [transactions, selectedYear, selectedMonth]);

  const savingsRate =
    income > 0 ? Math.max(0, ((income - expenses) / income) * 100) : 0;

  return (
    <div className="bg-slate-700 rounded-2xl p-4 h-full flex flex-col">
      <div className="grid grid-cols-[1fr_2fr_1fr]">
        <div></div>
        <h2 className="text-xl font-bold text-white text-center">
          Annual Spending Overview
        </h2>
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
            className="bg-slate-800 text-white py-1 px-1 border border-white rounded-lg hover:bg-slate-600 hover:cursor-pointer hover:scale-105 transition-all duration-150"
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
      <div className="h-px bg-white/60 w-full mt-2"></div>

      <div className="space-y-2 mt-2">
        {/*income*/}
        <div>
          <div className="flex justify-between items-end">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">
              Income
            </span>
            <span className="text-2xl font-bold text-white">
              ${income.toLocaleString()}
            </span>
          </div>
          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${Math.min((income / (income + expenses || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/*expenses*/}
        <div>
          <div className="flex justify-between items-end">
            <span className="text-red-400 font-semibold uppercase tracking-wider text-sm">
              Expenses
            </span>
            <span className="text-2xl font-bold text-white">
              ${expenses.toLocaleString()}
            </span>
          </div>
          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${expenses > income ? "bg-orange-500" : "bg-red-500"}`}
              style={{
                width: `${Math.min((expenses / (income || 1)) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/60 flex items-center justify-between">
        <div>
          <p className="text-white text-md uppercase">Savings Rate</p>
          <p className="text-3xl font-black text-white">
            {Math.round(savingsRate)}%
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-lg font-bold ${savingsRate > 20 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}
        >
          {savingsRate > 0 ? "In the Green" : income === 0 && expenses === 0 ? "No Data" : "Over Budget"}
        </div>
      </div>
    </div>
  );
}
export default CashFlow;
