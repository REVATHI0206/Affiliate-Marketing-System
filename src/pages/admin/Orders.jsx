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
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 bg-slate-100 min-h-screen">
        <AdminNavbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Orders
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">
              Loading Orders...
            </p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-500">
              No Orders Found
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order._id}>
                  <CardContent className="p-6">
                    <h2 className="font-bold text-lg">
                      Customer : {order.user?.name}
                    </h2>

                    <p>Email : {order.user?.email}</p>

                    <p className="mt-2">
                      Total : ₹{order.totalAmount}
                    </p>

                    <p className="mt-2">
                      Status :
                      <span className="ml-2 font-semibold text-blue-600">
                        {order.status}
                      </span>
                    </p>

                    <div className="flex gap-3 flex-wrap mt-4">
                      <Button
                        onClick={() =>
                          updateStatus(order._id, "Confirmed")
                        }
                      >
                        Confirm
                      </Button>

                      <Button
                        onClick={() =>
                          updateStatus(order._id, "Shipped")
                        }
                      >
                        Ship
                      </Button>

                      <Button
                        onClick={() =>
                          updateStatus(order._id, "Delivered")
                        }
                      >
                        Deliver
                      </Button>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">
                        Products
                      </h3>

                      {order.products?.length > 0 ? (
                        order.products.map((item, index) => (
                          <p key={index} className="py-1">
                            {item.product?.name} × {item.quantity}
                          </p>
                        ))
                      ) : (
                        <p>No Products</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}