import AddCategory from "./AddCategory";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Sidebar({
  open,
  setOpen,
  setSection,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
}) {
  const toggleSidebar = () => setOpen(!open);

  const menuStyle = "mb-2 flex items-center justify-center px-3 py-2 border-transparent rounded-4xl hover:bg-slate-600 transition-colors duration-300 cursor-pointer";
  const menuLableStyle = "text-xl text-white font-bold";

  return (
    <div
      className={`fixed left-0 top-40 h-[calc(100vh-12rem)] w-50 bg-slate-800 text-slate-400 px-5 pb-28 pt-12 flex flex-col shadow-lg transition-transform rounded-r-[70px] duration-300 z-40 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div onClick={toggleSidebar} className="group hover:text-emerald-600 transition-colors duration-300 absolute top-1/2 -right-10 -translate-y-1/2 bg-slate-800 text-white w-10 h-45 flex items-center justify-center rounded-r-full">
        <button
          className="flex justify-center items-center text-4x"
        >
          {open ? <ChevronLeft size={45} className="group-hover:scale-130 transition-transform duration-300"/> : <ChevronRight size={45} className="group-hover:scale-130 transition-transform duration-300"/>}
        </button>
      </div>

      <div className="h-px bg-white/60 mb-2"></div>

      <div className="flex flex-col items-start gap-2 overflow-y-auto">
        <button onClick={() => setSection("Dashboard")} className={menuStyle}>
            <h2 className={menuLableStyle}>Dashboard</h2>
        </button>
        <button onClick={() => setSection("Budget")} className={menuStyle}>
          <h2 className={menuLableStyle}>Budgets</h2>
        </button>
        <button onClick={() => setSection("Report")} className={menuStyle}>
          <h2 className={menuLableStyle}>Reports</h2>
        </button>
        <button onClick={() => setSection("Transactions")} className={menuStyle}>
          <h2 className={menuLableStyle}>Transactions</h2>
        </button>
        <button onClick={() => setSection("Saving")} className={menuStyle}>
          <h2 className={menuLableStyle}>Savings</h2>
        </button>
        <button onClick={() => setSection("Debt")} className={menuStyle}>
          <h2 className={menuLableStyle}>Debt</h2>
        </button>
      </div>

      <div className="h-px w-3/4 bg-white/40 absolute bottom-25 left-1/2 -translate-x-1/2"></div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full">
        <AddCategory />
      </div>
    </div>
  );
}
export default Sidebar;
