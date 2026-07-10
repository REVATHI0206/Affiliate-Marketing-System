import { useEffect, useState } from "react";
import axios from "axios";
import AffiliateSidebar from "../../components/AffiliateSidebar";

export default function Earnings() {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
    const user = JSON.parse(localStorage.getItem("user"));

console.log(user);
console.log("Affiliate ID:", user._id || user.id);
      if (!user) {
        alert("Please Login");
        return;
      }

      const affiliateId =
        user._id || user.id;
         console.log("Calling:", `https://affiliate-marketing-system-o8xz.onrender.com/api/earnings/${affiliateId}`);
      const res = await axios.get(
        `https://affiliate-marketing-system-o8xz.onrender.com/api/earnings/${affiliateId}`
      );

      console.log("Earnings:", res.data);

      setEarnings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 const totalEarned = earnings.reduce(
  (sum, item) => sum + item.amount,
  0
);

const paidAmount = earnings
  .filter(item => item.status === "Paid")
  .reduce((sum, item) => sum + item.amount, 0);

const pendingAmount = earnings
  .filter(item => item.status === "Pending")
  .reduce((sum, item) => sum + item.amount, 0);
  return (
  <div className="flex bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen">

    <AffiliateSidebar />

    <div className="ml-72 flex-1 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-white">
            💰 My Earnings
          </h1>

          <p className="text-slate-400 mt-2">
            Track your affiliate commissions and payouts.
          </p>
        </div>

        <div className="bg-emerald-500 px-6 py-3 rounded-2xl text-white font-semibold shadow-xl">
          ₹{totalEarned}
        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Total */}

        <div className="bg-gradient-to-r from-green-500 to-emerald-700 rounded-3xl p-6 shadow-2xl">

          <div className="text-5xl mb-3">💰</div>

          <p className="text-green-100">
            Total Earnings
          </p>

          <h2 className="text-5xl font-bold text-white mt-3">
            ₹{totalEarned}
          </h2>

        </div>

        {/* Paid */}

        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl p-6 shadow-2xl">

          <div className="text-5xl mb-3">✅</div>

          <p className="text-blue-100">
            Paid Amount
          </p>

          <h2 className="text-5xl font-bold text-white mt-3">
            ₹{paidAmount}
          </h2>

        </div>

        {/* Pending */}

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 shadow-2xl">

          <div className="text-5xl mb-3">⏳</div>

          <p className="text-orange-100">
            Pending Amount
          </p>

          <h2 className="text-5xl font-bold text-white mt-3">
            ₹{pendingAmount}
          </h2>

        </div>

      </div>

      {/* Earnings History */}

      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">

        <div className="px-8 py-6 border-b border-slate-700">

          <h2 className="text-2xl font-bold text-white">
            📈 Earnings History
          </h2>

        </div>

        {loading ? (

          <div className="p-10 text-center text-slate-400">
            Loading...
          </div>

        ) : earnings.length === 0 ? (

          <div className="p-10 text-center text-slate-400">
            🚫 No Earnings Found
          </div>

        ) : (

          <div className="space-y-5 p-8">

            {earnings.map((item) => (

              <div
                key={item._id}
                className="bg-slate-800 hover:bg-slate-700 transition rounded-2xl p-6 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-white text-lg font-semibold">
                    🎟 {item.couponCode || "N/A"}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    Commission : ₹{item.amount}
                  </p>

                </div>

                <span
                  className={`px-5 py-2 rounded-full font-semibold ${
                    item.status === "Paid"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {item.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  </div>
);
}