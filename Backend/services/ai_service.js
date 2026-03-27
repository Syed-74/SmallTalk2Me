import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAIAnswer = async (questionText, provider = "chatgpt", context = {}) => {
  const { responseMode = 'short', resumeInfo = '', companyInfo = '' } = context;
  
  // Intelligence: Detect question type
  const isBehavioral = /tell me about|describe a time|how do you handle|conflict|challenge/i.test(questionText);
  const isCoding = /complexity|algorithm|data structure|optimize|runtime|space/i.test(questionText);
  
  const typeInstruction = isBehavioral 
    ? "Use the STAR method (Situation, Task, Action, Result). Mention specific metrics if possible."
    : isCoding 
    ? "Focus on Big O notation, trade-offs, and edge cases. Suggest an optimal approach first." 
    : "Be systematic, address scalability, and mention high-level architectural patterns.";

  const modeInstructions = responseMode === 'short' 
    ? "Provide a single, powerful 2-3 sentence paragraph. No fluff. Instant value."
    : "Provide a structured answer with clear bullet points for key technical details. Max 120 words.";

  const companyPrompt = companyInfo 
    ? `Target Company: ${companyInfo.name || companyInfo}. Align with their engineering culture and core values.` 
    : "";

  const systemPrompt = `You are a Senior Technical Mock Interviewer.
    Your goal is to provide the user with the most impressive answer possible.
    
    CRITICAL RULES:
    1. ${modeInstructions}
    2. ${typeInstruction}
    3. ${companyPrompt}
    4. Personalize using this Resume: ${resumeInfo}
    5. Speak neutrally, avoid saying "Based on your resume" - just weave the experience in naturally.
    6. Highlight 2-3 technical keywords in every answer.`;


  try {
    if (provider === "chatgpt") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: questionText }
        ],
      });
      return completion.choices[0].message.content;
    } else if (provider === "gemini") {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${systemPrompt}\n\nQuestion: ${questionText}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }
    throw new Error("Invalid AI provider");
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};
