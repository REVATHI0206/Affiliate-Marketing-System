import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    affiliates: 0,
    orders: 0,
    revenue: 0,
    commission: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("https://affiliate-marketing-system-o8xz.onrender.com/api/analytics");
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
              👑 Admin Dashboard
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Welcome back! Here's what's happening today.
            </p>

          </div>

          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-xl">
            <h2 className="text-lg">Affiliate Marketing</h2>
            <p className="text-sm opacity-80">Management System</p>
          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">

          {/* Users */}

          <div className="bg-gradient-to-r from-cyan-500 to-blue-700 rounded-3xl p-8 shadow-2xl hover:scale-105 duration-300">

            <div className="text-5xl mb-4">👥</div>

            <p className="text-cyan-100">
              Users
            </p>

            <h2 className="text-5xl font-bold text-white mt-4">
              {stats.users}
            </h2>

          </div>

          {/* Affiliates */}

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-8 shadow-2xl hover:scale-105 duration-300">

            <div className="text-5xl mb-4">🤝</div>

            <p className="text-purple-100">
              Affiliates
            </p>

            <h2 className="text-5xl font-bold text-white mt-4">
              {stats.affiliates}
            </h2>

          </div>

          {/* Orders */}

          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 shadow-2xl hover:scale-105 duration-300">

            <div className="text-5xl mb-4">📦</div>

            <p className="text-orange-100">
              Orders
            </p>

            <h2 className="text-5xl font-bold text-white mt-4">
              {stats.orders}
            </h2>

          </div>

          {/* Revenue */}

          <div className="bg-gradient-to-r from-green-500 to-emerald-700 rounded-3xl p-8 shadow-2xl hover:scale-105 duration-300">

            <div className="text-5xl mb-4">💰</div>

            <p className="text-green-100">
              Revenue
            </p>

           <h2 className="text-2xl font-bold truncate">
₹{Number(stats.revenue).toLocaleString("en-IN")}
</h2>
          </div>

          {/* Commission */}

          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-3xl p-8 shadow-2xl hover:scale-105 duration-300">

            <div className="text-5xl mb-4">💸</div>

            <p className="text-yellow-100">
              Commission
            </p>

            <h2 className="text-4xl font-bold text-white mt-4">
              ₹{stats.commission}
            </h2>

          </div>

        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Revenue Overview */}

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold text-white mb-6">
              📈 Revenue Overview
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between text-slate-300">
                <span>Total Revenue</span>
                <span>₹{stats.revenue}</span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>

            </div>

          </div>

          {/* Quick Stats */}

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold text-white mb-6">
              ⚡ Quick Stats
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Active Affiliates
                </span>

                <span className="text-green-400 font-bold">
                  {stats.affiliates}
                </span>

              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Total Orders
                </span>

                <span className="text-cyan-400 font-bold">
                  {stats.orders}
                </span>

              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Total Users
                </span>

                <span className="text-pink-400 font-bold">
                  {stats.users}
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