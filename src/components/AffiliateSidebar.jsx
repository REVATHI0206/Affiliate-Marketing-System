import { Link, useNavigate } from "react-router-dom";

export default function AffiliateSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all stored login data
    localStorage.clear();

    // Redirect to Login page
   navigate("/", { replace: true });
  };

  return (
  <div className="fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white shadow-2xl flex flex-col">

    {/* Logo */}
    <div className="px-8 py-8 border-b border-slate-700">
      <h1 className="text-4xl font-extrabold tracking-wide">
        AMS
        <span className="text-cyan-400"> 🚀</span>
      </h1>

      <p className="text-slate-400 text-sm mt-2">
        Affiliate Management
      </p>
    </div>

    {/* Menu */}
    <nav className="flex-1 px-5 py-8 space-y-3">

      <Link
        to="/affiliate/dashboard"
        className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <span className="text-2xl">🏠</span>
        <span className="font-medium">Dashboard</span>
      </Link>

      <Link
        to="/affiliate/coupons"
        className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <span className="text-2xl">🎟️</span>
        <span className="font-medium">Coupons</span>
      </Link>

      <Link
        to="/affiliate/earnings"
        className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-600 hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <span className="text-2xl">💰</span>
        <span className="font-medium">Earnings</span>
      </Link>

    </nav>

    {/* Logout */}
    <div className="p-6 border-t border-slate-700">
      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
      >
        🚪 Logout
      </button>
    </div>

  </div>
);
}