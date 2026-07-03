import mongoose from "mongoose";

const earningSchema = new mongoose.Schema({
  affiliate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },

  couponCode: {
    type: String,
    default: "",
  },

  amount: Number,

  status: {
    type: String,
    default: "Pending",
  },
});

export default mongoose.model(
  "Earning",
  earningSchema
);