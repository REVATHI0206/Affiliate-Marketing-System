import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Affiliate from "../models/Affiliate.js";

const router = express.Router();

const generateCode = (name) => {
  return (
    name.slice(0, 4).toUpperCase() +
    Math.floor(Math.random() * 9999)
  );
};

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const referralCode = generateCode(name);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      referralCode,
    });

    if (role === "affiliate") {
      await Affiliate.create({
        name,
        email,
        coupon: referralCode,
        earnings: 0,
      });
    }

    res.status(201).json({
      message: "Registration Successful",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;