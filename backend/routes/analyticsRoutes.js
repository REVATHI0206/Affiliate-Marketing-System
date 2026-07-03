import express from "express";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";
import Earning from "../models/earning.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.countDocuments({
      role: "user",
    });

    const affiliates =
      await User.countDocuments({
        role: "affiliate",
      });

    const coupons =
      await Coupon.countDocuments();

    const orders =
      await Order.countDocuments();

    const earnings =
      await Earning.find();

    const commission =
      earnings.reduce(
        (sum, item) =>
          sum + (item.amount || 0),
        0
      );

    const allOrders =
      await Order.find();

    const revenue =
      allOrders.reduce(
        (sum, item) =>
          sum +
          (item.totalAmount || 0),
        0
      );

    res.json({
      users,
      affiliates,
      coupons,
      referrals: earnings.length,
      orders,
      revenue,
      commission,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;