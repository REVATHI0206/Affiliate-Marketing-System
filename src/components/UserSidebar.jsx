import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Package,
  User,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menus = [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/user/products",
      icon: <ShoppingBag size={20} />,
    },
    {
      name: "Cart",
      path: "/user/cart",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "My Orders",
      path: "/user/orders",
      icon: <Package size={20} />,
    },
    {
      name: "Profile",
      path: "/user/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-violet-700 via-indigo-700 to-slate-900 text-white shadow-2xl">

      <div className="p-8">

        <div className="text-center">

          <div className="w-20 h-20 rounded-full bg-white text-violet-700 flex items-center justify-center text-3xl font-bold mx-auto">
            A
          </div>

          <h1 className="text-2xl font-bold mt-4">
            Affiliate Shop
          </h1>

          <p className="text-violet-200 text-sm">
            Welcome Back 👋
          </p>

        </div>

        <div className="mt-12 space-y-3">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                location.pathname === menu.path
                  ? "bg-white text-violet-700 shadow-lg"
                  : "hover:bg-white/20"
              }`}
            >
              {menu.icon}

              <span className="font-medium">
                {menu.name}
              </span>

            </Link>

          ))}

        </div>

      </div>

      <div className="absolute bottom-8 left-6 right-6">

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}