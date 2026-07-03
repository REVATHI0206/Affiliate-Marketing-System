import express from "express";
import Affiliate from "../models/Affiliate.js";
import Coupon from "../models/Coupon.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalAffiliates =
      await Affiliate.countDocuments();

    const totalCoupons =
      await Coupon.countDocuments();

      

    const earnings =
      await Affiliate.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$earnings",
            },
          },
        },
      ]);

    res.json({
      totalAffiliates,
      totalCoupons,
     
      
      totalEarnings:
        earnings[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;