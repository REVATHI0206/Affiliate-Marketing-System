import { Link } from "react-router-dom";

export default function UserNavbar() {
  const userName =
    localStorage.getItem("userName") || "User";

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6 flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        Welcome, {userName} 👋
      </h2>

      <div className="flex gap-3">
        <Link
          to="/user/cart"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cart
        </Link>

        <Link
          to="/user/orders"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
}