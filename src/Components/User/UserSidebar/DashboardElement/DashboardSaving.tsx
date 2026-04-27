
type SavingGoal = {
    id: string;
    targetGoal: string;
    targetAmount: number;
    CurrentAmount: number;
    expectedCompletionDate: Date;
  };
function DashboardSaving({savingGoals}: {savingGoals: SavingGoal[]}) {
    const nearestGoal = savingGoals.sort((a, b) => a.expectedCompletionDate.getTime() - b.expectedCompletionDate.getTime())[0];

  return (
    <div className="bg-slate-700 rounded-2xl p-4">
      <h2 className="text-white text-center text-2xl font-semibold mb-4 ">
        Nearest savings goal
      </h2>
      <div className="mt-px h-px bg-white/60 mx-4"></div>
    </div>
  );
}

export default DashboardSaving;
