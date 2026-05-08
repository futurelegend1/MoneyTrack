import { User, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import type { User as FirebaseUser } from "firebase/auth";

type Profile = {
  username: string;
  photoURL: string;
};
const SettingProfile = ({
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
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  // Listen for changes in the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Fetch the user's profile data
  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const fetchedName = userData.username || user.displayName || "";
          const fetchedPhoto = user.photoURL || "";

          const data = {
            username: fetchedName,
            photoURL: fetchedPhoto,
          };

          setProfile(data);
          setInitialProfile(data);
        }
      } catch (_error) {
        console.error("There was an error fetching the user", _error);
      } finally {
        setTimeout(() => setLoading(false), 350);
      }
    };
    fetchUser();
  }, [user]);

  const handleUserUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setUpdating(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        displayName: profile.username,
        photoURL: profile.photoURL,
        username: profile.username,
      });
      setInitialProfile({
        username: profile.username,
        photoURL: profile.photoURL,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const isDifferent =
    profile.username.trim() !== initialProfile.username.trim() ||
    profile.photoURL !== initialProfile.photoURL;

  if (loading) {
    return (
      <p className="text-white text-2xl font-bold flex items-center justify-center">
        Loading Your Setting...
      </p>
    );
  }

  if (updating) {
    return (
      <p className="text-white text-2xl font-bold flex items-center justify-center">
        Saving Your Setting...
      </p>
    );
  }

  return (
    <form
      onSubmit={handleUserUpdate}
      className="w-full h-full space-y-10 animate-in fade-in slide-in-from-right-4 duration-300"
    >
      {/* Header Section with Save Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Public Profile</h3>
          <p className="text-slate-400 text-md">
            Manage how others see you on the platform.
          </p>
        </div>

        <button
          type="submit"
          disabled={!isDifferent || updating}
          className={`px-8 py-2 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
            isDifferent && !updating
              ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
          }`}
        >
          {updating && <Loader2 className="animate-spin" size={20} />}
          {updating ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="space-y-10">
        {/* Avatar Section */}
        <div className="flex items-center gap-8">
          <div className="h-24 w-24 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-500 overflow-hidden">
            {profile.photoURL ? (
              <img
                src={profile.photoURL}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} />
            )}
          </div>
          <button
            type="button"
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-md text-white transition"
          >
            Change Avatar
          </button>
        </div>

        {/* Inputs Section */}
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-3 flex flex-col">
            <label className="text-sm font-bold uppercase tracking-widest text-slate-400">
              Display Name
            </label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => {
                setProfile({ ...profile, username: e.target.value });
              }}
              className="w-1/3 bg-slate-800 border border-slate-700 rounded-xl p-4 text-lg text-white focus:ring-2 focus:ring-cyan-500 outline-none transition shadow-inner"
              placeholder="Your name"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SettingProfile;
