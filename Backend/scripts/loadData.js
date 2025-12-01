import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadJSONL, chunkText } from "../services/fileLoader.js";
import { saveEmbedding } from "../services/vectorStore.js";  // <-- Pinecone version
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const embedder = genAI.getGenerativeModel({ model: "text-embedding-004" });

async function run() {
  console.log("🚀 Loading datasets...");

  const t1 = loadJSONL("./dataset/family_style_emotional_support_dataset.jsonl");
  const t2 = loadJSONL("./dataset/playful_teasing_dataset_hinglish.jsonl");
  const t3 = loadJSONL("./dataset/therapy_dataset_v3.jsonl");
  const t4 = loadJSONL("./dataset/tough_love_dataset_hinglish.jsonl");
  const t5 = loadJSONL("./dataset/intent.jsonl");
  const t6 = loadJSONL("./dataset/mentalhealth.jsonl");
  const t7 = loadJSONL("./dataset/supportive_mental_health_dataset_10000.jsonl");

  // Combine datasets into one large string
  const combined = [
    ...t1,
    ...t2,
    ...t3,
    ...t4,
    ...t5,
    ...t6,
    ...t7,
  ].join("\n\n");

  console.log("✂️  Chunking text...");
  const chunks = chunkText(combined, 300);

  console.log(`📦 Total chunks: ${chunks.length}`);

  // Loop and store embeddings in Pinecone
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    console.log(`🔍 Embedding chunk ${i + 1}/${chunks.length}`);

    // Create embedding using Gemini
    const res = await embedder.embedContent(chunk);
    const embedding = res.embedding.values;

    // Save to Pinecone
    await saveEmbedding(chunk, embedding, `chunk-${i}`);
  }

  console.log("🔥 RAG data stored in Pinecone!");
}

run().catch(err => console.error("Ingestion Error:", err));
