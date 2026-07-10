import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "@/config/api";

export default function AffiliateRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerAffiliate = async () => {
    try {
      await API.post("/affiliate-auth/register", {
        ...formData,
        role: "affiliate",
      });

      alert("Affiliate Registered Successfully");

      navigate("/affiliate/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Affiliate Register
        </h1>

        <input
          className="border w-full p-2 mb-4 rounded"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className="border w-full p-2 mb-4 rounded"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="border w-full p-2 mb-4 rounded"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <button
          onClick={registerAffiliate}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already Registered?
          <Link
            to="/affiliate/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}