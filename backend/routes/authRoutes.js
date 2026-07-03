import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";



const router = express.Router();

// Generate Referral Code
const generateCode = (name) => {
  return (
    name.slice(0, 4).toUpperCase() +
    Math.floor(Math.random() * 9999)
  );
};

// ====================
// REGISTER
// ====================
import Affiliate from "../models/Affiliate.js";

router.post("/register", async (req, res) => {
  try {
   const {
  name,
  email,
  password,
  referralCode,
  role,
} = req.body;
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const generatedCode =
      generateCode(name);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      referralCode: generatedCode,
      referredBy: referralCode || null,
    });
if (referralCode) {
  const affiliate = await User.findOne({
    referralCode,
    role: "affiliate",
  });

  if (affiliate) {
    await Referral.create({
      affiliate: affiliate._id,
      referredUser: user._id,
    });
  }
}
    // If affiliate, create affiliate record also
    if (role === "affiliate") {
      await Affiliate.create({
        name,
        email,
        coupon: generatedCode,
        earnings: 0,
      });
    }

    res.status(201).json({
      message: "Registration Successful",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
// ====================
// LOGIN
// ====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Generate JWT
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

    res.status(200).json({
      message: "Login Successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
// Update Product
router.put("/:id", async (req, res) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      message: "Product Updated",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  router.get(
  "/:id",
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);
});

export default router;