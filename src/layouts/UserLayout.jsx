import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import UserNavbar from "../components/UserNavbar";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <UserSidebar />

      <div className="flex-1">
        <UserNavbar />

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}