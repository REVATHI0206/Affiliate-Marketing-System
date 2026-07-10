import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import API from "@/config/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

 const fetchOrders = async () => {
  try {
    setLoading(true);

    const res = await API.get("/orders");

    setOrders(res.data);
  } catch (err) {
    console.log(err);
    alert("Failed to load orders");
  } finally {
    setLoading(false);
  }
};

const updateStatus = async (id, status) => {
  try {
    await API.put(`/orders/${id}`, {
      status,
    });

    fetchOrders();
    alert("Status Updated Successfully");
  } catch (err) {
    console.log(err);
    alert("Failed to update status");
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
              📦 Orders
            </h1>

            <p className="text-slate-400 mt-2">
              Track and manage customer orders
            </p>

          </div>

          <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl px-6 py-4 shadow-xl">

            <p className="text-cyan-100 text-sm">
              Total Orders
            </p>

            <h2 className="text-3xl font-bold text-white">
              {orders.length}
            </h2>

          </div>

        </div>

        {loading ? (

          <div className="text-center text-slate-400 text-xl py-20">
            Loading Orders...
          </div>

        ) : orders.length === 0 ? (

          <div className="bg-slate-900 rounded-3xl p-16 text-center text-slate-400 shadow-xl">
            📭 No Orders Found
          </div>

        ) : (

          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
              >

                {/* Top */}

                <div className="flex justify-between items-center px-8 py-6 border-b border-slate-700">

                  <div>

                    <h2 className="text-2xl font-bold text-white">
                      👤 {order.user?.name}
                    </h2>

                    <p className="text-slate-400">
                      {order.user?.email}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-green-400 text-3xl font-bold">
                      ₹{order.totalAmount}
                    </p>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-500/20 text-green-400"
                          : order.status === "Shipped"
                          ? "bg-blue-500/20 text-blue-400"
                          : order.status === "Confirmed"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

                {/* Products */}

                <div className="p-8">

                  <h3 className="text-xl text-white font-semibold mb-5">
                    🛍 Products
                  </h3>

                  <div className="space-y-4">

                    {order.products?.map((item, index) => (

                      <div
                        key={index}
                        className="flex justify-between items-center bg-slate-800 rounded-2xl p-5"
                      >

                        <div>

                          <h4 className="text-white font-semibold">
                            {item.product?.name}
                          </h4>

                          <p className="text-slate-400">
                            Quantity : {item.quantity}
                          </p>

                        </div>

                        <div className="text-cyan-400 font-bold">
                          × {item.quantity}
                        </div>

                      </div>

                    ))}

                  </div>

                  {/* Buttons */}

                  <div className="flex gap-4 mt-8 flex-wrap">

                    <button
                      onClick={() =>
                        updateStatus(order._id, "Confirmed")
                      }
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 transition px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
                    >
                      ✔ Confirm
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order._id, "Shipped")
                      }
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 transition px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
                    >
                      🚚 Ship
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order._id, "Delivered")
                      }
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
                    >
                      ✅ Deliver
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  </div>
);
}