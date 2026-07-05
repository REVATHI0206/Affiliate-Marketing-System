// import { useEffect, useState } from "react";
// import axios from "axios";
// import UserSidebar from "../../components/UserSidebar";
// import UserNavbar from "../../components/UserNavbar";

// export default function Cart() {
//   const [cart, setCart] = useState([]);
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);

//   useEffect(() => {
//     const savedCart =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     setCart(savedCart);
//   }, []);

//   const saveCart = (newCart) => {
//     setCart(newCart);

//     localStorage.setItem(
//       "cart",
//       JSON.stringify(newCart)
//     );
//   };

//   const increaseQty = (id) => {
//     const updated = cart.map((item) =>
//       item._id === id
//         ? {
//             ...item,
//             quantity: item.quantity + 1,
//           }
//         : item
//     );

//     saveCart(updated);
//   };

//   const decreaseQty = (id) => {
//     const updated = cart.map((item) =>
//       item._id === id
//         ? {
//             ...item,
//             quantity:
//               item.quantity > 1
//                 ? item.quantity - 1
//                 : 1,
//           }
//         : item
//     );

//     saveCart(updated);
//   };

//   const removeItem = (id) => {
//     const updated = cart.filter(
//       (item) => item._id !== id
//     );

//     saveCart(updated);
//   };

//   const total = cart.reduce(
//     (sum, item) =>
//       sum + item.price * item.quantity,
//     0
//   );

//   const finalAmount = total - discount;

//   const applyCoupon = async () => {
//     try {
//       const res = await axios.get(
//         `https://affiliate-marketing-system-o8xz.onrender.com/api/coupons/code/${couponCode}`
//       );

//       const coupon = res.data;

//       const discountAmount =
//         (total * coupon.discount) / 100;

//       setDiscount(discountAmount);

//       alert("Coupon Applied Successfully");
//     } catch (error) {
//       alert("Invalid Coupon");
//     }
//   };

//   const checkout = async () => {
//     try {
//       const user = JSON.parse(
//         localStorage.getItem("user")
//       );

//       if (!user) {
//         alert("Please Login");
//         return;
//       }

//       const products = cart.map((item) => ({
//         product: item._id,
//         quantity: item.quantity,
//       }));

//       const orderData = {
//         user: user.id,
//         products,
//         couponCode,
//         discount,
//         totalAmount: finalAmount,
//       };

//       await axios.post(
//         "http://localhost:5000/api/orders",
//         orderData
//       );

//       alert("Order Placed Successfully");

//       localStorage.removeItem("cart");

//       setCart([]);
//       setCouponCode("");
//       setDiscount(0);
//     } catch (error) {
//       console.log(error);

//       alert(
//         error.response?.data?.message ||
//           "Order Failed"
//       );
//     }
//   };
import { useEffect, useState } from "react";
import axios from "axios";

import UserSidebar from "../../components/UserSidebar";
import UserNavbar from "../../components/UserNavbar";

import {
  ShoppingCart,
  Tag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] =
    useState("");
  const [discount, setDiscount] =
    useState(0);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCart(saved);
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
            quantity:
              item.quantity + 1,
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
    saveCart(
      cart.filter(
        (item) => item._id !== id
      )
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const finalAmount =
    total - discount;
    const applyCoupon = async () => {
  try {
    const res = await axios.get(
      `https://affiliate-marketing-system-o8xz.onrender.com/api/coupons/code/${couponCode}`
    );

    const coupon = res.data;

    const discountAmount =
      (total * coupon.discount) / 100;

    setDiscount(discountAmount);

    alert("Coupon Applied Successfully");
  } catch (error) {
    console.log(error);
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
  <div className="flex bg-slate-100 min-h-screen">

    <UserSidebar />

    <div className="flex-1 ml-64">

      <div className="p-8">

        <UserNavbar />

        <div className="mt-8 flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold flex items-center gap-3">
              <ShoppingCart className="w-10 h-10 text-violet-600" />
              My Cart
            </h1>

            <p className="text-slate-500 mt-2">
              Review your shopping cart before checkout.
            </p>

          </div>

          <div className="hidden lg:flex items-center gap-6">

            <div className="bg-white rounded-xl shadow px-6 py-3 text-center">

              <h2 className="text-sm text-gray-500">
                Items
              </h2>

              <p className="text-3xl font-bold text-violet-600">
                {cart.length}
              </p>

            </div>

            <div className="bg-white rounded-xl shadow px-6 py-3 text-center">

              <h2 className="text-sm text-gray-500">
                Total
              </h2>

              <p className="text-3xl font-bold text-green-600">
                ₹{finalAmount}
              </p>

            </div>

          </div>

        </div>

        {cart.length === 0 ? (

          <Card className="mt-12 rounded-3xl shadow-lg">

            <CardContent className="py-20 flex flex-col items-center">

              <ShoppingCart className="w-20 h-20 text-slate-300 mb-6" />

              <h2 className="text-3xl font-bold">

                Your Cart is Empty

              </h2>

              <p className="text-gray-500 mt-3">

                Add products and start shopping.

              </p>

            </CardContent>

          </Card>

        ) : (

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-10">

            {/* Products Section */}

            <div className="space-y-6">

              {/* PART 3 GOES HERE */}
              {cart.map((item) => (
  <Card
    key={item._id}
    className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <CardContent className="p-6">
      <div className="flex items-center gap-6">

        <img
          src={
            item.image ||
            "https://dummyimage.com/200x200/cccccc/000000&text=No+Image"
          }
          alt={item.name}
          className="w-32 h-32 rounded-xl object-cover border"
        />

        <div className="flex-1">

          <h2 className="text-2xl font-bold">
            {item.name}
          </h2>

          <p className="text-gray-500 mt-2">
            ₹{item.price}
          </p>

          <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            ✔ In Stock
          </span>

          <div className="flex items-center gap-3 mt-5">

            <Button
              size="icon"
              variant="destructive"
              onClick={() =>
                decreaseQty(item._id)
              }
            >
              <Minus size={18} />
            </Button>

            <span className="text-xl font-bold">
              {item.quantity}
            </span>

            <Button
              size="icon"
              className="bg-green-600 hover:bg-green-700"
              onClick={() =>
                increaseQty(item._id)
              }
            >
              <Plus size={18} />
            </Button>

          </div>

        </div>

        <div className="text-right">

          <p className="text-3xl font-bold text-violet-600">
            ₹{item.price * item.quantity}
          </p>

          <Button
            variant="outline"
            className="mt-5 text-red-600"
            onClick={() =>
              removeItem(item._id)
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </Button>

        </div>

      </div>
    </CardContent>
  </Card>
))}

            </div>

            {/* Order Summary */}

            <div>

              {/* PART 4 GOES HERE */}
              <Card className="rounded-2xl shadow-xl sticky top-6">
  <CardContent className="p-6">

    <h2 className="text-2xl font-bold mb-6">
      📦 Order Summary
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span className="text-gray-500">
          Subtotal
        </span>

        <span className="font-semibold">
          ₹{total}
        </span>
      </div>

      <div className="flex justify-between text-green-600">
        <span>Discount</span>

        <span>
          - ₹{discount}
        </span>
      </div>

      <hr />

      <div className="flex justify-between text-3xl font-bold">

        <span>Total</span>

        <span className="text-violet-600">
          ₹{finalAmount}
        </span>

      </div>

    </div>

    <div className="mt-8">

      <label className="font-semibold flex items-center gap-2 mb-3">
        <Tag className="w-5 h-5 text-pink-500" />
        Coupon Code
      </label>

      <div className="flex gap-2">

        <Input
          placeholder="Enter Coupon"
          value={couponCode}
          onChange={(e) =>
            setCouponCode(e.target.value)
          }
        />

        <Button
          onClick={applyCoupon}
          className="bg-violet-600 hover:bg-violet-700"
        >
          Apply
        </Button>

      </div>

    </div>

    <div className="mt-8">

      <Button
        onClick={checkout}
        className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
      >
        Proceed to Checkout
      </Button>

    </div>

    <div className="flex items-center justify-center gap-2 text-green-600 mt-6">

      <ShieldCheck className="w-5 h-5" />

      <span className="text-sm">
        Secure Checkout
      </span>

    </div>

  </CardContent>
</Card>

            </div>

          </div>

        )}

      </div>

    </div>

  </div>
);

}