import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const totalProducts = await Product.countDocuments();

    const orders = await Order.find({ user: userId });

    const totalOrders = orders.length;

    const totalSpent = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      totalProducts,
      totalOrders,
      totalSpent,
      recentOrders: orders.slice(-5).reverse(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;