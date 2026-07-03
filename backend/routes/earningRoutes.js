import express from "express";
import Earning from "../models/earning.js";

const router =
  express.Router();

// All Earnings
router.get(
  "/",
  async (req, res) => {
    try {
      const earnings =
        await Earning.find()
          .populate(
            "affiliate"
          )
          .populate(
            "customer"
          )
          .populate(
            "order"
          );

      res.json(
        earnings
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// Affiliate Earnings
router.get(
  "/:affiliateId",
  async (req, res) => {
    try {
      const earnings =
        await Earning.find({
          affiliate:
            req.params
              .affiliateId,
        })
          .populate(
            "customer"
          )
          .populate(
            "order"
          );

      res.json(
        earnings
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// Update Status
router.put(
  "/:id",
  async (req, res) => {
    try {
      const earning =
        await Earning.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      res.json({
        message:
          "Payout Updated",
        earning,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
        });
    }
  }
);

export default router;