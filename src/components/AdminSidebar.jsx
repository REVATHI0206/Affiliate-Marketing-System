import {
  LayoutDashboard,
  Package,
  Users,
  Wallet,
  BarChart3,
  Settings2,
  Link2,
  ShoppingCart,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={20} />,
    },
    {
      name: "Affiliates",
      path: "/admin/affiliates",
      icon: <Users size={20} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Payouts",
      path: "/admin/payouts",
      icon: <Wallet size={20} />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Rules",
      path: "/admin/rules",
      icon: <Settings2 size={20} />,
    },
    {
      name: "Rule Mapping",
      path: "/admin/rule-mapping",
      icon: <Link2 size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-black border-r border-slate-800 shadow-2xl">

      {/* Logo */}

      <div className="p-8 border-b border-slate-800">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            A
          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">
              AMS Admin
            </h1>

            <p className="text-slate-400 text-sm">
              Control Center
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="p-6 space-y-3">

        {menus.map((menu) => (

          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
              location.pathname === menu.path
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg scale-[1.02]"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {menu.icon}

            <span className="font-medium">
              {menu.name}
            </span>

          </Link>

        ))}

      </nav>

      {/* Footer */}

      <div className="absolute bottom-8 left-6 right-6">

       

      </div>

    </aside>
  );
}