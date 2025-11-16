import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchEmbedding } from "./vectorDB.js";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const embedder = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const ragQuery = async (query) => {
  const embedding = await embedder.embedContent(query);
  const queryEmbedding = embedding.embedding.values;

  const results = searchEmbedding(queryEmbedding);

  const context = results.map(r => r.text).join("\n");

  const prompt = `
Use the following context to reply kindly:
${context}

User: ${query}
Reply in 2-3 lines:
  `;

  const aiRes = await model.generateContent(prompt);
  return aiRes.response.text();
  console.log("RAG CONTEXT:\n", context.substring(0, 500));

};
