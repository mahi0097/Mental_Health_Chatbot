import { Pinecone } from "@pinecone-database/pinecone";
import "dotenv/config";

// Initialize Pinecone
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pc.index(process.env.PINECONE_INDEX_NAME); 


export const saveEmbedding = async (text, embedding, id = Date.now().toString()) => {
  try {
    await index.upsert([
      {
        id,
        values: embedding,
        metadata: { text }
      }
    ]);

    console.log("Saved to Pinecone:", id);
  } catch (error) {
    console.error("Pinecone Save Error:", error);
  }
};

export const searchEmbedding = async (queryEmbedding, topK = 3) => {
  try {
    const results = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });

    return results.matches?.map(m => ({
      text: m.metadata?.text || "",
      score: m.score
    })) || [];

  } catch (error) {
    console.error("Pinecone Query Error:", error);
    return [];
  }
};
