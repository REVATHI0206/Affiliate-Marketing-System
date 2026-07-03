import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
      <div className="fixed top-0 left-0 w-64 h-screen bg-slate-900 text-white">
   
    <div className="w-64 bg-black text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-10">
        ADMIN 🚀
      </h1>

      <div className="space-y-6">
        <Link to="/admin/dashboard" className="block">
          Dashboard
        </Link>

        <Link to="/admin/products" className="block">
          Products
        </Link>

        <Link to="/admin/affiliates" className="block">
          Affiliates
        </Link>

        <Link to="/admin/payouts" className="block">
          Payouts
        </Link>

        <Link to="/admin/analytics" className="block">
          Analytics
        </Link>

        <Link to="/admin/rules" className="block">
          Rules
        </Link>

        <Link
          to="/admin/rule-mapping"
          className="block"
        >
          Rule Mapping
        </Link>
        {/* <Link
  to="/admin/products"
  className="block"
>
  Products
</Link> */}
<Link to="/admin/orders">
  Orders
</Link>
      </div>
    </div>
    </div>
  );
}

export default AdminSidebar;