// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  plan: {
    type: String,
    enum: ["free", "pro"],
    default: "free"
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);