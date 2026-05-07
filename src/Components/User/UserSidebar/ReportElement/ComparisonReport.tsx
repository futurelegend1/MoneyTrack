import { useState,  useMemo } from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";

interface Transactions {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

const MONTHS = [
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

function ComparisonReport({ transactions }: { transactions: Transactions[] }) {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const chartData = useMemo(() => {
    const currentYear = selectedYear;
    const yearlyData = MONTHS.map((monthName) => ({
      name: monthName,
      amount: 0,
    }));
    transactions.forEach((transaction) => {
      const month = transaction.date.getMonth();
      const year = transaction.date.getFullYear();
      if (year === currentYear) {
        yearlyData[month].amount += transaction.amount;
      }
    });
    return yearlyData;
  }, [transactions, selectedYear]);

  const categoryTrend = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const lastMonth = new Date(currentYear, currentMonth - 1, 1);
    const prevMonth = lastMonth.getMonth();
    const prevYear = lastMonth.getFullYear();

    const category = [
      "Food",
      "Entertainment",
      "Utilities",
      "Transport",
      "Shopping",
    ];

    return category.map((cate) => {
      const currentAmount = transactions
        .filter(
          (t) =>
            t.category === cate &&
            new Date(t.date).getMonth() === currentMonth &&
            new Date(t.date).getFullYear() === currentYear,
        )
        .reduce((total, t) => total + t.amount, 0);

      const prevAmount = transactions
        .filter(
          (t) =>
            t.category === cate &&
            new Date(t.date).getMonth() === prevMonth &&
            new Date(t.date).getFullYear() === prevYear,
        )
        .reduce((total, t) => total + t.amount, 0);

      let percentage = 0;
      if (prevAmount > 0) {
        percentage = ((currentAmount - prevAmount) / prevAmount) * 100;
      } else {
        percentage = 0;
      }
      return {
        category: cate,
        percent: Math.round(percentage),
        amount: currentAmount,
      };
    });
  }, [transactions]);

  const currentMonthIndex = new Date().getMonth();

  const avaliableYears = Array.from(
    new Set(transactions.map((t) => new Date(t.date).getFullYear())),
  ).sort((a, b) => b - a);

  return (
    <div className="bg-slate-700 rounded-2xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-10">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Annual Spending Overview
        </h2>
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
      <div className="h-px bg-white/60 w-full mt-2"></div>

      <div className="h-full w-full mt-5 flex-1 flex gap-4">
        <ResponsiveContainer width="72%" height="100%">
          <BarChart data={chartData} margin={{ top: 30, right: 10, left: 10, bottom: 10 }} style={{ outline: "none" }}>
            <XAxis
              style={{ outline: "none" }}
              dataKey="name"
              stroke="white"
              axisLine={true}
              tickLine={true}
              tick={{ fill: "#ffffff", fontSize: 18 }}
            />
            <YAxis
              style={{ outline: "none" }}
              axisLine={true}
              stroke="white"
              tick={{ fill: "#ffffff", fontSize: 18 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: "#242930", opacity: 0.8, radius: 10 }}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#10b981" }}
              formatter={(value: unknown) => {
                  const val =
                    typeof value === "number" || typeof value === "string"
                      ? value
                      : 0;
                  return `$${Number(val).toLocaleString()}`;
                }}
            />
            <Bar
              dataKey="amount"
              radius={[6, 6, 0, 0]}
              style={{ outline: "none" }}
            >
              <LabelList
                dataKey="amount"
                position="top"
                fill="#ffffff"
                fontSize={16}
                formatter={(value: unknown) => {
                  const val =
                    typeof value === "number" || typeof value === "string"
                      ? value
                      : 0;
                  return `$${Number(val).toLocaleString()}`;
                }}
              />
              {chartData.map((entry, index) => (
                <Cell
                  tabIndex={-1}
                  style={{ outline: "none", border: "none" }}
                  key={`cell-${index}`}
                  fill={index === currentMonthIndex ? "#10b981" : "#556e85"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="flex-1 bg-slate-800 rounded-xl p-4 border-2 border-slate-600 shadow-lg shadow-neutral-900">
          <h2 className="text-xl font-bold mb-2 text-white text-center">
            Category Trend
          </h2>
          <div className="h-px bg-white/60"></div>
          <div>
            {categoryTrend.map((trend) => (
              <div
                key={trend.category}
                className="flex items-center justify-between"
              >
                <div className="flex gap-2">
                  <p className="text-md text-white font-semibold">
                    {trend.category}:{" "}
                  </p>
                  <p className="text-md font-medium text-white">
                    ${trend.amount.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`text-md font-bold ${trend.percent > 0 ? "text-red-400" : trend.percent < 0 ? "text-emerald-400" : "text-slate-400"}`}
                >
                  {trend.percent > 0 ? "▲" : trend.percent < 0 ? "▼" : ""}{" "}
                  {Math.abs(trend.percent)}%
                  <span className="block text-[15px] text-slate-400 font-normal">
                    vs last month
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ComparisonReport;
