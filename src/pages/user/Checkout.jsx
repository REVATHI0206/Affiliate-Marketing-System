import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
} from "lucide-react";

export default function Checkout() {5
  const navigate = useNavigate();

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const userId =
    localStorage.getItem("userId");

  const [loading, setLoading] =
    useState(false);

  const totalAmount =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  const placeOrder =
    async () => {
      try {
        setLoading(true);

        const products =
          cart.map((item) => ({
            product:
              item._id,
            quantity:
              item.quantity,
          }));

        await axios.post(
          "https://affiliate-marketing-system-o8xz.onrender.com/api/orders",
          {
            user: userId,
            products,
            totalAmount,
          }
        );

        localStorage.removeItem(
          "cart"
        );

        alert(
          "Order Placed Successfully"
        );

        navigate(
          "/user/orders"
        );
      } catch (err) {
        console.log(err);
        alert(
          "Order Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
  <div className="flex bg-slate-100 min-h-screen">
    <UserSidebar />

    <div className="ml-64 flex-1 p-8">
      <UserNavbar />

      {/* Header */}
      <div className="flex justify-between items-center mt-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <ShoppingCart className="text-violet-600" />
            My Cart
          </h1>

          <p className="text-slate-500 mt-2">
            {cart.length} Item(s) in your shopping cart
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow hover:shadow-lg transition"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-20 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt=""
            className="w-40 mx-auto mb-8"
          />

          <h2 className="text-3xl font-bold">
            Your Cart is Empty
          </h2>

          <p className="text-slate-500 mt-3">
            Looks like you haven't added anything yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="col-span-2 space-y-6">

            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-6 flex items-center gap-6"
              >
                {/* Image */}

                <img
                  src={
                    item.image ||
                    "https://dummyimage.com/200x200"
                  }
                  alt={item.name}
                  className="w-40 h-40 rounded-2xl object-cover"
                />

                {/* Product Details */}

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Premium Quality Product
                  </p>

                  <p className="text-violet-600 text-2xl font-bold mt-4">
                    ₹{item.price}
                  </p>

                  {/* Quantity */}

                  <div className="flex items-center gap-4 mt-6">

                    <button
                      onClick={() =>
                        decreaseQty(item._id)
                      }
                      className="bg-red-100 p-3 rounded-full hover:bg-red-500 hover:text-white transition"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item._id)
                      }
                      className="bg-green-100 p-3 rounded-full hover:bg-green-500 hover:text-white transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Right Side */}

                <div className="text-right">

                  <h2 className="text-3xl font-bold text-violet-600">
                    ₹
                    {item.price *
                      item.quantity}
                  </h2>

                  <button
                    onClick={() =>
                      removeItem(item._id)
                    }
                    className="mt-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side */}

          <div>

            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">

              <h2 className="text-3xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span>Items</span>

                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount</span>

                  <span>-₹{discount}</span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>

                  <span>
                    ₹{finalAmount}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  </div>
);
}