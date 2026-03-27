import Answer from "../models/answer.model.js";
import { generateAIAnswer } from "../services/ai_service.js";

export const generateAnswer = async (req, res) => {
  try {
    const { questionId, questionText, aiProvider, context } = req.body;

    const aiResponse = await generateAIAnswer(questionText, aiProvider, context);

    const answer = await Answer.create({
      questionId,
      aiProvider,
      rawAnswer: aiResponse,
      formattedAnswer: aiResponse // later optimize
    });

    res.json(answer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};