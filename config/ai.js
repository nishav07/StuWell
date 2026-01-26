const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();


const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY
});

async function generateText(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response;
}

module.exports = { generateText };
