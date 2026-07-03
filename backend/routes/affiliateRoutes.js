import express from "express";
import Affiliate from "../models/Affiliate.js";
import Coupon from "../models/Coupon.js";

const router = express.Router();


// CREATE AFFILIATE
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
    // ADD THIS BLOCK
   

    if (existingCoupon) {
      return res.status(400).json({
        message:
          "Coupon already exists for this rule",
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

// GET ALL AFFILIATES
import User from "../models/User.js";

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

// DELETE AFFILIATE
router.delete("/:id", async (req, res) => {
  try {
    await Affiliate.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Affiliate deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;