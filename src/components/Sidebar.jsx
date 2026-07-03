// import { Link } from "react-router-dom";
// import {
//   LayoutDashboard,
//   UserRound,
//   Users,
//   Gift,
//   Wallet,
//   CreditCard,
//   BarChart3,
//   Link2,
//   FileText,
// } from "lucide-react";

// export default function Sidebar() {
//   const role = localStorage.getItem("role");
//   const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("role");
//   navigate("/");
// };

//   const adminMenus = [
//     {
//       icon: LayoutDashboard,
//       label: "Dashboard",
//       path: "/admin/dashboard",
//     },
//     {
//       icon: UserRound,
//       label: "Affiliates",
//       path: "/admin/affiliates",
//     },
//     {
//       icon: CreditCard,
//       label: "Payouts",
//       path: "/admin/payouts",
//     },
//     {
//       icon: BarChart3,
//       label: "Analytics",
//       path: "/admin/analytics",
//     },
//     {
//       icon: FileText,
//       label: "Rules",
//       path: "/admin/rules",
//     },
//     {
//       icon: Link2,
//       label: "Rule Mapping",
//       path: "/admin/rule-mapping",
//     },
//   ];

//   const affiliateMenus = [
//     {
//       icon: LayoutDashboard,
//       label: "Dashboard",
//       path: "/affiliate/dashboard",
//     },
//     {
//       icon: Users,
//       label: "Referrals",
//       path: "/affiliate/referrals",
//     },
//     {
//       icon: Gift,
//       label: "Coupons",
//       path: "/affiliate/coupons",
//     },
//     {
//       icon: Wallet,
//       label: "Earnings",
//       path: "/affiliate/earnings",
//     },
    
//   ];

//   const menus =
//     role === "admin"
//       ? adminMenus
//       : affiliateMenus;
// <button
//   onClick={() => {
//     localStorage.clear();
//     window.location.href = "/";
//   }}
// >
//   Logout
// </button>
//   return (
//     <div className="w-64 bg-slate-950 text-white min-h-screen p-5">
//       <h1 className="text-2xl font-bold mb-10">
//         AMS 🚀
//       </h1>

//       <div className="space-y-2">
//         {menus.map((item) => (
//           <Link
//             key={item.label}
//             to={item.path}
//             className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition"
//           >
//             <item.icon size={18} />
//             {item.label}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  Users,
  Gift,
  Wallet,
  CreditCard,
  BarChart3,
  Link2,
  FileText,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const adminMenus = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: UserRound, label: "Affiliates", path: "/admin/affiliates" },
    { icon: CreditCard, label: "Payouts", path: "/admin/payouts" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: FileText, label: "Rules", path: "/admin/rules" },
    { icon: Link2, label: "Rule Mapping", path: "/admin/rule-mapping" },
  ];

  const affiliateMenus = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/affiliate/dashboard" },
    { icon: Users, label: "Referrals", path: "/affiliate/referrals" },
    { icon: Gift, label: "Coupons", path: "/affiliate/coupons" },
    { icon: Wallet, label: "Earnings", path: "/affiliate/earnings" },
  ];

  const menus = role === "admin" ? adminMenus : affiliateMenus;

  return (
    <div className="w-64 bg-slate-950 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">AMS 🚀</h1>

      <div className="space-y-2">
        {menus.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
 className="mt-10 w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
    >      
        Logout
      </button>
    </div>
  );
}