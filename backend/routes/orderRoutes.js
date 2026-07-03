import express from "express";
import Order from "../models/Order.js";
import Coupon from "../models/Coupon.js";
import Earning from "../models/earning.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      user,
      products,
      totalAmount,
      couponCode,
    } = req.body;

    const order = await Order.create({
      user,
      products,
      totalAmount,
      couponCode,
      status: "Pending",
    });

    if (couponCode) {
      const coupon = await Coupon.findOne({
        couponCode,
      });

      if (coupon) {
        const affiliateUser =
          await User.findOne({
            name: coupon.affiliateName,
            role: "affiliate",
          });

        if (affiliateUser) {
          await Earning.create({
            affiliate: affiliateUser._id,
            customer: user,
            order: order._id,
            couponCode: coupon.couponCode,
            amount: coupon.commission || 0,
            status: "Pending",
          });
        }
      }
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get(
  "/user/:userId",
  async (req, res) => {
    try {
      const orders = await Order.find({
        user: req.params.userId,
      }).populate("products.product");

      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;