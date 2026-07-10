import { useEffect, useState } from "react";
import API from "@/config/api";

import UserSidebar from "../../components/UserSidebar";
import UserNavbar from "../../components/UserNavbar";

import {
  ShoppingBag,
  ShoppingCart,
  Package,
  IndianRupee,
} from "lucide-react";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboard();
  }, []);

 const [dashboard, setDashboard] = useState({
  totalProducts: 0,
  totalOrders: 0,
  totalSpent: 0,
  recentOrders: [],
});

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const userId = localStorage.getItem("userId");

    const res = await API.get(`/dashboard/user/${userId}`);

    setDashboard(res.data);
  } catch (err) {
    console.log(err);
  }
};

  const totalSpent = orders.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

 const cards = [
  {
    title: "Products",
    value: dashboard.totalProducts,
    icon: <ShoppingBag size={30} />,
    color: "bg-blue-500",
  },
  {
    title: "Cart",
    value: cart.length,
    icon: <ShoppingCart size={30} />,
    color: "bg-green-500",
  },
  {
    title: "Orders",
    value: dashboard.totalOrders,
    icon: <Package size={30} />,
    color: "bg-orange-500",
  },
  {
    title: "Total Spent",
    value: `₹${dashboard.totalSpent}`,
    icon: <IndianRupee size={30} />,
    color: "bg-purple-600",
  },
];

  return (
    <div className="flex">

      <UserSidebar />

      <div className="ml-64 flex-1 bg-slate-100 min-h-screen p-8">

        <UserNavbar />

        <h1 className="text-4xl font-bold mt-8 mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-6">

          {cards.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >

              <div
                className={`${item.color} text-white w-14 h-14 rounded-xl flex items-center justify-center`}
              >
                {item.icon}
              </div>

              <h2 className="text-gray-500 mt-5">
                {item.title}
              </h2>

              <h1 className="text-3xl font-bold mt-2">
                {item.value}
              </h1>

            </div>

          ))}

        </div>

        {/* Recent Orders */}

        <div className="bg-white rounded-2xl shadow-lg mt-10 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

        {orders.length === 0 ? (

            <p>No Orders</p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Product
                  </th>

                  <th>Status</th>

                  <th>Total</th>

                </tr>

              </thead>

              <tbody>

                {orders.slice(0, 5).map((order) => (

                  <tr
                    key={order._id}
                    className="border-b"
                  >

                    <td className="py-4">

                      {order.products[0]?.product?.name}

                    </td>

                    <td>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                        {order.status}

                      </span>

                    </td>

                    <td>

                      ₹{order.totalAmount}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}