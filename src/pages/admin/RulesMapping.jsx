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
  <div className="flex bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen">

    <AdminSidebar />

    <div className="ml-72 flex-1">

      <AdminNavbar />

      <div className="p-10">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold text-white">
              🔗 Rule Mapping
            </h1>

            <p className="text-slate-400 mt-2">
              Affiliate → Coupon → Commission Rule Mapping
            </p>

          </div>

          <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl px-6 py-4 shadow-xl">

            <p className="text-cyan-100 text-sm">
              Total Mappings
            </p>

            <h2 className="text-3xl font-bold text-white">
              {mappings.length}
            </h2>

          </div>

        </div>

        {/* Table */}

        <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">

          <table className="w-full text-white">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left py-5 px-6">
                  Affiliate
                </th>

                <th className="text-left">
                  Coupon
                </th>

                <th className="text-left">
                  Rule
                </th>

                <th className="text-left">
                  Discount
                </th>

                <th className="text-left">
                  Commission
                </th>

              </tr>

            </thead>

            <tbody>

              {mappings.map((item) => (

                <tr
                  key={item._id}
                  className="border-b border-slate-700 hover:bg-slate-800 transition-all duration-300"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-lg font-bold">
                        {item.affiliate?.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-semibold">
                        {item.affiliate}
                      </span>

                    </div>

                  </td>

                  <td>

                    <span className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full">
                      {item.coupon}
                    </span>

                  </td>

                  <td>

                    <span className="bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full">
                      {item.rule}
                    </span>

                  </td>

                  <td>

                    <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full font-semibold">
                      {item.discount}
                    </span>

                  </td>

                  <td className="font-bold text-green-400 text-lg">
                    {item.commission}
                  </td>

                </tr>

              ))}

              {mappings.length === 0 && (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-slate-400"
                  >
                    🚫 No Rule Mapping Found
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