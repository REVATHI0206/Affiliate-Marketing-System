import express from "express";
import RuleMapping from "../models/ruleMapping.js";

const router = express.Router();

// Get all mappings
router.get("/", async (req, res) => {
  try {
    const mappings = await RuleMapping.find();

    res.json(mappings);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// Create mapping
router.post("/", async (req, res) => {
  try {
    const {
      affiliate,
      coupon,
      rule,
      discount,
      commission,
    } = req.body;

    const mapping = await RuleMapping.create({
      affiliate,
      coupon,
      rule,
      discount,
      commission,
    });

    res.status(201).json(mapping);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// Delete mapping
router.delete("/:id", async (req, res) => {
  try {
    await RuleMapping.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;