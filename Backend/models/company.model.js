import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  tags: [{
    type: String,
    enum: ["dsa", "system-design", "behavioral"],
    lowercase: true
  }],

  patterns: [{
    question: String,
    category: {
      type: String,
      enum: ["dsa", "system-design", "behavioral"]
    },
    frequency: {
      type: Number,
      default: 1
    }
  }]

}, { timestamps: true });

export default mongoose.model("Company", companySchema);