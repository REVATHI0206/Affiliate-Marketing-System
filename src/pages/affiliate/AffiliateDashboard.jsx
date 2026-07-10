import { useEffect, useState } from "react";
import AffiliateSidebar from "../../components/AffiliateSidebar";

export default function AffiliateDashboard() {
  const [stats, setStats] = useState({
    totalCoupons: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const userName =
        localStorage.getItem("userName") || "";

      // Coupons
      const couponRes = await fetch(
        "https://affiliate-marketing-system-o8xz.onrender.com/api/coupons"
      );

      const coupons = await couponRes.json();

      const myCoupons = coupons.filter(
        (coupon) =>
          coupon.affiliateName === userName
      );

      // Earnings
      const user = JSON.parse(localStorage.getItem("user"));

const affiliateId = user._id || user.id;

const earningRes = await fetch(
  `https://affiliate-marketing-system-o8xz.onrender.com/api/earnings/${affiliateId}`
);

const myEarnings = await earningRes.json();

const totalEarnings = myEarnings.reduce(
  (sum, item) => sum + (item.amount || 0),
  0
);
setStats({
  totalCoupons: myCoupons.length,
  totalEarnings,
});
    } catch (error) {
      console.error(error);
    }
  };

return (
  <div className="flex bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen">
    <AffiliateSidebar />

    <div className="ml-72 flex-1 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-white">
            👋 Welcome Back,
          </h1>

          <p className="text-cyan-400 text-2xl font-semibold mt-2">
            {localStorage.getItem("userName")}
          </p>

          <p className="text-slate-400 mt-2">
            Here's what's happening with your affiliate account today.
          </p>
        </div>

        <div className="bg-slate-800 px-6 py-4 rounded-2xl border border-slate-700 shadow-xl">
          <h3 className="text-white font-semibold">
            🚀 Affiliate Dashboard
          </h3>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        {/* Coupons */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">

          <div className="flex justify-between">

            <div>
              <p className="text-cyan-100">
                Total Coupons
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">
                {stats.totalCoupons}
              </h2>
            </div>

            <div className="text-5xl">
              🎟️
            </div>

          </div>

        </div>

        {/* Earnings */}

        <div className="bg-gradient-to-r from-green-500 to-emerald-700 rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">

          <div className="flex justify-between">

            <div>

              <p className="text-green-100">
                Total Earnings
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">
                ₹{stats.totalEarnings}
              </h2>

            </div>

            <div className="text-5xl">
              💰
            </div>

          </div>

        </div>

        {/* Orders */}

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">

          <div className="flex justify-between">

            <div>

              <p className="text-purple-100">
                Orders
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">
                7
              </h2>

            </div>

            <div className="text-5xl">
              📦
            </div>

          </div>

        </div>

        {/* Performance */}

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">

          <div className="flex justify-between">

            <div>

              <p className="text-orange-100">
                Performance
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">
                ⭐95%
              </h2>

            </div>

            <div className="text-5xl">
              🚀
            </div>

          </div>

        </div>

      </div>

      {/* Activity */}

      <div className="mt-10 bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-8">

        <div className="flex justify-between mb-6">

          <h2 className="text-2xl font-bold text-white">
            📈 Recent Activity
          </h2>

          <span className="text-cyan-400">
            Live Updates
          </span>

        </div>

        <div className="space-y-4">

          <div className="bg-slate-800 rounded-xl p-5 flex justify-between hover:bg-slate-700 transition">

            <span className="text-white">
              🎟 Coupon Redeemed
            </span>

            <span className="text-green-400">
              +₹20
            </span>

          </div>

          <div className="bg-slate-800 rounded-xl p-5 flex justify-between hover:bg-slate-700 transition">

            <span className="text-white">
              📦 Order Delivered
            </span>

            <span className="text-cyan-400">
              Completed
            </span>

          </div>

          <div className="bg-slate-800 rounded-xl p-5 flex justify-between hover:bg-slate-700 transition">

            <span className="text-white">
              💸 Commission Status
            </span>

            <span className="text-yellow-400">
              Pending
            </span>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}