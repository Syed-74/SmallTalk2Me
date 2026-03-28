// models/settings.model.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  preferredAI: {
    type: String,
    enum: ["chatgpt", "gemini"],
    default: "chatgpt"
  },

  responseMode: {
    type: String,
    enum: ["short", "detailed"],
    default: "short"
  },

  overlayEnabled: {
    type: Boolean,
    default: true
  },

  voiceMode: {
    type: Boolean,
    default: false
  },

  autoDetectQuestions: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export default mongoose.model("Settings", settingsSchema);