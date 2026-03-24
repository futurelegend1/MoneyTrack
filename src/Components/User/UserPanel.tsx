import Dashboard from "./UserSidebar/Dashboard";
import Budget from "./UserSidebar/Budgets";
import Report from "./UserSidebar/Reports";
import Transactions from "./UserSidebar/Transactions";
import Saving from "./UserSidebar/Saving";
import Debt from "./UserSidebar/Debt"
import { PlusCircle } from "lucide-react";
import { useState } from "react";

function UserPanel({
  open,
  section,
  setSection,
}: {
  open: boolean;
  section: string;
  setSection: (section: string) => void;
}) {
  const [showForm, setShowForm] = useState<boolean>(false); 
  const [showSavingForm, setShowSavingForm] = useState<boolean>(false);
  const [showDebtForm, setShowDebtForm] = useState<boolean>(false);

  return (
    <div
      className={`mt-10 mr-8 px-8 py-8 h-[calc(100vh-12rem)] w-full bg-slate-800 rounded-3xl transition-all duration-300 ${
        open ? "ml-80" : "ml-40"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Welcome to your {section}!
        </h1>

        {section === "Transactions" && (
          <PlusCircle
            size={50}
            className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 cursor-pointer"
            onClick={() => setShowForm(true)}
          />
        ) || section === "Saving" && (
          <PlusCircle
            size={50}
            className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 cursor-pointer"
            onClick={() => setShowSavingForm(true)}
          />
        ) || section === "Debt" && (
          <PlusCircle
            size={50}
            className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 cursor-pointer"
            onClick={() => setShowDebtForm(true)}
          />
        )}
      </div>

      <div className="mt-6 h-px bg-white/60"></div>

      <div className="mt-8">
        {section === "Dashboard" && <Dashboard setSection={setSection} />}
        {section === "Budget" && <Budget setSection={setSection} />}
        {section === "Report" && <Report setSection={setSection} />}
        {section === "Transactions" && <Transactions showForm={showForm} setShowForm={setShowForm} />}
        {section === "Saving" && <Saving showSavingForm={showSavingForm} setShowSavingForm={setShowSavingForm}/>}
        {section === "Debt" && <Debt showDebtForm={showDebtForm} setShowDebtForm={setShowDebtForm}/>}
      </div>
    </div>
  );
}

export default UserPanel;
