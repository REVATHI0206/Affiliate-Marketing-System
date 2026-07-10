import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AdminNavbar from "@/components/AdminNavbar";
import API from "../../config/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";



export default function Rules() {
  const [rules, setRules] = useState([]);
  const [ruleName, setRuleName] = useState("");
  const [discount, setDiscount] = useState("");
  const [commission, setCommission] = useState("");

  // Fetch Rules
  const fetchRules = async () => {
  try {
    const res = await API.get("/rules");
    setRules(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchRules();
  }, []);

  // Save Rule
 const saveRule = async () => {
  try {
    const res = await API.post("/rules", {
      ruleName,
      discount: Number(discount),
      commission: Number(commission),
    });

    alert("Rule Created Successfully");

    fetchRules();
  } catch (err) {
    console.log(err);
    alert("Failed");
  }
};
  //     if (res.ok) {
  //       setRuleName("");
  //       setDiscount("");
  //       setCommission("");
  //       fetchRules();
  //       alert("Rule Added Successfully");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
              ⚙️ Commission Rules
            </h1>

            <p className="text-slate-400 mt-2">
              Manage discount & commission rules
            </p>

          </div>

          <div className="flex gap-4">

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl px-6 py-4 shadow-xl">

              <p className="text-cyan-100 text-sm">
                Active Rules
              </p>

              <h2 className="text-3xl font-bold text-white">
                {rules.length}
              </h2>

            </div>

            <Dialog>

              <DialogTrigger asChild>

                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-xl px-8 shadow-xl">
                  ➕ Create Rule
                </Button>

              </DialogTrigger>

              <DialogContent className="rounded-3xl">

                <DialogHeader>

                  <DialogTitle className="text-2xl">
                    Create New Rule
                  </DialogTitle>

                </DialogHeader>

                <div className="space-y-4 mt-4">

                  <Input
                    placeholder="Rule Name"
                    value={ruleName}
                    onChange={(e) =>
                      setRuleName(e.target.value)
                    }
                  />

                  <Input
                    placeholder="Discount %"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(e.target.value)
                    }
                  />

                  <Input
                    placeholder="Commission %"
                    value={commission}
                    onChange={(e) =>
                      setCommission(e.target.value)
                    }
                  />

                  <Button
                    className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl"
                    onClick={saveRule}
                  >
                    Save Rule
                  </Button>

                </div>

              </DialogContent>

            </Dialog>

          </div>

        </div>

        {/* Table */}

        <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">

          <table className="w-full text-white">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left py-5 px-6">
                  Rule
                </th>

                <th className="text-left">
                  Discount
                </th>

                <th className="text-left">
                  Commission
                </th>

                <th className="text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {rules.map((rule) => (

                <tr
                  key={rule._id}
                  className="border-b border-slate-700 hover:bg-slate-800 transition duration-300"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-xl">
                        ⚙️
                      </div>

                      <span className="font-semibold">
                        {rule.ruleName}
                      </span>

                    </div>

                  </td>

                  <td>

                    <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full">
                      {rule.discount}%
                    </span>

                  </td>

                  <td>

                    <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full">
                      {rule.commission}%
                    </span>

                  </td>

                  <td>

                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold">
                      ✔ Active
                    </span>

                  </td>

                </tr>

              ))}

              {rules.length === 0 && (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-10 text-slate-400"
                  >
                    🚫 No Rules Found
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