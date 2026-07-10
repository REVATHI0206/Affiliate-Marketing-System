import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  Bell,
  Search,
} from "lucide-react";

export default function UserNavbar() {
  const userName =
    localStorage.getItem("userName") || "User";

  return (
    <div className="bg-white rounded-3xl shadow-lg px-8 py-5 flex justify-between items-center">

      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold">
          Welcome back,
          <span className="text-violet-600">
            {" "}
            {userName}
          </span>
          👋
        </h2>

        <p className="text-gray-500 mt-1">
          Ready for your next shopping?
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-violet-500 w-64"
          />

        </div> */}

        <button className="relative p-3 rounded-xl bg-slate-100 hover:bg-violet-100">

          <Bell size={20} />

          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            2
          </span>

        </button>

        <Link
          to="/user/cart"
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl"
        >
          <ShoppingCart size={18} />
          Cart
        </Link>

        <Link
          to="/user/orders"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
        >
          <Package size={18} />
          Orders
        </Link>

      </div>

    </div>
  );
}