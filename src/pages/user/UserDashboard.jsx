import UserSidebar from "../../components/UserSidebar";
import UserNavbar from "../../components/UserNavbar";
import { Card, CardContent } from "@/components/ui/card";


export default function UserDashboard() {
  return (
    <div className="flex">
      <UserSidebar />

<div className="ml-64 flex-1 pt-24 p-8 bg-slate-100 min-h-screen">       <UserNavbar />

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">
                Products
              </h2>

              <p className="text-slate-500 mt-2">
                Browse available products
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">
                Orders
              </h2>

              <p className="text-slate-500 mt-2">
                View your orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">
                Profile
              </h2>

              <p className="text-slate-500 mt-2">
                Manage account settings
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}