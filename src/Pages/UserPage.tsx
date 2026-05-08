// import UserNavbar from "../Components/User/UserNavbar";
import Sidebar from "../Components/User/UserSidebar/Sidebar";
import UserPanel from "../Components/User/UserPanel";
import { useState } from "react";

type Profile = {
  username: string;
  photoURL: string;
};
function UserPage() {
  const [open, setOpen] = useState<boolean>(true);
  const [section, setSection] = useState<string>("Dashboard");
  const [initialProfile, setInitialProfile] = useState<Profile>({
      username: "",
      photoURL: "",
    });
    const [profile, setProfile] = useState<Profile>({
      username: "",
      photoURL: "",
    });
  

  return (
    <div className="bg-slate-900 text-slate-400 min-h-screen flex flex-col">
      {/* <UserNavbar /> */}

      <div className="flex flex-1 gap-10">
        <Sidebar open={open} setOpen={setOpen} setSection={setSection} profile={profile}/>
        <UserPanel open={open} section={section} setSection={setSection} profile={profile} setProfile={setProfile} initialProfile={initialProfile} setInitialProfile={setInitialProfile}/>
      </div>
    </div>
  );
}

export default UserPage;
