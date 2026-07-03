import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserSidebar from "../../components/UserSidebar";
import UserNavbar from "../../components/UserNavbar";

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      console.log("Products Data:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyCoupon = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/coupons/code/${couponCode}`
      );

      setDiscount(res.data.discount || 0);

      alert(
        `${res.data.discount}% Discount Applied`
      );
    } catch (err) {
      alert("Invalid Coupon");
    }
  };

  const addToCart = (product) => {
    const finalPrice =
      product.price -
      (product.price * discount) / 100;

    let cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existingItem = cart.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      cart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      cart.push({
        ...product,
        quantity: 1,
        couponCode,
        discount,
        finalPrice,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product Added To Cart");
  };

  return (
    <div className="flex">
      <UserSidebar />

      <div className="ml-64 flex-1 min-h-screen bg-slate-100 p-8">
        <UserNavbar />

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Products
        </h1>

        {products.length === 0 ? (
          <div className="text-center text-xl text-gray-500 mt-20">
            No Products Found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => {
              const finalPrice =
                product.price -
                (product.price * discount) / 100;

              return (
                <Card
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="overflow-hidden">
                      <img
                        src={
                          product.image
                            ? product.image
                            : "https://dummyimage.com/400x400/cccccc/000000&text=No+Image"
                        }
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://dummyimage.com/400x400/cccccc/000000&text=No+Image";
                        }}
                      />
                    </div>

                    <div className="p-5">
                      {/* Product Name */}
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        {product.name}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-500 text-sm mb-4 min-h-[40px]">
                        {product.description}
                      </p>

                      {/* Category */}
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        {product.category}
                      </span>

                      {/* Price Section */}
                      <div className="space-y-1 mb-5">
                        {/* <p className="text-gray-500 text-sm">
                          Original Price
                        </p> */}
{/* 
                        <p className="text-red-500 line-through text-lg">
                          ₹{product.price}
                        </p> */}

                        <p className="text-green-600 font-semibold">
                          Discount : {discount}%
                        </p>

                        <p className="text-3xl font-bold text-blue-600">
                          ₹{finalPrice}
                        </p>
                      </div>

                      {/* Coupon */}
                      {/* <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          placeholder="Coupon Code"
                          value={couponCode}
                          onChange={(e) =>
                            setCouponCode(
                              e.target.value
                            )
                          }
                          className="flex-1 border rounded-lg px-3 py-2 text-sm"
                        />

                        <Button
                          onClick={applyCoupon}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Apply
                        </Button>
                      </div> */}

                      {/* Add To Cart */}
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        Add To Cart 🛒
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}