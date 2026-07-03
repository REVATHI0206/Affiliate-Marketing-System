import { Link } from "react-router-dom";

export default function AffiliateSidebar() {
  return (
<div className="fixed top-0 left-0 w-64 h-screen bg-slate-900 text-white">      <h2 className="text-3xl font-bold mb-10">
        AMS 🚀
      </h2>

      <nav className="space-y-6">
        <Link
          to="/affiliate/dashboard"
          className="block"
        >
          Dashboard
        </Link>

        
        

        <Link
          to="/affiliate/coupons"
          className="block"
        >
          Coupons
        </Link>

        <Link
          to="/affiliate/earnings"
          className="block"
        >
          Earnings
        </Link>
      </nav>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="bg-red-600 px-4 py-2 rounded mt-10"
      >
        Logout
      </button>
    </div>
  );
}