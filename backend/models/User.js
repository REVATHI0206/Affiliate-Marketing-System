import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
  },

  password: String,

  role: {
    type: String,
    enum: ["admin", "affiliate", "user"],
    default: "user",
  },

  referralCode: String,

  referredBy: String,
  couponCode: {
  type: String,
  default: "",
},

rule: {
  type: String,
  default: "",
},
});

export default mongoose.model(
  "User",
  userSchema
);