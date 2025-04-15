import {GoogleGenAI} from "@google/genai";

export function createGenAiClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const googleGenAi = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  return googleGenAi;
}
