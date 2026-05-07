import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Debt = {
  id: string;
  debt: string;
  amountPay: number;
  currentAmountPayed: number;
  dueDate: Date;
};
function DashboardDebt({ debts }: { debts: Debt[] }) {
  const nearestDebt = debts.sort(
    (a, b) => a.dueDate.getTime() - b.dueDate.getTime(),
  ).filter((d) => d.amountPay > d.currentAmountPayed)[0];

    const data = [
      { name: "Amount Payed", value: nearestDebt.currentAmountPayed },
      { name: "Target Amount", value: nearestDebt.amountPay - nearestDebt.currentAmountPayed },
    ];

    const COLORS = ["#32CD32", "#FF6347"];

  return (
    <div className="bg-slate-700 rounded-2xl p-4 h-full">
      <div className="grid grid-rows-[2fr_7fr] h-full">
        <div>
          <h2 className="text-white text-center text-2xl font-semibold mb-4 ">
            Nearest debt Due
          </h2>
          <div className="mt-px h-px bg-white/60 mx-4"></div>
        </div>

        <div className="flex items-center justify-between h-full px-4">
          <div className="relative mb-5 w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
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
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-white text-2xl font-bold">
                {Math.round(
                  (nearestDebt.currentAmountPayed / nearestDebt.amountPay) * 100,
                )}
                %
              </span>
              <span className="text-white text-lg">Payed</span>
            </div>
          </div>

          <div className="w-1/2 flex flex-col items-start text-left h-full gap-8">
            <p className="text-white font-semibold text-xl">
              Debt: <span className="font-normal">{nearestDebt.debt}</span>
            </p>
            <p className="text-white text-lg font-semibold">
              Amount Payed/Total: <span className="font-normal">${nearestDebt.currentAmountPayed.toLocaleString()} / ${nearestDebt.amountPay.toLocaleString()}</span>
            </p>
            <p className="text-white text-lg font-semibold">
              Expected completion: <span className="font-normal">{nearestDebt.dueDate.toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardDebt;
