import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Affiliates() {
  const [affiliates, setAffiliates] = useState([]);
  const [rules, setRules] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rule, setRule] = useState("");

  useEffect(() => {
    fetchAffiliates();
    fetchRules();
  }, []);

const fetchRules = async () => {
  try {
    const res = await fetch(
      "https://affiliate-marketing-system-o8xz.onrender.com/api/rules"
    );

    const data = await res.json();
    setRules(data);
  } catch (err) {
    console.log(err);
  }
};
 const fetchAffiliates = async () => {
  try {
    const [
      affiliateRes,
      couponRes,
      earningRes,
    ] = await Promise.all([
     fetch("https://affiliate-marketing-system-o8xz.onrender.com/api/affiliates"),
fetch("https://affiliate-marketing-system-o8xz.onrender.com/api/coupons"),
fetch("https://affiliate-marketing-system-o8xz.onrender.com/api/earnings"),
    ]);

    const affiliatesData = await affiliateRes.json();
    const couponsData = await couponRes.json();
    const earningsData = await earningRes.json();

    const merged = affiliatesData.map(
      (affiliate) => {
        const affiliateCoupons =
          couponsData.filter(
            (c) =>
              c.affiliateName ===
              affiliate.name
          );

        const affiliateEarnings =
          earningsData.filter(
            (e) =>
              e.affiliate?.name ===
              affiliate.name
          );

        const totalEarnings =
          affiliateEarnings.reduce(
            (sum, e) =>
              sum + (e.amount || 0),
            0
          );

        return {
          ...affiliate,

          coupon:
            affiliateCoupons.length > 0
              ? affiliateCoupons
                  .map(
                    (c) =>
                      c.couponCode
                  )
                  .join(", ")
              : "-",

          rule:
            affiliateCoupons.length > 0
              ? affiliateCoupons
                  .map((c) => c.rule)
                  .join(", ")
              : "-",

          earnings:
            totalEarnings,
        };
      }
    );

    setAffiliates(merged);
  } catch (err) {
    console.log(err);
  }
};

  const saveAffiliate = async () => {
  try {
    const res = await fetch(
      "https://affiliate-marketing-system-o8xz.onrender.com/api/affiliates",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          rule,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Affiliate Added Successfully");

    setName("");
    setEmail("");
    setRule("");

    fetchAffiliates();
  } catch (err) {
    console.log(err);
    alert("Server Error");
  }
};
    
const deleteAffiliate = async (id) => {
  if (!window.confirm("Delete this affiliate?")) return;

  try {
    const res = await fetch(
      `https://affiliate-marketing-system-o8xz.onrender.com/api/affiliates/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    alert(data.message);

    fetchAffiliates();
  } catch (err) {
    console.log(err);
    alert("Delete Failed");
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
              🤝 Affiliates
            </h1>

            <p className="text-slate-400 mt-2">
              Manage affiliate users and their earnings
            </p>

          </div>

          {/* <Dialog>

            <DialogTrigger asChild>

              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-xl px-6 py-6 text-lg shadow-xl">
                ➕ Add Affiliate
              </Button>

            </DialogTrigger>

            <DialogContent className="rounded-2xl">

              <DialogHeader>

                <DialogTitle className="text-2xl">
                  Create Affiliate
                </DialogTitle>

              </DialogHeader>

              <div className="space-y-4">

                <Input
                  placeholder="Affiliate Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <select
                  className="w-full border rounded-xl p-3"
                  value={rule}
                  onChange={(e) => setRule(e.target.value)}
                >
                  <option value="">Select Rule</option>

                  {rules.map((r) => (
                    <option
                      key={r._id}
                      value={r.ruleName}
                    >
                      {r.ruleName}
                    </option>
                  ))}
                </select>

                <Button
                  className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl"
                  onClick={saveAffiliate}
                >
                  Save Affiliate
                </Button>

              </div>

            </DialogContent>

          </Dialog> */}

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
                  Email
                </th>

                <th className="text-left">
                  Coupon
                </th>

                <th className="text-left">
                  Rule
                </th>

                <th className="text-left">
                  Earnings
                </th>

                <th className="text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {affiliates.map((item) => (

                <tr
                  key={item._id}
                  className="border-b border-slate-700 hover:bg-slate-800 transition duration-300"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center font-bold text-lg">
                        {item.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-semibold">
                        {item.name}
                      </span>

                    </div>

                  </td>

                  <td className="text-slate-300">
                    {item.email}
                  </td>

                  <td>

                    <span className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm">
                      {item.coupon}
                    </span>

                  </td>

                  <td>

                    <span className="bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm">
                      {item.rule}
                    </span>

                  </td>

                  <td className="font-bold text-green-400 text-lg">
                    ₹{item.earnings}
                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => deleteAffiliate(item._id)}
                      className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 px-5 py-2 rounded-xl text-white font-semibold shadow-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

              {affiliates.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-slate-400"
                  >
                    🚫 No Affiliates Found
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