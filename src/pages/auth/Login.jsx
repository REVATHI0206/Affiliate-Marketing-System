
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

function Login() {
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
    const res = await API.post("/auth/login", formData);

      console.log("LOGIN RESPONSE:", res.data);

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

      const role = res.data.user.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "affiliate") {
        navigate("/affiliate/dashboard");
      } else if (role === "user") {
        navigate("/user/dashboard");
      } else {
        alert("Invalid Role");
      }
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
            Login
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
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;