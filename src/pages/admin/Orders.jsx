import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Orders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/orders"
          );

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `https://affiliate-marketing-system-5c3j.onrender.com`,
        {
          status,
        }
      );

      fetchOrders();
      alert("Status Updated");
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  return (
   <div className="flex">
      <AdminSidebar/>

 <div className="ml-64 flex-1 bg-slate-100 min-h-screen">
        <AdminNavbar />  
      <h1 className="text-3xl font-bold mb-8">
        Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order._id}>
            <CardContent className="p-6">
              <h2 className="font-bold text-lg">
                Customer :{" "}
                {order.user?.name}
              </h2>

              <p>
                Email :{" "}
                {order.user?.email}
              </p>

              <p className="mt-2">
                Total : ₹
                {order.totalAmount}
              </p>

              <p className="mt-2">
                Status :
                <span className="ml-2 font-semibold text-blue-600">
                  {order.status}
                </span>
              </p>

              {/* Status Buttons */}
              <div className="flex gap-3 flex-wrap mt-4">
                <Button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Confirmed"
                    )
                  }
                >
                  Confirm
                </Button>

                <Button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Shipped"
                    )
                  }
                >
                  Ship
                </Button>

                <Button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Delivered"
                    )
                  }
                >
                  Deliver
                </Button>
              </div>

              {/* Products */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">
                  Products
                </h3>

                {order.products.map(
                  (
                    item,
                    index
                  ) => (
                    <p
                      key={index}
                      className="py-1"
                    >
                      {
                        item.product
                          ?.name
                      }{" "}
                      ×{" "}
                      {
                        item.quantity
                      }
                    </p>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
}