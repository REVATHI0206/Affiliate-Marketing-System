import { useEffect, useState } from "react";
import axios from "axios";
import AffiliateSidebar from "../../components/AffiliateSidebar";

export default function Referrals() {
  const [referrals, setReferrals] =
    useState([]);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/referrals"
          );

        setReferrals(
          res.data
        );
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="flex">
      <AffiliateSidebar />

      <div className="flex-1 p-8 bg-slate-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-2">
          Referrals
        </h1>

        <p className="text-slate-500 mb-6">
          Manage customer referrals
        </p>

        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">
                  Affiliate
                </th>

                <th className="text-left py-3">
                  Customer
                </th>

                <th className="text-left py-3">
                  Coupon
                </th>

                <th className="text-left py-3">
                  Order Value
                </th>

                <th className="text-left py-3">
                  Commission
                </th>
              </tr>
            </thead>

            <tbody>
              {referrals.length >
              0 ? (
                referrals.map(
                  (
                    item
                  ) => (
                    <tr
                      key={
                        item._id
                      }
                      className="border-b"
                    >
                      <td className="py-3">
                        {
                          item
                            .affiliate
                            ?.name
                        }
                      </td>

                      <td>
                        {
                          item
                            .customer
                            ?.name
                        }
                      </td>

                      <td>
                        {
                          item
                            .couponCode
                        }
                      </td>

                      <td>
                        ₹
                        {
                          item.orderValue
                        }
                      </td>

                      <td className="text-green-600">
                        ₹
                        {
                          item.commission
                        }
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-slate-500"
                  >
                    No Referrals Found
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