import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import { Card, CardContent } from "@/components/ui/card";

export default function Payouts() {
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
  try {
    const res = await fetch(
      "https://affiliate-marketing-system-o8xz.onrender.com/api/earnings"
    );

    const data = await res.json();

    const grouped = {};

    data.forEach((item) => {
      const affiliateId = item.affiliate?._id;

  grouped[affiliateId] = {
  affiliateId: affiliateId,
  affiliate: item.affiliate?.name || "N/A",
  customer: item.customer?.name || "N/A",
  commission: 0,
  paid: 0,
  pending: 0,
  status: "Paid",
};

      grouped[affiliateId].commission += item.amount;

      if (item.status === "Paid") {
        grouped[affiliateId].paid += item.amount;
      } else {
        grouped[affiliateId].pending += item.amount;
        grouped[affiliateId].status = "Pending";
      }
    });

    setPayouts(Object.values(grouped));

  } catch (error) {
    console.log(error);
  }
};
const approvePayout = async (affiliateId) => {
  const res = await fetch(
    `https://affiliate-marketing-system-o8xz.onrender.com/api/earnings/approve/${affiliateId}`,
    {
      method: "PUT",
    }
  );

  const data = await res.json();
  console.log(data);

  fetchPayouts();
  console.log("Affiliate ID:", affiliateId);
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
              💸 Affiliate Payouts
            </h1>

            <p className="text-slate-400 mt-2">
              Review and approve affiliate commissions
            </p>

          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-xl">
            <h2 className="text-lg font-bold">
              Total Payouts
            </h2>

            <p className="text-sm opacity-80">
              Live Updates
            </p>

          </div>

        </div>

        {/* Table */}

        <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">

          <table className="w-full text-white">

            <thead className="bg-slate-800">

              <tr>

                <th className="py-5 px-6 text-left">
                  Affiliate
                </th>

                <th className="text-left">
                  Customer
                </th>

                <th className="text-left">
                  Commission
                </th>

                <th className="text-left">
                  Paid
                </th>

                <th className="text-left">
                  Pending
                </th>

                <th className="text-left">
                  Status
                </th>

                <th className="text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {payouts.map((item) => (

                <tr
                  key={item.affiliateId}
                  className="border-b border-slate-700 hover:bg-slate-800 transition-all duration-300"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-lg font-bold">
                        {item.affiliate?.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-semibold">
                        {item.affiliate}
                      </span>

                    </div>

                  </td>

                  <td className="text-slate-300">
                    {item.customer}
                  </td>

                  <td className="font-semibold text-cyan-400">
                    ₹{item.commission}
                  </td>

                  <td className="font-semibold text-green-400">
                    ₹{item.paid}
                  </td>

                  <td className="font-semibold text-orange-400">
                    ₹{item.pending}
                  </td>

                  <td>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        item.status === "Paid"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="text-center">

                    {item.status === "Pending" ? (

                      <button
                        onClick={() => approvePayout(item.affiliateId)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-5 py-2 rounded-xl font-semibold shadow-lg"
                      >
                        ✅ Approve
                      </button>

                    ) : (

                      <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold">
                        ✔ Completed
                      </span>

                    )}

                  </td>

                </tr>

              ))}

              {payouts.length === 0 && (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-10 text-slate-400"
                  >
                    🚫 No Payouts Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>
);
}