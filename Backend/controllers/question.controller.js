// controllers/question.controller.js
import Question from "../models/question.model.js";

export const addQuestion = async (req, res) => {
  const question = await Question.create(req.body);
  res.json(question);
};

export const getQuestionsBySession = async (req, res) => {
  const data = await Question.find({ sessionId: req.params.sessionId });
  res.json(data);
};