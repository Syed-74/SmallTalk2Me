// models/memory.model.js
import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  content: String,

  embedding: [Number], // vector data

  type: {
    type: String,
    enum: ["resume", "qa", "note"]
  }

}, { timestamps: true });

export default mongoose.model("Memory", memorySchema);