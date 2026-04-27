 type Debt = {
    id: string;
    debt: string;
    amountPay: number;
    currentAmountPayed: number;
    dueDate: Date;
  };
function DashboardDebt({debts}: {debts: Debt[]}) {
    const nearestDebt = debts.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())[0];

  return (
    <div className="bg-slate-700 rounded-2xl p-4">
      <h2 className="text-white text-center text-2xl font-semibold mb-4 ">
        Nearest debt
      </h2>
      <div className="mt-px h-px bg-white/60 mx-4"></div>
    </div>
  );
}

export default DashboardDebt;