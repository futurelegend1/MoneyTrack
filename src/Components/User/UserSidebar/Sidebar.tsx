import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Wallet,
  BarChart2,
  ReceiptText,
  PiggyBank,
  TrendingDown,
  Settings,
  LogOut,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import IconMoneyTrack from "../../../assets/IconMoneyTrack";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function Sidebar({
  open,
  setOpen,
  setSection,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("Dashboard");
  const navigate = useNavigate();
  const defaultPhotoURL =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const toggleSidebar = () => setOpen(!open);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const fetchUsername = async () => {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          }
        };
        fetchUsername();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuStyle = (item: string) =>
    `w-full gap-4 flex px-3 py-2 ${
    open ? "justify-start" : "justify-center"
  } rounded-xl transition-colors duration-300 cursor-pointer ${
    activeSection === item
      ? "bg-slate-600 text-white"
      : "hover:bg-slate-600"
  }`;
  const menuLableStyle = "text-lg text-white font-small";

  //h-[calc(100vh-12rem)]
  return (
    <div
      className={`fixed left-10 top-10 bottom-10 ${open ? "w-65" : "w-30"} bg-slate-800 text-slate-400 px-5 py-8 flex flex-col shadow-lg transition-all rounded-4xl duration-400 z-40`}
    >
      <div className={`flex items-center ${open ? "justify-start gap-2" : "justify-center"}`}>
        <IconMoneyTrack className="w-12 h-12 text-white shrink-0" />
        {open && <h1 className="text-2xl font-medium text-white">MoneyTrack</h1>}
      </div>

      <div className="h-px bg-white/60 my-4"></div>

      <div className="flex flex-col items-start gap-2">
        <button onClick={() => {setSection("Dashboard"); setActiveSection("Dashboard")}} className={menuStyle("Dashboard")}>
          <LayoutDashboard size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>Dashboard</h2>}
        </button>
        <button onClick={() => {setSection("Budget"); setActiveSection("Budget")}} className={menuStyle("Budget")}>
          <Wallet size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>Budgets</h2>}
        </button>
        <button onClick={() => {setSection("Report"); setActiveSection("Report")}} className={menuStyle("Report")}>
          <BarChart2 size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>Reports</h2>}
        </button>
        <button
          onClick={() => {setSection("Transactions"); setActiveSection("Transactions")}}
          className={menuStyle("Transactions")}
        >
          <ReceiptText size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>Transactions</h2>}
        </button>
        <button onClick={() => {setSection("Saving"); setActiveSection("Saving")}} className={menuStyle("Saving")}>
          <PiggyBank size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>Savings</h2>}
        </button>
        <button onClick={() => {setSection("Debt"); setActiveSection("Debt")}} className={menuStyle("Debt")}>
          <TrendingDown size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>Debt</h2>}
        </button>
      </div>

      <div className="h-px bg-white/60 my-4"></div>

      <div className="flex flex-col items-start gap-2">
        <button className={menuStyle("Settings")}>
          <Settings size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>Settings</h2>}
        </button>
        <button className={menuStyle("ChatBot")}>
          <MessageCircle size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>ChatBot</h2>}
        </button>
        <button className={menuStyle("Help")}>
          <HelpCircle size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>Help</h2>}
        </button>
        <button className={menuStyle("Logout")} onClick={handleSignOut}>
          <LogOut size={28} className="text-white shrink-0" />
          {open && <h2 className={menuLableStyle}>Logout</h2>}
        </button>
        <button
          onClick={toggleSidebar}
          className={`text-white ${open ? "self-end" : "self-center"} w-8 h-8 flex items-center justify-center my-2 rounded-lg border-2 hover:bg-emerald-500 hover:scale-110 transition-all duration-200`}>
          {open ? (
            <ChevronLeft
              size={28}
              className="group-hover:scale-130 transition-transform duration-300"
            />
          ) : (
            <ChevronRight
              size={28}
              className="group-hover:scale-130 transition-transform duration-300"
            />
          )}
        </button>
      </div>

      <div className="h-px bg-white/60 my-4"></div>

      <div className={`flex items-center ${open ? "justify-start" : "justify-center"} gap-4`}>
        <img
          src={user?.photoURL || defaultPhotoURL}
          alt="User Avatar"
          onError={(e) =>
            ((e.target as HTMLImageElement).src = defaultPhotoURL)
          }
          className="shrink-0 rounded-full w-11 h-11 hover:scale-110 border-2 border-transparent hover:border-emerald-500 transition-all duration-200"
        />
        {open && <h2 className="text-white font-semibold">{username || user?.displayName ||user?.email}</h2>}
      </div>
    </div>
  );
}
export default Sidebar;
