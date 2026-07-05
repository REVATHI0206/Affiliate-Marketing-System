import { useEffect, useMemo, useState } from "react";
import API from "@/config/api";

import UserSidebar from "../../components/UserSidebar";
import UserNavbar from "../../components/UserNavbar";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  Filter,
} from "lucide-react";

export default function UserProducts() {
  const [products, setProducts] = useState([]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  const [sort, setSort] =
    useState("latest");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (err) {
      console.log(err);
    }
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      alert("Enter Coupon");
      return;
    }

    try {
      const res = await API.get(
        `/coupons/code/${couponCode}`
      );

      setDiscount(
        Number(res.data.discount)
      );

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

    const existing = cart.find(
      (item) =>
        item._id === product._id
    );

    if (existing) {
      existing.quantity += 1;
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

    alert("Added To Cart");
  };

  const categories = [
    "All",
    ...new Set(
      products.map(
        (p) => p.category
      )
    ),
  ];

  const filteredProducts =
    useMemo(() => {
      let data = [...products];

      if (
        category !== "All"
      ) {
        data = data.filter(
          (item) =>
            item.category ===
            category
        );
      }

      if (search) {
        data = data.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            item.description
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
      }

      switch (sort) {
        case "low":
          data.sort(
            (a, b) =>
              a.price - b.price
          );
          break;

        case "high":
          data.sort(
            (a, b) =>
              b.price - a.price
          );
          break;

        case "name":
          data.sort((a, b) =>
            a.name.localeCompare(
              b.name
            )
          );
          break;

        default:
          break;
      }

      return data;
    }, [
      products,
      search,
      category,
      sort,
    ]);

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
                  className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <img
                      src={
                        product.image ||
                        "https://dummyimage.com/400x400/cccccc/000000&text=No+Image"
                      }
                      alt={product.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://dummyimage.com/400x400/cccccc/000000&text=No+Image";
                      }}
                    />

                    <div className="p-5">
                      <h2 className="text-2xl font-bold mb-2">
                        {product.name}
                      </h2>

                      <p className="text-gray-500 mb-3">
                        {product.description}
                      </p>

                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">
                        {product.category}
                      </span>

                     
 <p className="text-green-600 mb-2">
  Discount: {discount}%
</p>

<p className="text-3xl font-bold text-blue-600 mb-4">
  ₹{finalPrice}
</p>

                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          placeholder="Coupon Code"
                          value={couponCode}
                          onChange={(e) =>
                            setCouponCode(
                              e.target.value
                            )
                          }
                          className="flex-1 border rounded-lg px-3 py-2"
                        />

                        <Button
                          onClick={applyCoupon}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Apply
                        </Button>
                      </div>

                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
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