interface Transaction {
  id: string | number;
  category: string;
  amount: number;
  date: string | Date;
}

function DashBoardRecentTransaction({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const recentTransactions = transactions
    .map((transaction) => ({
      id: transaction.id,
      category: transaction.category,
      amount: transaction.amount,
      date: new Date(transaction.date),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3); // Get the 3 most recent transactions

  return (
    <div className="bg-slate-700 rounded-2xl p-2 h-full grid grid-rows-[3fr_10fr]">
      {/*Header*/}
      <div>
        <h2 className="text-white text-center text-xl font-semibold mb-2">
          Recent Transactions
        </h2>

        <div className="h-px bg-white/60 mx-4"></div>
      </div>
      {/*Content*/}
      <div>
        {recentTransactions.length === 0 ? (
          <p className="text-slate-400 mt-4 text-center">
            No transactions this month
          </p>
        ) : (
          <div className="grid grid-rows-3 gap-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-3 mx-2 rounded-xl px-2 py-2.5 bg-slate-800"
              >
                <p className="text-white text-lg font-medium truncate">
                  {transaction.category}
                </p>

                <p className="text-emerald-400 text-lg font-semibold text-center">
                  ${transaction.amount}
                </p>

                <p className="text-white text-lg font-semibold text-end">
                  {transaction.date.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoardRecentTransaction;

// {recentTransactions.length === 0 ? (
//         <p className="text-slate-400 mt-4 text-center">
//           No transactions this month
//         </p>
//       ) : (
//         recentTransactions.map((transaction) => (
//           <div
//             key={transaction.id}
//             className="grid grid-cols-3 mx-2 rounded-xl px-2 py-2.5 bg-slate-800 border mt-3"
//           >
//             <p className="text-white text-lg font-medium truncate">
//               {transaction.category}
//             </p>

//             <p className="text-emerald-400 text-lg font-semibold text-center">
//               ${transaction.amount}
//             </p>

//             <p className="text-white text-lg font-semibold text-end">
//               {transaction.date.toLocaleDateString()}
//             </p>
//           </div>
//         ))
//       )}
