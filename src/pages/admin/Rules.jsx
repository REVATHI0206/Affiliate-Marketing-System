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
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 bg-slate-100 min-h-screen">
        <AdminNavbar />
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Commission Rules
            </h1>

            <p className="text-slate-500 mt-1">
              Total Rules: {rules.length}
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Rule</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Rule</DialogTitle>
              </DialogHeader>

              <div className="space-y-3">
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
                  className="w-full"
                  onClick={saveRule}
                >
                  Save Rule
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Rules Table */}
        <Card>
          <CardContent className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">
                    Rule Name
                  </th>

                  <th className="text-left py-3">
                    Discount
                  </th>

                  <th className="text-left py-3">
                    Commission
                  </th>

                  <th className="text-left py-3">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {rules.map((rule) => (
                  <tr
                    key={rule._id}
                    className="border-b"
                  >
                    <td className="py-3">
                      {rule.ruleName}
                    </td>

                    <td>
                      {rule.discount}%
                    </td>

                    <td>
                      {rule.commission}%
                    </td>

                    <td>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}