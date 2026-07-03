import { Link, useNavigate } from "react-router-dom";

export default function UserSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
<div className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white p-6 z-50">      <h1 className="text-2xl font-bold mb-10">
        User Panel
      </h1>

      <div className="flex flex-col gap-4 flex-1">
        <Link
          to="/user/dashboard"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          Dashboard
        </Link>

        <Link
          to="/user/products"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          Products
        </Link>

        <Link
          to="/user/cart"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          Cart
        </Link>

        <Link
          to="/user/orders"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          My Orders
        </Link>

        <Link
          to="/user/profile"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          Profile
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="p-3 rounded-lg bg-red-600 hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}