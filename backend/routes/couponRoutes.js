import express from "express";
import Coupon from "../models/Coupon.js";
import Rule from "../models/Rule.js";
import RuleMapping from "../models/ruleMapping.js";
import User from "../models/User.js";

const router = express.Router();

// Get All Coupons
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Coupon By Code
router.get("/code/:couponCode", async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      couponCode: req.params.couponCode,
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon Not Found",
      });
    }

    res.json(coupon);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Coupons By Affiliate
router.get("/affiliate/:affiliateName", async (req, res) => {
  try {
    const coupons = await Coupon.find({
      affiliateName: req.params.affiliateName,
    });

    res.json(coupons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create Coupon
router.post("/", async (req, res) => {
  try {
    const {
      affiliateName,
      couponCode,
      rule,
    } = req.body;

    // One coupon per rule
    const existingCoupon = await Coupon.findOne({
      affiliateName,
      rule,
    });

    if (existingCoupon) {
      return res.status(400).json({
        message: "You already created a coupon for this rule",
      });
    }

    // Find Rule Details
    const ruleData = await Rule.findOne({
      ruleName: rule,
    });

    if (!ruleData) {
      return res.status(404).json({
        message: "Rule Not Found",
      });
    }

    // Save Coupon
    const coupon = await Coupon.create({
      affiliateName,
      couponCode,
      rule,
      discount: ruleData.discount,
      commission: ruleData.commission,
      status: "Active",
    });

    // Update Affiliate
    await User.findOneAndUpdate(
      { name: affiliateName },
      {
        couponCode,
        rule,
      }
    );

    // Save Rule Mapping
    await RuleMapping.create({
      affiliate: affiliateName,
      coupon: couponCode,
      rule,
      discount: ruleData.discount,
      commission: ruleData.commission,
    });

    res.status(201).json(coupon);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Coupon
router.delete("/:id", async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);

    res.json({
      message: "Coupon Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;