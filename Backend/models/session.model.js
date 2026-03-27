// models/session.model.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  interviewType: {
    type: String,
    enum: ["coding", "behavioral", "system-design"]
  },

  company: String,

  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  }

}, { timestamps: true });

export default mongoose.model("Session", sessionSchema);