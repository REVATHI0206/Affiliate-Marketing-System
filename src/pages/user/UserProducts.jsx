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

 const [couponCodes, setCouponCodes] = useState({});
const [discounts, setDiscounts] = useState({});
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

  const applyCoupon = async (productId) => {
  const code = couponCodes[productId];

  if (!code) {
    alert("Enter Coupon");
    return;
  }

  try {
    const res = await API.get(`/coupons/code/${code}`);

    setDiscounts((prev) => ({
      ...prev,
      [productId]: Number(res.data.discount),
    }));

    alert(`${res.data.discount}% Discount Applied`);
  } catch (err) {
    console.log(err);
    alert("Invalid Coupon");
  }
};
const addToCart = (product) => {
  const discount = discounts[product._id] || 0;

  const finalPrice =
    product.price -
    (product.price * discount) / 100;

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(
    (item) => item._id === product._id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      couponCode:
        couponCodes[product._id] || "",
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

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

    <div>
        <h1 className="text-4xl font-bold">
            Products
        </h1>

        <p className="text-gray-500">
            Explore our latest collection
        </p>
    </div>

    <div className="flex gap-3">

        <div className="relative">

            <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
            />

            <Input
                placeholder="Search..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="pl-10 w-72"
            />

        </div>

        <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="border rounded-lg px-3"
        >
            {categories.map(cat=>(
                <option key={cat}>
                    {cat}
                </option>
            ))}
        </select>

        <select
            value={sort}
            onChange={(e)=>setSort(e.target.value)}
            className="border rounded-lg px-3"
        >
            <option value="latest">Latest</option>
            <option value="low">Low Price</option>
            <option value="high">High Price</option>
            <option value="name">Name</option>
        </select>

    </div>

</div>
        {products.length === 0 ? (
          <div className="text-center text-xl text-gray-500 mt-20">
            No Products Found
          </div>
        ) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">      {filteredProducts.map((product) => {
             const discount = discounts[product._id] || 0;

const finalPrice =
  product.price -
  (product.price * discount) / 100;

              return (
                <Card
  key={product._id}
  className="relative group overflow-hidden rounded-2xl border bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
>
                 {discount > 0 && (
  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
    {discount}% OFF
  </div>
)}
                  <CardContent className="p-0">
                    
                    <img
                      src={
                        product.image ||
                        "https://dummyimage.com/400x400/cccccc/000000&text=No+Image"
                      }
                      alt={product.name}
                     className="w-full h-64 object-contain bg-gray-50 p-4"
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

                     
<div className="flex items-center gap-3 mt-3">

    <h2 className="text-2xl font-bold text-purple-700">
        ₹{finalPrice}
    </h2>

    <span className="line-through text-gray-400">
        ₹{product.price}
    </span>

</div>

                      <div className="flex gap-3 mb-6">

  <Input
  placeholder="Enter Coupon Code"
  value={couponCodes[product._id] || ""}
  onChange={(e) =>
    setCouponCodes((prev) => ({
      ...prev,
      [product._id]: e.target.value,
    }))
  }
  className="w-72"
/>
  <Button
  onClick={() => applyCoupon(product._id)}
  className="bg-green-600 hover:bg-green-700"
>
    Apply Coupon
  </Button>

</div>

                   <Button
className="w-full mt-5 rounded-xl bg-purple-600 hover:bg-purple-700"
onClick={()=>addToCart(product)}
>

<ShoppingCart size={18}/>

<span className="ml-2">
Add To Cart
</span>

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