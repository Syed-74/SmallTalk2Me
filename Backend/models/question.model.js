// models/question.model.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session"
  },

  questionText: String,

  source: {
    type: String,
    enum: ["audio", "manual"]
  }

}, { timestamps: true });

export default mongoose.model("Question", questionSchema);