import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: String,

    affiliateName: String,

    rule: String,

    discount: {
      type: Number,
      default: 0,
    },

    commission: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Coupon",
  couponSchema
);