// models/answer.model.js
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },

  aiProvider: {
    type: String,
    enum: ["chatgpt", "gemini"]
  },

  rawAnswer: String,

  formattedAnswer: String

}, { timestamps: true });

export default mongoose.model("Answer", answerSchema);