import Memory from "../models/memory.model.js";

export const addMemory = async (req, res) => {
  try {
    const memory = await Memory.create(req.body);
    res.json(memory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchMemory = async (req, res) => {
  try {
    // Basic search for now, later integrate with vector embeddings
    const data = await Memory.find({ sessionId: req.params.sessionId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
