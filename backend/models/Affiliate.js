import mongoose from "mongoose";

const affiliateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      default: "",
    },

    coupon: {
      type: String,
      default: "",
    },

    rule: {
      type: String,
      default: "",
    },

    earnings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Affiliate",
  affiliateSchema
);