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
    <div className="fixed top-0 left-0 w-64 h-screen bg-slate-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-10">
        AMS 🚀
      </h2>

      <nav className="space-y-6">
        <Link
          to="/affiliate/dashboard"
          className="block hover:text-yellow-400"
        >
          Dashboard
        </Link>

        <Link
          to="/affiliate/coupons"
          className="block hover:text-yellow-400"
        >
          Coupons
        </Link>

        <Link
          to="/affiliate/earnings"
          className="block hover:text-yellow-400"
        >
          Earnings
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded mt-10 hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}