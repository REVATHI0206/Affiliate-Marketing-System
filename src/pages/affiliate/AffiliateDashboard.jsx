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
        "http://localhost:5000/api/coupons"
      );

      const coupons = await couponRes.json();

      const myCoupons = coupons.filter(
        (coupon) =>
          coupon.affiliateName === userName
      );

      // Earnings
      const earningRes = await fetch(
        "http://localhost:5000/api/earnings"
      );

      const earnings = await earningRes.json();

      const myEarnings = earnings.filter(
        (item) =>
          item.affiliateName === userName
      );

      const totalEarnings =
        myEarnings.reduce(
          (sum, item) =>
            sum + (item.amount || 0),
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
    <div className="flex">
      <AffiliateSidebar />

      <div className="ml-64  flex-1 p-8 bg-slate-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-2">
          Affiliate Dashboard
        </h1>

       
       
        <h2 className="text-slate-800 mb-8">
  Welcome {localStorage.getItem("userName")}
</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-slate-500">
              Total Coupons
            </h3>

            <p className="text-3xl font-bold">
              {stats.totalCoupons}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-slate-500">
              Total Earnings
            </h3>

            <p className="text-3xl font-bold text-green-600">
              ₹{stats.totalEarnings}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}