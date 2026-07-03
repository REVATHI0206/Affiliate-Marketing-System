import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  role,
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const user = JSON.parse(
      atob(token.split(".")[1])
    );

    if (role && user.role !== role) {
      return <Navigate to="/" />;
    }

    return children;

  } catch (error) {
    return <Navigate to="/" />;
  }
}