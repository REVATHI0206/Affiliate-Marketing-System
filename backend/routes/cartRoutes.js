import express from "express";
import Cart from "../models/Cart.js";

const router =
  express.Router();

// Add to Cart
router.post(
  "/",
  async (req, res) => {
    try {
      const cart =
        await Cart.create(
          req.body
        );

      res.status(201).json(
        cart
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// Get Cart
router.get(
  "/:userId",
  async (req, res) => {
    try {
      const cart =
        await Cart.find({
          user:
            req.params
              .userId,
        }).populate(
          "product"
        );

      res.json(cart);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);
router.delete(
  "/:id",
  async (req, res) => {
    try {
      await Cart.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Item Removed",
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