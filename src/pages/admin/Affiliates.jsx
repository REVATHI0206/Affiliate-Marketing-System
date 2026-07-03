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
        "http://localhost:5000/api/rules"
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
      fetch("http://localhost:5000/api/affiliates"),
      fetch("http://localhost:5000/api/coupons"),
      fetch("http://localhost:5000/api/earnings"),
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
        "https://affiliate-marketing-system-5c3j.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
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
        alert(
          data.message ||
            "Failed to create affiliate"
        );
        return;
      }

      alert(
        "Affiliate Added Successfully"
      );

      setName("");
      setEmail("");
      setRule("");

      fetchAffiliates();
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 bg-slate-100 min-h-screen p-6">
        <AdminNavbar />

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Affiliates
            </h1>

            <p className="text-slate-500">
              Manage affiliate users
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                + Add Affiliate
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Create Affiliate
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  placeholder="Affiliate Name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />

                <Input
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />

                <select
                  className="w-full border rounded-md p-2"
                  value={rule}
                  onChange={(e) =>
                    setRule(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Rule
                  </option>

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
                  className="w-full"
                  onClick={saveAffiliate}
                >
                  Save Affiliate
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">
                    Name
                  </th>

                  <th>Email</th>

                  <th>Coupon</th>

                  <th>Rule</th>

                  <th>Earnings</th>
                </tr>
              </thead>

              <tbody>
                {affiliates.map(
                  (item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="py-4">
                        {item.name}
                      </td>

                      <td>
                        {item.email}
                      </td>

                      <td>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {item.coupon}
                        </span>
                      </td>

                      <td>
                        {item.rule}
                      </td>

                     <td className="text-green-600 font-semibold">
  ₹{item.earnings}
</td>
                    </tr>
                  )
                )}

                {affiliates.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500"
                    >
                      No Affiliates Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}