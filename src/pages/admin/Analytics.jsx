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
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 bg-slate-100 min-h-screen">
        <AdminNavbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">
            Analytics Dashboard
          </h1>

          <p className="text-slate-500 mb-8">
            Overview of AMS
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <Card>
              <CardContent className="p-6">
                <p className="text-slate-500">Users</p>
                <h2 className="text-3xl font-bold">
                  {stats.users}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-slate-500">
                  Affiliates
                </p>
                <h2 className="text-3xl font-bold">
                  {stats.affiliates}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-slate-500">
                  Coupons
                </p>
                <h2 className="text-3xl font-bold">
                  {stats.coupons}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-slate-500">
                  Referrals
                </p>
                <h2 className="text-3xl font-bold">
                  {stats.referrals}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-slate-500">
                  Orders
                </p>
                <h2 className="text-3xl font-bold">
                  {stats.orders}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-slate-500">
                  Revenue
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  ₹
                  {Number(
                    stats.revenue
                  ).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-slate-500">
                  Commission
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  ₹
                  {Number(
                    stats.commission
                  ).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h2>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}