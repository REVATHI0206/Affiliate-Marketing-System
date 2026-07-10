import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Coupon from "../models/Coupon.js";

const router = express.Router();


// =======================
// Affiliate Register
// =======================
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const affiliate = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "affiliate",
    });

    // Create Coupon Automatically

    const couponCode =
      name.toUpperCase().replace(/\s/g, "") +
      Math.floor(Math.random() * 1000);

    await Coupon.create({
      affiliateName: name,
      couponCode,
      status: "Active",
    });

    res.json({
      message:
        "Affiliate Registered Successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// =======================
// Affiliate Login
// =======================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const affiliate =
      await User.findOne({
        email,
        role: "affiliate",
      });

    if (!affiliate) {
      return res.status(400).json({
        message: "Affiliate not found",
      });
    }

    const match =
      await bcrypt.compare(
        password,
        affiliate.password
      );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: affiliate._id,
        role: affiliate.role,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: affiliate,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

export default router;