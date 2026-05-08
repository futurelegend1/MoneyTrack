import { useState } from "react";
import SettingProfile from "./SettingElement/SettingProfile";
import SettingPreferences from "./SettingElement/SettingPreferences";
import SettingDataManagement from "./SettingElement/SettingDataManagement";
import SettingSecurity from "./SettingElement/SettingSecurity";
import { User, Shield, Database, Palette } from "lucide-react";

type Profile = {
  username: string;
  photoURL: string;
};

const Setting = ({
  profile,
  setProfile,
  initialProfile,
  setInitialProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  initialProfile: Profile;
  setInitialProfile: React.Dispatch<React.SetStateAction<Profile>>;
}) => {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "preferences", label: "Preferences", icon: <Palette size={20} /> },
    { id: "data", label: "Data Management", icon: <Database size={20} /> },
    { id: "security", label: "Security", icon: <Shield size={20} /> },
  ];

  return (
    <div className="flex h-full w-full bg-slate-900 text-slate-200 font-sans p-6 rounded-3xl">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-400 pr-6">
        <h2 className="text-2xl font-bold text-white mb-8 px-2">Settings</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pl-10 overflow-y-auto">
        {activeTab === "profile" && (
          <SettingProfile profile={profile} setProfile={setProfile} initialProfile={initialProfile} setInitialProfile={setInitialProfile}/>
        )}

        {activeTab === "preferences" && <SettingPreferences />}

        {activeTab === "data" && <SettingDataManagement />}

        {activeTab === "security" && <SettingSecurity />}
      </main>
    </div>
  );
};

export default Setting;
