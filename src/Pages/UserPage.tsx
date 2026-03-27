// import UserNavbar from "../Components/User/UserNavbar";
import Sidebar from "../Components/User/UserSidebar/Sidebar";
import UserPanel from "../Components/User/UserPanel";
import { useState } from "react";

function UserPage() {
  const [open, setOpen] = useState<boolean>(true);
  const [section, setSection] = useState<string>("Dashboard");

  return (
    <div className="bg-slate-900 text-slate-400 min-h-screen flex flex-col">
      {/* <UserNavbar /> */}

      <div className="flex flex-1 gap-10">
        <Sidebar open={open} setOpen={setOpen} setSection={setSection} />
        <UserPanel open={open} section={section} setSection={setSection} />
      </div>
    </div>
  );
}

export default UserPage;
