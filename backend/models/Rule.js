import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema(
  {
    ruleName: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rule", ruleSchema);