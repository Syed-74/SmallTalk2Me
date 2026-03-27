import { generateAIAnswer } from "./ai_service.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";

export const handleSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_interview", (sessionId) => {
      socket.join(sessionId);
      console.log(`Socket ${socket.id} joined session ${sessionId}`);
    });

    socket.on("process_question", async (data) => {
      const { sessionId, questionText, aiProvider, responseMode, context = {} } = data;

      try {
        // 1. Save Question to DB
        const question = await Question.create({
          sessionId,
          text: questionText,
          timestamp: new Date()
        });

        // 2. Emit "thinking" state
        io.to(sessionId).emit("ai_thinking", { questionId: question._id });

        // 3. Generate AI Answer
        const aiResponse = await generateAIAnswer(questionText, aiProvider, { ...context, responseMode });

        // 4. Save Answer to DB
        const answer = await Answer.create({
          questionId: question._id,
          aiProvider,
          rawAnswer: aiResponse,
          formattedAnswer: aiResponse
        });

        // 5. Emit Answer to Frontend
        io.to(sessionId).emit("ai_answer", {
          questionId: question._id,
          answerText: aiResponse,
          answerId: answer._id
        });

      } catch (error) {
        console.error("Socket Processing Error:", error);
        socket.emit("error", { message: "Failed to process question" });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
