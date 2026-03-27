// models/resume.model.js
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  fileUrl: String,

  parsedData: {
    skills: [String],
    experience: [String],
    projects: [String]
  }

}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);