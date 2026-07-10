import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ProtectedRoute from "./components/ProtectedRoute";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Analytics from "./pages/admin/Analytics";
import Payouts from "./pages/admin/Payouts";
import AffiliatePage from "./pages/admin/Affiliates";
import Rules from "./pages/admin/Rules";
import RulesMapping from "./pages/admin/RulesMapping";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Orders from "./pages/admin/Orders";

// Affiliate
import AffiliateDashboard from "./pages/affiliate/AffiliateDashboard";


import Coupons from "./pages/affiliate/Coupons";
import Earnings from "./pages/affiliate/Earnings";

// User

import UserProducts from "./pages/user/UserProducts";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import MyOrders from "./pages/user/MyOrders";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/affiliates"
        element={
          <ProtectedRoute role="admin">
            <AffiliatePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/payouts"
        element={
          <ProtectedRoute role="admin">
            <Payouts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute role="admin">
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/rules"
        element={
          <ProtectedRoute role="admin">
            <Rules />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/rule-mapping"
        element={
          <ProtectedRoute role="admin">
            <RulesMapping />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute role="admin">
            <AdminProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-product"
        element={
          <ProtectedRoute role="admin">
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-product/:id"
        element={
          <ProtectedRoute role="admin">
            <EditProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute role="admin">
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* Affiliate Routes */}
      <Route
        path="/affiliate/dashboard"
        element={
          <ProtectedRoute role="affiliate">
            <AffiliateDashboard />
          </ProtectedRoute>
        }
      />

      
      

      <Route
        path="/affiliate/coupons"
        element={
          <ProtectedRoute role="affiliate">
            <Coupons />
          </ProtectedRoute>
        }
      />

      <Route
        path="/affiliate/earnings"
        element={
          <ProtectedRoute role="affiliate">
            <Earnings />
          </ProtectedRoute>
        }
      />

      {/* User Routes */}
      {/* <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/user/products"
        element={
          <ProtectedRoute role="user">
            <UserProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/cart"
        element={
          <ProtectedRoute role="user">
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/checkout"
        element={
          <ProtectedRoute role="user">
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/orders"
        element={
          <ProtectedRoute role="user">
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/profile"
        element={
          <ProtectedRoute role="user">
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;