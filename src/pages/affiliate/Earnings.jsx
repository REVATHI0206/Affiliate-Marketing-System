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
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("Please Login");
        return;
      }

      const affiliateId =
        user._id || user.id;

      const res = await axios.get(
        `http://localhost:5000/api/earnings/${affiliateId}`
      );

      console.log("Earnings:", res.data);

      setEarnings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalCommission = earnings.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  return (
    <div className="flex">
      <AffiliateSidebar />

      <div className="ml-64  flex-1 p-8 bg-slate-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">
          My Earnings
        </h1>

        {/* Total Commission Card */}
        <div className="bg-green-600 text-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold">
            Total Commission Earned
          </h2>

          <p className="text-3xl font-bold mt-2">
            ₹{totalCommission}
          </p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : earnings.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p>No Earnings Found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {earnings.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <p>
                  <strong>Coupon:</strong>{" "}
                  {item.couponCode || "N/A"}
                </p>

                <p>
                  <strong>Commission:</strong>{" "}
                  ₹{item.amount}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      item.status === "Paid"
                        ? "text-green-600"
                        : "text-orange-500"
                    }
                  >
                    {item.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}