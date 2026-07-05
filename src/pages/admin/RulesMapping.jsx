import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

import {
  Card,
  CardContent,
} from "@/components/ui/card";



export default function RulesMapping() {
  const [mappings, setMappings] = useState([]);

  useEffect(() => {
    fetchMappings();
  }, []);

  const fetchMappings = async () => {
    try {
      const res = await axios.get(
        "https://affiliate-marketing-system-o8xz.onrender.com/api/rule-mappings"
      );

      setMappings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar/>

 <div className="ml-64 flex-1 bg-slate-100 min-h-screen">
        <AdminNavbar />    
            <h1 className="text-3xl font-bold mb-2">
          Rule Mapping
        </h1>

        <p className="text-slate-500 mb-6">
          Affiliate → Coupon → Rule Mapping
        </p>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">
                    Affiliate
                  </th>
                  <th>Coupon</th>
                  <th>Rule</th>
                  <th>Discount</th>
                  <th>Commission</th>
                </tr>
              </thead>

              <tbody>
                {mappings.map(
                  (item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="py-4">
                        {item.affiliate}
                      </td>

                      <td>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {item.coupon}
                        </span>
                      </td>

                      <td>
                        {item.rule}
                      </td>

                      <td>
                        {item.discount}
                      </td>

                      <td className="text-green-600 font-semibold">
                        {item.commission}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}