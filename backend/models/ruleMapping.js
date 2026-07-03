import mongoose from "mongoose";

const ruleMappingSchema = new mongoose.Schema(
  {
    affiliate: {
      type: String,
      required: true,
    },

    coupon: {
      type: String,
      required: true,
    },

    rule: {
      type: String,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    commission: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "RuleMapping",
  ruleMappingSchema
);