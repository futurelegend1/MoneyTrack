import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

interface Transaction {
  id: string | number;
  category: string;
  amount: number;
  date: string | Date;
}
function DashboarTransaction({
  transactions,
  filteredTransactions,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}: {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}) {
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

  // Get unique years from transactions for the year filter dropdown
  const avaliableYears = Array.from(
    new Set(transactions.map((t) => new Date(t.date).getFullYear())),
  ).sort((a, b) => b - a);

  // Calculate category totals
  const categoryTotals = filteredTransactions.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    },
    {} as { [key: string]: number },
  );

  // Prepare chart data
  const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    amount: total,
  }));

  return (
    <div className="bg-slate-700 rounded-2xl p-4 grid grid-rows-[2fr_12fr] h-full w-full">
      <div>
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-2 ml-4">
            <p className="text-xl text-white">Total Spent: </p>
            {filteredTransactions.length === 0 ? (
              <p className="text-emerald-400 text-xl font-semibold">$0</p>
            ) : (
              <p className="text-emerald-400 text-xl font-semibold">
                $
                {filteredTransactions.reduce(
                  (total, transaction) => total + Number(transaction.amount),
                  0,
                )}
              </p>
            )}
          </div>
          <h2 className="text-white text-center text-2xl font-semibold mb-4 ">
            Transactions
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

        <div className="mt-px h-px bg-white/60 mx-4"></div>
      </div>

      <div>
        <style>
          {`
            .recharts-cartesian-axis-tick,
            .recharts-rectangle,
            .recharts-layer,
            .recharts-surface,
            :focus {
                outline: none !important;
                border: none !important;
                -webkit-tap-highlight-color: transparent;
            }
            `}
        </style>
        <div className="h-full w-full mt-2 mx-4 outline-none focus:outline-none flex items-center justify-center">
          {Object.keys(categoryTotals).length === 0 ? (
            <p className="text-slate-400">No transaction data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 40, left: 0, bottom: 20 }}
                style={{ outline: "none" }}
                className="ml-[-20px]"
              >
                <XAxis type="number" stroke="#fff" />
                {""}

                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#fff"
                  fontSize={18}
                  width={90}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    outline: "none",
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="#4fd1ed"
                  radius={[0, 8, 8, 0]}
                  barSize={25}
                  style={{ outline: "none" }}
                >
                  {/* This adds the number at the end of the bar like your image */}
                  <LabelList
                    dataKey="amount"
                    position="right"
                    fill="#fff"
                    fontSize={15}
                    formatter={(value: unknown) => {
                      const val =
                        typeof value === "number" || typeof value === "string"
                          ? value
                          : 0;
                      return `$${Number(val).toLocaleString()}`;
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
export default DashboarTransaction;
