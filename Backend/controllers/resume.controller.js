import Resume from "../models/resume.model.js";

export const uploadResume = async (req, res) => {
  try {
    const { content } = req.body;
    const resume = await Resume.create({
      userId: req.user.id,
      content,
      parsedData: {} // Later: add parsing logic
    });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};