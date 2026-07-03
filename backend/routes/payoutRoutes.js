import express from "express";
import Affiliate from "../models/Affiliate.js";

const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const affiliate = await Affiliate.findById(req.params.id);

    if (!affiliate) {
      return res.status(404).json({
        message: "Affiliate not found",
      });
    }

    affiliate.earnings = 0;

    await affiliate.save();

    res.json({
      message: "Payout Approved",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;