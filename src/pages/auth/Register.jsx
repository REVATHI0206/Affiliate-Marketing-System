import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API from "@/config/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    referralCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async () => {
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await API.post("/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      referralCode: formData.referralCode,
    });

    alert(res.data.message);
    navigate("/");
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message || "Registration Failed"
    );
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* Role Selection */}
           {/* <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="affiliate">
              Affiliate
            </option>
            <option value="admin">
              Admin
            </option>
            <option value="user">
              User
            </option>
          </select> * */}

          <Input
            placeholder="Referral Code (Optional)"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
          >
            Register
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;