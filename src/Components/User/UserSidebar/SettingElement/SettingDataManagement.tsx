import { Trash2 } from "lucide-react";

const SettingDataManagement = () => {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h3 className="text-xl font-semibold text-white">Storage & Data</h3>
        <p className="text-slate-400 text-sm">
          Control your transaction history and backups.
        </p>
      </div>

      <div className="p-6 bg-slate-800/50 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-slate-200">Export Transactions</p>
            <p className="text-xs text-slate-500 text-balance">
              Download all your records as a .csv file for Excel.
            </p>
          </div>
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg text-sm transition">
            Export
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800">
        <h4 className="text-red-400 font-bold mb-4">Danger Zone</h4>
        <button className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl transition w-full">
          <Trash2 size={18} />
          <span>Delete all transaction data permanently</span>
        </button>
      </div>
    </div>
  );
};

export default SettingDataManagement;
