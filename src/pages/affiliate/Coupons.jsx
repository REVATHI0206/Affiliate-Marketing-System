import { useEffect, useState } from "react";
import axios from "axios";
import AffiliateSidebar from "../../components/AffiliateSidebar";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [rules, setRules] = useState([]);

  const affiliateName =
    localStorage.getItem("userName") || "";

  useEffect(() => {
    fetchCoupons();
    fetchRules();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/coupons"
      );

      const myCoupons = res.data.filter(
        (coupon) =>
          coupon.affiliateName === affiliateName
      );

      setCoupons(myCoupons);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRules = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/rules"
      );

      setRules(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createCoupon = async () => {
    if (!couponCode || !selectedRule) {
      alert("Enter Coupon & Select Rule");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/coupons",
        {
          couponCode,
          affiliateName,
          rule: selectedRule,
          status: "Active",
        }
      );

      setCouponCode("");
      setSelectedRule("");

      fetchCoupons();

      alert("Coupon Created Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to create coupon");
    }
  };

  const deleteCoupon = async (id) => {
  try {
    await fetch(
      `https://affiliate-marketing-system-o8xz.onrender.com`,
      {
        method: "DELETE",
      }
    );

    fetchCoupons();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="flex">
      <AffiliateSidebar />

      <div className="ml-64  flex-1 p-8 bg-slate-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-2">
          My Coupons
        </h1>

        <p className="text-slate-500 mb-6">
          Create and manage your coupons
        </p>

        {/* Create Coupon */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Create Coupon
          </h2>

          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) =>
              setCouponCode(e.target.value)
            }
            className="border p-2 rounded w-full mb-3"
          />

          <select
            value={selectedRule}
            onChange={(e) =>
              setSelectedRule(e.target.value)
            }
            className="border p-2 rounded w-full mb-3"
          >
            <option value="">
              Select Rule
            </option>

            {rules.map((rule) => (
              <option
                key={rule._id}
                value={rule.ruleName}
              >
                {rule.ruleName}
              </option>
            ))}
          </select>

          <button
            onClick={createCoupon}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Coupon
          </button>
        </div>

        {/* Coupon List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">
                  Coupon
                </th>
                <th className="text-left py-2">
                  Rule
                </th>
                <th className="text-left py-2">
                  Status
                </th>
                <th className="text-left py-2">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
  {coupons.map((coupon) => (
    <tr
      key={coupon._id}
      className="border-b hover:bg-slate-50"
    >
      <td className="py-4">
        {coupon.couponCode}
      </td>

      <td>
        {coupon.ruleName}
      </td>

      <td>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {coupon.status}
        </span>
      </td>

      <td className="text-center">
        <button
         onClick={() => {
  console.log("DELETE ID:", coupon._id);
  deleteCoupon(coupon._id);
}}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}