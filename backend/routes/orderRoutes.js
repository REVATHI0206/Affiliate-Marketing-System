import express from "express";
import Order from "../models/Order.js";
import Coupon from "../models/Coupon.js";
import Earning from "../models/earning.js";
import User from "../models/User.js";

const router = express.Router();

// =====================================
// PLACE ORDER
// =====================================
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

    // Create earning if coupon is used
    if (couponCode) {
      const coupon = await Coupon.findOne({
        couponCode,
      });

      if (coupon) {
        const affiliateUser = await User.findOne({
          name: coupon.affiliateName,
          role: "affiliate",
        });

        if (affiliateUser) {
          const existingEarning = await Earning.findOne({
            order: order._id,
          });

          if (!existingEarning) {
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

// =====================================
// GET ALL ORDERS (Admin)
// =====================================
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate({
        path: "products.product",
        model: "Product",
      });

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================================
// GET USER ORDERS
// =====================================
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    }).populate({
      path: "products.product",
      model: "Product",
    });

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================================
// UPDATE ORDER STATUS
// =====================================
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================================
// DELETE ORDER
// =====================================
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;