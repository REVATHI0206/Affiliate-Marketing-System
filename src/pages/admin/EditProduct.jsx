import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";



import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct =
    async () => {
      try {
        const res =
          await axios.get(
            `http://localhost:5000/api/products/${id}`
          );

        setFormData(
          res.data
        );
      } catch (err) {
        console.log(err);
      }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await axios.put(
          `http://localhost:5000/api/products/${id}`,
          formData
        );

        alert(
          "Product Updated"
        );

        navigate(
          "/admin/products"
        );
      } catch (err) {
        console.log(err);
      }
    };

  return (
  <div className="flex">
      <AdminSidebar />
 <div className="ml-64 flex-1 bg-slate-100 min-h-screen">
        <AdminNavbar />      
        <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Edit Product
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >
            <Input
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
            />

            <Input
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
            />

            <Input
              name="price"
              type="number"
              value={
                formData.price
              }
              onChange={
                handleChange
              }
            />

            <Input
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
            />

            <Input
              name="image"
              value={
                formData.image
              }
              onChange={
                handleChange
              }
            />

            <Button
              type="submit"
              className="w-full"
            >
              Update Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}