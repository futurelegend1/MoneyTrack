import Dashboard from "./UserSidebar/Dashboard";
import Budget from "./UserSidebar/Budgets";
import Report from "./UserSidebar/Reports";
import Transactions from "./UserSidebar/Transactions";
import Saving from "./UserSidebar/Saving";
import Debt from "./UserSidebar/Debt";
import Settings from "./UserSidebar/Settings";
import ChatBot from "./UserSidebar/ChatBot";
import Help from "./UserSidebar/Help";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

type Profile = {
  username: string;
  photoURL: string;
};

function UserPanel({
  open,
  section,
  setSection,
  profile,
  setProfile,
  initialProfile,
  setInitialProfile,
}: {
  open: boolean;
  section: string;
  setSection: React.Dispatch<React.SetStateAction<string>>;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  initialProfile: Profile;
  setInitialProfile: React.Dispatch<React.SetStateAction<Profile>>;
}) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showSavingForm, setShowSavingForm] = useState<boolean>(false);
  const [showDebtForm, setShowDebtForm] = useState<boolean>(false);

  // h-[calc(100vh-12rem)]
  return (
    <div
      className={`h-[calc(100vh-5rem)] flex flex-col my-10 mr-8 px-8 py-8 w-full bg-slate-800 rounded-3xl transition-all duration-400 ${
        open ? "ml-85" : "ml-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Welcome to your {section}!
        </h1>

        {(section === "Transactions" && (
          <PlusCircle
            size={50}
            className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 cursor-pointer"
            onClick={() => setShowForm(true)}
          />
        )) ||
          (section === "Saving" && (
            <PlusCircle
              size={50}
              className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 cursor-pointer"
              onClick={() => setShowSavingForm(true)}
            />
          )) ||
          (section === "Debt" && (
            <PlusCircle
              size={50}
              className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 cursor-pointer"
              onClick={() => setShowDebtForm(true)}
            />
          ))}
      </div>

      <div className="mt-6 h-px bg-white/60"></div>


      <div className="mt-4 h-full overflow-hidden">
        {section === "Dashboard" && <Dashboard setSection={setSection} />}
        {section === "Budget" && <Budget setSection={setSection} />}
        {section === "Report" && <Report setSection={setSection} />}
        {section === "Transactions" && (
          <Transactions showForm={showForm} setShowForm={setShowForm} />
        )}
        {section === "Saving" && (
          <Saving
            showSavingForm={showSavingForm}
            setShowSavingForm={setShowSavingForm}
          />
        )}
        {section === "Debt" && (
          <Debt showDebtForm={showDebtForm} setShowDebtForm={setShowDebtForm} />
        )}
        {section === "Settings" && <Settings profile={profile} setProfile={setProfile} initialProfile={initialProfile} setInitialProfile={setInitialProfile}/>}
        {section === "ChatBot" && <ChatBot />}
        {section === "Help" && <Help />}
      </div>
    </div>
  );
}

export default UserPanel;
