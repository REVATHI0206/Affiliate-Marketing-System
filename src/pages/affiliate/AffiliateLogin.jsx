import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "@/config/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AffiliateLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
   const res = await API.post(
  "/affiliate-auth/login",
  formData
);

      if (res.data.user.role !== "affiliate") {
        alert("Only Affiliates can login.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      localStorage.setItem(
        "userId",
        res.data.user.id
      );
      localStorage.setItem(
        "userName",
        res.data.user.name
      );
      localStorage.setItem(
        "role",
        res.data.user.role
      );

      navigate("/affiliate/dashboard");

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Affiliate Login
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            className="w-full"
            onClick={handleLogin}
          >
            Login
          </Button>

          <p className="text-center text-sm">
            Go to{" "}
            <Link
              to="/"
              className="text-blue-600"
            >
              User Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}