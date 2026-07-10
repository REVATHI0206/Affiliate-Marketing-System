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

    if (!grouped[affiliateId]) {
  grouped[affiliateId] = {
    id: item._id, // Earning ID
    affiliateId,
    affiliate: item.affiliate?.name || "N/A",
    customer: item.customer?.name || "N/A",
    commission: 0,
    paid: 0,
    pending: 0,
    status: "Paid",
  };
}

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
  try {
    await fetch(
      `https://affiliate-marketing-system-o8xz.onrender.com/api/earnings/approve/${affiliateId}`,
      {
        method: "PUT",
      }
    );

    alert("Payout Approved");
    fetchPayouts();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 bg-slate-100 min-h-screen">
        <AdminNavbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">
            Affiliate Payouts
          </h1>

          <p className="text-slate-500 mb-6">
            Manage affiliate commissions
          </p>

          <Card>
            <CardContent className="p-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3">
                      Affiliate
                    </th>
                    <th>
                      Customer
                    </th>
                    <th>
                      Commission
                    </th>
                    <th>Paid</th>
                    <th>
                      Pending
                    </th>
                    <th>
                      Status
                    </th>
                    <th>
                      Action
                    </th>
                  </tr>
                </thead>

               <tbody>
  {payouts.map((item, index) => (
    <tr key={index}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="py-4">
                        {
                          item.affiliate
                        }
                      </td>

                      <td>
                        {
                          item.customer
                        }
                      </td>

                      <td>
                        ₹
                        {
                          item.commission
                        }
                      </td>

                      <td className="text-green-600">
                        ₹
                        {
                          item.paid
                        }
                      </td>

                      <td className="text-orange-500">
                        ₹
                        {
                          item.pending
                        }
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            item.status ===
                            "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {
                            item.status
                          }
                        </span>
                      </td>

                      <td>
                        {item.status ===
                        "Pending" ? (
                          <button
                            onClick={() => approvePayout(item.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-green-600 font-semibold">
                            Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {payouts.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-8 text-slate-500"
                      >
                        No Payouts Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}