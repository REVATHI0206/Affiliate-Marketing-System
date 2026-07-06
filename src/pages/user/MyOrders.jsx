import { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "../../components/UserSidebar";
import UserNavbar from "../../components/UserNavbar";
import API from "@/config/api";
export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

 const fetchOrders = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Login");
      return;
    }

    const userId = user._id || user.id;

    const res = await API.get(`/orders/user/${userId}`);

    setOrders(Array.isArray(res.data) ? res.data : []);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="flex">
      <UserSidebar />

      <div className="ml-64 flex-1 p-8 bg-slate-100 min-h-screen">
        <UserNavbar />

        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">
              No Orders Found
            </h2>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-xl font-bold mb-2">
                  Order ID
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  {order._id}
                </p>

                <p className="mb-2">
                  <strong>Status:</strong>{" "}
                  {order.status}
                </p>

                <p className="mb-4">
                  <strong>Total Amount:</strong> ₹
                  {order.totalAmount}
                </p>

                <h3 className="font-semibold mb-3">
                  Products
                </h3>

                {order.products?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 mb-3 flex gap-4 items-center"
                    >
                      <img
                        src={
                          item.product?.image ||
                          "https://dummyimage.com/150x150/cccccc/000000&text=No+Image"
                        }
                        alt={
                          item.product?.name
                        }
                        className="w-24 h-24 object-cover rounded"
                      />

                      <div>
                        <p>
  Product Name:
  {item.product?.name}
</p>

<p>
  Price: ₹
  {item.product?.price}
</p>

<p>
  Category:
  {item.product?.category}
</p>

<p>
  Quantity:
  {item.quantity}
</p>

{/* <img
  src={item.product?.image}
  alt=""
  className="w-24 h-24 object-cover"
/> */}
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}