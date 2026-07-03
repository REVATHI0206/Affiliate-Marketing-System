import express from "express";
import Rule from "../models/Rule.js";

const router = express.Router();

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

export default router;