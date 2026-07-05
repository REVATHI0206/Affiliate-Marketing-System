import express from "express";
import Rule from "../models/Rule.js";

const router = express.Router();

// Get all rules
router.get("/", async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create rule
router.post("/", async (req, res) => {
  try {
    const rule = new Rule({
      ruleName: req.body.ruleName,
      discount: req.body.discount,
      commission: req.body.commission,
    });

    const savedRule = await rule.save();

    res.status(201).json(savedRule);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;