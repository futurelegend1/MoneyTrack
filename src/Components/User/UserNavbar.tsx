import IconMoneyTrack from "../../assets/IconMoneyTrack";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

function UserNavbar() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const defaultPhotoURL =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

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
      console.log("Auth state changed, current user:", currentUser);
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

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const menuStyle = "px-2 py-2 rounded-2xl text-left hover:bg-slate-600 border-transparent hover:translate-x-1 transition-all";

  return (
    <nav className="bg-slate-800 text-slate-400 p-8 flex items-center justify-between">
      <div className="flex items-center gap-4 pl-8">
        <IconMoneyTrack className="w-15 h-15" />
        <h1 className="text-3xl text-emerald-400 font-bold">MoneyTrack</h1>
      </div>

      <div className="flex items-center gap-4 pr-8">
        <img
          onClick={handleToggle}
          src={user?.photoURL || defaultPhotoURL}
          alt="User Avatar"
          onError={(e) => (e.currentTarget.src = defaultPhotoURL)}
          className="w-12 h-12 border-white border-2 rounded-full hover:scale-110 object-cover transform transition-all duration-200"
        />
        <button
          className="text-lg hover:scale-105 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-3xl transition-all transform duration-200"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div
        className={`transform transition-transform duration-300 border-l-2 border-l-white/60 fixed top-0 right-0 h-full w-70 shadow-lg rounded-l-3xl bg-slate-700 ${toggle ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <button
            onClick={handleToggle}
            className="text-white text-2xl self-start pl-6 pt-4"
          >
            X
          </button>
          <img
            src={user?.photoURL || defaultPhotoURL}
            alt="User Avatar"
            onError={(e) => (e.currentTarget.src = defaultPhotoURL)}
            className="self-center mt-2 w-12 h-12 border-white border-2 rounded-full hover:scale-110 object-cover transform transition-all duration-200"
          />
          <h2 className="text-white text-xl self-center mt-2">
            {username || user?.email}
          </h2>

          <div className="h-px bg-white/60 mx-10 my-6"></div>

          <div className="mt-6 flex flex-col gap-4 font-semibold text-white text-lg px-4">
            <button className={menuStyle}>⚙️ Settings</button>
            <button className={menuStyle}>👤 Profile</button>
            <button className={menuStyle} onClick={handleSignOut}>🚪 Logout</button>
            <button className={menuStyle}>❓ Help</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
