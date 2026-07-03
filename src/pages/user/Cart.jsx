import { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "../../components/UserSidebar";
import UserNavbar from "../../components/UserNavbar";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    );

    saveCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter(
      (item) => item._id !== id
    );

    saveCart(updated);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const finalAmount = total - discount;

  const applyCoupon = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/coupons/code/${couponCode}`
      );

      const coupon = res.data;

      const discountAmount =
        (total * coupon.discount) / 100;

      setDiscount(discountAmount);

      alert("Coupon Applied Successfully");
    } catch (error) {
      alert("Invalid Coupon");
    }
  };

  const checkout = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("Please Login");
        return;
      }

      const products = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const orderData = {
        user: user.id,
        products,
        couponCode,
        discount,
        totalAmount: finalAmount,
      };

      await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );

      alert("Order Placed Successfully");

      localStorage.removeItem("cart");

      setCart([]);
      setCouponCode("");
      setDiscount(0);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Order Failed"
      );
    }
  };

  return (
    <div className="flex">
      <UserSidebar />

      <div className="ml-64 flex-1 min-h-screen bg-slate-100 p-8">
        <UserNavbar />

        <h1 className="text-4xl font-bold text-center mb-10">
          🛒 My Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-600">
              Your Cart is Empty
            </h2>
          </div>
        ) : (
          <>
            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <img
                    src={
                      item.image ||
                      "https://dummyimage.com/400x300/cccccc/000000&text=No+Image"
                    }
                    alt={item.name}
                    className="w-full h-60 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://dummyimage.com/400x300/cccccc/000000&text=No+Image";
                    }}
                  />

                  <div className="p-5">
                    <h2 className="text-2xl font-bold mb-2">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mb-3">
                      Price: ₹{item.price}
                    </p>

                    <div className="flex justify-center items-center gap-4 mb-4">
                      <button
                        onClick={() =>
                          decreaseQty(item._id)
                        }
                        className="w-10 h-10 bg-red-500 text-white rounded-full text-lg font-bold"
                      >
                        -
                      </button>

                      <span className="text-xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item._id)
                        }
                        className="w-10 h-10 bg-green-500 text-white rounded-full text-lg font-bold"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-center text-blue-600 text-2xl font-bold mb-4">
                      ₹
                      {item.price *
                        item.quantity}
                    </p>

                    <button
                      onClick={() =>
                        removeItem(item._id)
                      }
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white mt-12 p-8 rounded-2xl shadow-xl max-w-lg mx-auto">
              <h2 className="text-3xl font-bold text-center mb-6">
                Order Summary
              </h2>

              <div className="flex gap-3 mb-5">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) =>
                    setCouponCode(
                      e.target.value
                    )
                  }
                  className="flex-1 border border-gray-300 rounded-lg p-3"
                />

                <button
                  onClick={applyCoupon}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
                >
                  Apply
                </button>
              </div>

              <div className="space-y-3 text-lg">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Final Amount</span>
                  <span>₹{finalAmount}</span>
                </div>
              </div>

              <button
                onClick={checkout}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold"
              >
                Proceed To Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}