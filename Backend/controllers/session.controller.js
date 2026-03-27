// controllers/session.controller.js
import Session from "../models/session.model.js";

export const createSession = async (req, res) => {
  const session = await Session.create(req.body);
  res.json(session);
};

export const getSessions = async (req, res) => {
  const sessions = await Session.find({ userId: req.user.id });
  res.json(sessions);
};

export const endSession = async (req, res) => {
  const session = await Session.findByIdAndUpdate(
    req.params.id,
    { status: "completed" },
    { new: true }
  );
  res.json(session);
};