// import dotenv from "dotenv";
// dotenv.config();
// const result = dotenv.config();

// console.log(result);
// console.log("JWT_SECRET =", process.env.JWT_SECRET);
// import ruleMappingRoutes from "./routes/ruleMappingRoutes.js";



// import express from "express";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import ruleRoutes from "./routes/ruleRoutes.js";
// import cors from "cors";

// import affiliateRoutes from "./routes/affiliateRoutes.js";
// import couponRoutes from "./routes/couponRoutes.js";

// import dashboardRoutes from "./routes/dashboardRoutes.js";
// import payoutRoutes from "./routes/payoutRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import earningRoutes from "./routes/earningRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js";












// // Connect MongoDB
// connectDB();

// const app = express();

// // Middleware

// console.log("JWT =", process.env.JWT_SECRET);

// app.use(cors());
// app.use(express.json());
// app.use("/api/affiliates", affiliateRoutes);
// app.get("/api/affiliates-test", (req, res) => {
//   res.send("Affiliate Route Test");
// });

// // Test Route
// app.get("/", (req, res) => {
//   res.send("AMS Backend Running 🚀");
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/rules", ruleRoutes);
// app.use("/api/coupons", couponRoutes);


// app.use(
//   "/api/dashboard",
//   dashboardRoutes
// );
// app.use(
//   "/api/rule-mappings",
//   ruleMappingRoutes
// );
// app.use("/api/payouts", payoutRoutes);
// app.use(
//   "/api/products",
//   productRoutes
// );
// app.use(
//   "/api/cart",
//   cartRoutes
// );

// app.use(
//   "/api/orders",
//   orderRoutes
// );
// app.use(
//   "/api/earnings",
//   earningRoutes
// );
// app.use(
//   "/api/analytics",
//   analyticsRoutes
// );

// // Start Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("🔥 NEW SERVER FILE LOADED");
//   console.log(`Server running on port ${PORT}`);
//   console.log("CLOUD_NAME =", process.env.CLOUD_NAME);
// console.log("CLOUD_API_KEY =", process.env.CLOUD_API_KEY);
// console.log(
//   "CLOUD_API_SECRET =",
//   process.env.CLOUD_API_SECRET
// );
// });
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import affiliateRoutes from "./routes/affiliateRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import payoutRoutes from "./routes/payoutRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import earningRoutes from "./routes/earningRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
import ruleMappingRoutes from "./routes/ruleMappingRoutes.js";

// MongoDB Connection
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://affiliate-marketing-system-o8xz.onrender.com"
    ],
    credentials: true,
  })
);

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("AMS Backend Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/affiliates", affiliateRoutes);
app.use("/api/coupons", couponRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/rules", ruleRoutes);
app.use("/api/rule-mappings", ruleMappingRoutes);
app.use("/api/payouts", payoutRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/earnings", earningRoutes);
app.use("/api/analytics", analyticsRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log("JWT_SECRET =", process.env.JWT_SECRET);
  console.log("CLOUD_NAME =", process.env.CLOUD_NAME);
});