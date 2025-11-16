import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadJSONL, chunkText } from "../services/fileLoader.js";
import { saveEmbedding } from "../services/vectorDB.js";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const embedder = genAI.getGenerativeModel({ model: "text-embedding-004" });

async function run() {
  const t1 = loadJSONL("./dataset/family_style_emotional_support_dataset.jsonl");
  const t2 = loadJSONL("./dataset/playful_teasing_dataset_hinglish.jsonl");
  const t3 = loadJSONL("./dataset/therapy_dataset_v3.jsonl");
  const t4 = loadJSONL("./dataset/tough_love_dataset_hinglish.jsonl");

  const combined = t1 + t2 + t3 + t4;
  const chunks = chunkText(combined, 300);

  for (let chunk of chunks) {
    const res = await embedder.embedContent(chunk);
    saveEmbedding(chunk, res.embedding.values);
  }

  console.log("🔥 RAG data stored in SQLite!");
}

run();
