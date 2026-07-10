import { useEffect, useState } from "react";
import AffiliateSidebar from "../../components/AffiliateSidebar";
import API from "@/config/api";
export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const affiliateName = localStorage.getItem("userName") || "";

  useEffect(() => {
    fetchCoupons();
    fetchRules();
  }, []);
const fetchCoupons = async () => {
  try {
    const res = await API.get("/coupons");

    console.log("Coupons Response:", res.data);

    const data = Array.isArray(res.data) ? res.data : [];

    // ADD THESE TWO LINES
    console.log("Logged in user:", affiliateName);
    console.log("All Coupons:", data);

    const myCoupons = data.filter(
      (coupon) => coupon.affiliateName === affiliateName
    );

    console.log("My Coupons:", myCoupons);

    setCoupons(myCoupons);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

 const fetchRules = async () => {
  try {
    const res = await API.get("/rules");

    console.log("Rules Response:", res.data);

    setRules(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.log(err);
  }
  finally {
  setLoading(false);
}
};
  const createCoupon = async () => {
    if (!couponCode.trim() || !selectedRule) {
      alert("Enter Coupon Code and Select Rule");
      return;
    }

    try {
     await API.post("/coupons", {
  couponCode,
  affiliateName,
  rule: selectedRule,
  status: "Active",
});

      setCouponCode("");
      setSelectedRule("");

      fetchCoupons();

      alert("Coupon Created Successfully");
    } catch (err) {
  console.log("Coupon Error:", err.response?.data);
  console.log(err);

  alert(err.response?.data?.message || "Failed to create coupon");
}
  };

  const deleteCoupon = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;

    try {
await API.delete(`/coupons/${id}`);
      fetchCoupons();

      alert("Coupon Deleted Successfully");
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
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
            🎟 My Coupons
          </h1>

          <p className="text-slate-400 mt-2">
            Create and manage your affiliate coupons.
          </p>
        </div>

        <div className="bg-cyan-500 px-6 py-3 rounded-2xl shadow-xl text-white font-semibold">
          {coupons.length} Coupons
        </div>

      </div>

      {/* Create Coupon */}

      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8 mb-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          ➕ Create New Coupon
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <select
            value={selectedRule}
            onChange={(e) => setSelectedRule(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">Select Rule</option>

            {rules.map((rule) => (
              <option key={rule._id} value={rule.ruleName}>
                {rule.ruleName}
              </option>
            ))}
          </select>

        </div>

        <button
          onClick={createCoupon}
          className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition duration-300"
        >
          Create Coupon 🚀
        </button>

      </div>

      {/* Coupon Table */}

      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">

        <div className="px-8 py-6 border-b border-slate-700">

          <h2 className="text-2xl font-bold text-white">
            📋 Coupon List
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr className="text-slate-300">

              <th className="text-left py-4 px-6">
                Coupon
              </th>

              <th className="text-left px-6">
                Rule
              </th>

              <th className="text-left px-6">
                Status
              </th>

              <th className="text-left px-6">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-8 text-slate-400"
                >
                  Loading...
                </td>

              </tr>

            ) : coupons.length > 0 ? (

              coupons.map((coupon) => (

                <tr
                  key={coupon._id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >

                  <td className="px-6 py-5 text-white font-semibold">
                    {coupon.couponCode}
                  </td>

                  <td className="px-6 text-slate-300">
                    {coupon.rule}
                  </td>

                  <td className="px-6">

                    <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm">
                      {coupon.status}
                    </span>

                  </td>

                  <td className="px-6">

                    <button
                      onClick={() => deleteCoupon(coupon._id)}
                      className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-white transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-10 text-slate-400"
                >
                  🚫 No Coupons Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>
);
}