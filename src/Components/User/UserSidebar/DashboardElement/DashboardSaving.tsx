import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type SavingGoal = {
  id: string;
  targetGoal: string;
  targetAmount: number;
  CurrentAmount: number;
  expectedCompletionDate: Date;
};
function DashboardSaving({ savingGoals }: { savingGoals: SavingGoal[] }) {
  const nearestGoal = savingGoals.sort(
    (a, b) =>
      a.expectedCompletionDate.getTime() - b.expectedCompletionDate.getTime(),
  )[0];

  const data = [
    { name: "Current Amount", value: nearestGoal.CurrentAmount },
    {
      name: "Target Amount",
      value: nearestGoal.targetAmount - nearestGoal.CurrentAmount,
    },
  ];

  const COLORS = ["#00C49F", "#0088FE"];

  return (
    <div className="bg-slate-700 rounded-2xl p-4 h-full">
      <div className="grid grid-rows-[2fr_7fr] h-full">
        <div>
          <h2 className="text-white text-center text-2xl font-semibold mb-4 ">
            Nearest savings goal
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
                  (nearestGoal.CurrentAmount / nearestGoal.targetAmount) * 100,
                )}
                %
              </span>
              <span className="text-white text-lg">Saved</span>
            </div>
          </div>

          <div className="w-1/2 flex flex-col items-start text-left h-full gap-8">
            <p className="text-white font-semibold text-xl">
              Goal: <span className="font-normal">{nearestGoal.targetGoal}</span>
            </p>
            <p className="text-white text-lg font-semibold">
              Saved/Total: <span className="font-normal">${nearestGoal.CurrentAmount.toLocaleString()} / ${nearestGoal.targetAmount.toLocaleString()}</span>
            </p>
            <p className="text-white text-lg font-semibold">
              Expected completion: <span className="font-normal">{nearestGoal.expectedCompletionDate.toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSaving;
