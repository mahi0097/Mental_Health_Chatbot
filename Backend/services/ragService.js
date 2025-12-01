import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import { searchEmbedding } from "./vectorStore.js";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Embedding model
const embedder = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

// Chat model
const chatModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Keywords to skip RAG
const creativeKeywords = [
  "joke", "shayari", "poem", "story", "quote",
  "funny", "motivate", "poetry", "motivation"
];

export const ragQuery = async (query) => {
  try {
    // Skip RAG for creative requests
    if (creativeKeywords.some(k => query.toLowerCase().includes(k))) {
      const aiRes = await chatModel.generateContent(query);
      return aiRes.response.text();
    }

    // Create embedding
    const embedRes = await embedder.embedContent(query);
    const queryEmbedding = embedRes.embedding.values;

    // Search in Pinecone
    const results = await searchEmbedding(queryEmbedding);

    const context = results.map(r => r.text).join("\n");

    const prompt = `
You are a friendly, supportive mental health assistant.
Use the context ONLY if relevant. Otherwise answer normally.

Context:
${context}

User: ${query}

Reply kindly in 2–3 lines.
`;

    const aiRes = await chatModel.generateContent(prompt);
    return aiRes.response.text();

  } catch (error) {
    console.error("RAG Error:", error);
    return "I'm facing some issues, please try again.";
  }
};
