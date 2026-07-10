import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import { Card, CardContent } from "@/components/ui/card";

export default function Analytics() {
  const API =
    "https://affiliate-marketing-system-o8xz.onrender.com";

  const [stats, setStats] = useState({
    users: 0,
    affiliates: 0,
    coupons: 0,
    referrals: 0,
    orders: 0,
    revenue: 0,
    commission: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(
        `${API}/api/analytics`
      );

      const data = await res.json();

      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="flex bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen">

    <AdminSidebar />

    <div className="ml-72 flex-1">

      <AdminNavbar />

      <div className="p-10">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-5xl font-bold text-white">
              📊 Analytics Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Real-time Affiliate Marketing Insights
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 rounded-2xl shadow-xl text-white">
            <h2 className="font-bold text-lg">
              Live Analytics
            </h2>
          </div>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          <div className="bg-gradient-to-r from-cyan-500 to-blue-700 rounded-3xl p-7 shadow-2xl hover:scale-105 duration-300">
            <div className="text-5xl">👥</div>
            <p className="text-cyan-100 mt-5">Users</p>
            <h2 className="text-5xl font-bold text-white mt-3">
              {stats.users}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-violet-500 to-purple-700 rounded-3xl p-7 shadow-2xl hover:scale-105 duration-300">
            <div className="text-5xl">🤝</div>
            <p className="text-violet-100 mt-5">
              Affiliates
            </p>
            <h2 className="text-5xl font-bold text-white mt-3">
              {stats.affiliates}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl p-7 shadow-2xl hover:scale-105 duration-300">
            <div className="text-5xl">🎟️</div>
            <p className="text-pink-100 mt-5">
              Coupons
            </p>
            <h2 className="text-5xl font-bold text-white mt-3">
              {stats.coupons}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-7 shadow-2xl hover:scale-105 duration-300">
            <div className="text-5xl">🔗</div>
            <p className="text-orange-100 mt-5">
              Referrals
            </p>
            <h2 className="text-5xl font-bold text-white mt-3">
              {stats.referrals}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-3xl p-7 shadow-2xl hover:scale-105 duration-300">
            <div className="text-5xl">📦</div>
            <p className="text-yellow-100 mt-5">
              Orders
            </p>
            <h2 className="text-5xl font-bold text-white mt-3">
              {stats.orders}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-700 rounded-3xl p-7 shadow-2xl hover:scale-105 duration-300">
            <div className="text-5xl">💰</div>
            <p className="text-green-100 mt-5">
              Revenue
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              ₹
              {Number(stats.revenue).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>

          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-700 rounded-3xl p-7 shadow-2xl hover:scale-105 duration-300">
            <div className="text-5xl">💸</div>
            <p className="text-emerald-100 mt-5">
              Commission
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              ₹
              {Number(stats.commission).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>

          </div>

        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl text-white font-bold mb-6">
              📈 Revenue Performance
            </h2>

            <div className="w-full bg-slate-700 rounded-full h-5">

              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-5 rounded-full"
                style={{ width: "82%" }}
              ></div>

            </div>

            <p className="text-slate-400 mt-4">
              Revenue Growth: <span className="text-green-400">+82%</span>
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl text-white font-bold mb-6">
              ⚡ Quick Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span className="text-slate-400">Users</span>
                <span className="text-cyan-400 font-bold">{stats.users}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Orders</span>
                <span className="text-yellow-400 font-bold">{stats.orders}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Revenue</span>
                <span className="text-green-400 font-bold">
                  ₹{stats.revenue}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Commission</span>
                <span className="text-pink-400 font-bold">
                  ₹{stats.commission}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}