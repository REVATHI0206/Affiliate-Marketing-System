import express from "express";
import Affiliate from "../models/Affiliate.js";
import Coupon from "../models/Coupon.js";
import User from "../models/User.js";

const router = express.Router();

// ===============================
// GET ALL AFFILIATES
// ===============================
router.get("/", async (req, res) => {
  try {
    const affiliates = await User.find({
      role: "affiliate",
    });

    res.json(affiliates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// CREATE AFFILIATE
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, email, rule } = req.body;

    const existingCoupon = await Coupon.findOne({
      affiliateName: name,
      rule,
    });

    if (existingCoupon) {
      return res.status(400).json({
        message:
          "This affiliate already has a coupon for this rule",
      });
    }

    const couponCode =
      name.toUpperCase().replace(/\s/g, "") +
      Math.floor(Math.random() * 1000);

    const affiliate = await Affiliate.create({
      name,
      email,
      rule,
      coupon: couponCode,
      earnings: 0,
    });

    await Coupon.create({
      couponCode,
      affiliateName: name,
      rule,
      status: "Active",
    });

    res.status(201).json(affiliate);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// DELETE AFFILIATE
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Affiliate not found",
      });
    }

    // Delete related coupons
    await Coupon.deleteMany({
      affiliateName: user.name,
    });

    // Delete affiliate user
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Affiliate Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;