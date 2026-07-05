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
    <div className="flex">
      <AffiliateSidebar />

      <div className="ml-64 flex-1 p-8 bg-slate-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-2">
          My Coupons
        </h1>

        <p className="text-slate-500 mb-6">
          Create and manage your coupons
        </p>

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Create Coupon
          </h2>

          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />

          <select
            value={selectedRule}
            onChange={(e) => setSelectedRule(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          >
            <option value="">Select Rule</option>

            {rules.map((rule) => (
              <option key={rule._id} value={rule.ruleName}>
                {rule.ruleName}
              </option>
            ))}
          </select>

          <button
            onClick={createCoupon}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Coupon
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Coupon</th>
                <th className="text-left py-2">Rule</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6"
                  >
                    Loading...
                  </td>
                </tr>
              ) : coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <tr
                    key={coupon._id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="py-4">
                      {coupon.couponCode}
                    </td>

                    <td>{coupon.rule}</td>

                    <td>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {coupon.status}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          deleteCoupon(coupon._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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
                    className="text-center py-6 text-gray-500"
                  >
                    No Coupons Found
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