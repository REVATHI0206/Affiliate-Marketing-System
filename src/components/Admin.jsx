import { Navigate } from "react-router-dom";

const token = localStorage.getItem("token");

if (!token) {
  return <Navigate to="/" replace />;
}

const user = JSON.parse(atob(token.split(".")[1]));

if (user.role !== "admin") {
  return <Navigate to="/" replace />;
}