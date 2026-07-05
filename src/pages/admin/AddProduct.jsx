import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://affiliate-marketing-system-o8xz.onrender.com/api/products",
        formData
      );

      alert("Product Created Successfully");

      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Failed to Create Product");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 bg-slate-100 min-h-screen">
        <AdminNavbar />

        {/* Center Card */}
        <div className="flex justify-center items-center py-10 px-4">
          <Card className="w-full max-w-2xl shadow-2xl rounded-3xl border-0">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold text-slate-800">
                Add Product
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <Input
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-12"
                  required
                />

                <Input
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="h-12"
                  required
                />

                <Input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="h-12"
                  required
                />

                <Input
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  className="h-12"
                  required
                />

                <Input
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleChange}
                  className="h-12"
                />

                {/* Image Preview */}
                {formData.image && (
                  <div className="flex justify-center">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-48 h-48 object-cover rounded-xl border shadow"
                      onError={(e) => {
                        e.target.style.display =
                          "none";
                      }}
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  Create Product
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}