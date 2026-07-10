import { LogOut, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Search } from "lucide-react";
export default function AdminNavbar() {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-900 border-b border-slate-700 px-10 py-5 flex justify-between items-center shadow-lg">

      {/* Left */}

      <div>

        <h2 className="text-3xl font-bold text-white">
          👋 Welcome Admin
        </h2>

        <p className="text-slate-400 mt-1">
          Affiliate Marketing Management System
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-800 text-white pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

        </div>

        {/* Notification */}

        <button className="relative bg-slate-800 hover:bg-slate-700 p-3 rounded-xl transition">

          <Bell size={20} className="text-white" />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>

        </button>

        {/* Admin Avatar */}

        <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl">

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold">
            A
          </div>

          <div className="hidden lg:block">
            <h3 className="text-white font-semibold">
              Admin
            </h3>
            <p className="text-slate-400 text-sm">
              Super Admin
            </p>
          </div>

        </div>

        {/* Logout */}

        <button
  onClick={() => {
    localStorage.clear();
    navigate("/");
  }}
  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg"
>
  <LogOut size={18} />
  Logout
</button>
      </div>

    </div>
  );
}