import Dashboard from "./UserSidebar/Dashboard";
import Budget from "./UserSidebar/Budgets";
import Report from "./UserSidebar/Reports";
import Transactions from "./UserSidebar/Transactions";
import { PlusCircle } from "lucide-react";

function UserPanel({
  open,
  section,
  setSection,
}: {
  open: boolean;
  section: string;
  setSection: (section: string) => void;
}) {
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
          />
        )}
      </div>

      <div className="mt-6 h-px bg-white/60"></div>

      <p className="mt-8">
        {section === "Dashboard" && <Dashboard setSection={setSection} />}
        {section === "Budget" && <Budget setSection={setSection} />}
        {section === "Report" && <Report setSection={setSection} />}
        {section === "Transactions" && <Transactions />}
      </p>
    </div>
  );
}

export default UserPanel;
