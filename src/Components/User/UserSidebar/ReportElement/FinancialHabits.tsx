import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Transactions {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

function FinancialHabits({ transactions }: { transactions: Transactions[] }) {
  const weeklyData = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMon = today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);

    const monday = new Date(today.setDate(diffToMon));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const chartData = DAYS.map((day) => ({ name: day, amount: 0 }));

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate >= monday &&
        transactionDate <= sunday &&
        transaction.category !== "Income"
      ) {
        const dayOfWeek = transactionDate.getDay();
        const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        chartData[dayIndex].amount += transaction.amount;
      }
    });

    return {
      chartData,
      range: `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`,
    };
  }, [transactions]);

  const currentDayIndex =
    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <div className="bg-slate-700 rounded-2xl p-4 h-full flex flex-col">
      <div className="grid grid-cols-3">
        <div></div>
        <h2 className="text-xl font-bold text-white text-center">
          Weekly Habits
        </h2>
        <span className="text-slate-400 text-md font-semibold text-center bg-slate-800 px-3 py-1 rounded-full">
          {weeklyData.range}
        </span>
      </div>
      <div className="h-px bg-white/60 w-full mt-2"></div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData.chartData}
            margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              axisLine={true}
              tickLine={true}
              stroke="#ffffff"
              tick={{ fill: "#ffffff", fontSize: 15 }}
            />
            <YAxis
              stroke="#ffffff"
              axisLine={true}
              tickLine={true}
              tick={{ fill: "#ffffff", fontSize: 15 }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip
              cursor={{ fill: "#242930", opacity: 0.8, radius: 10 }}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "10px",
                color: "#ffffff",
              }}
              itemStyle={{color: "#10b981"}}
              formatter={(value: unknown) => {
                const val =
                  typeof value === "number" || typeof value === "string"
                    ? value
                    : 0;
                return [`$${Number(val).toLocaleString()}`, "Spent"];
              }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]} tabIndex={-1}>
              {weeklyData.chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === currentDayIndex ? "#10b981" : "#556e85"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FinancialHabits;
