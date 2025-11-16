import fs from "fs";

// Load .jsonl file correctly
export function loadJSONL(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").trim().split("\n");

  let combined = "";

  for (let line of lines) {
    try {
      const obj = JSON.parse(line);

      // JSONL common formats
      if (obj.text) combined += obj.text + "\n";
      else if (obj.prompt) combined += obj.prompt + "\n";
      else if (obj.response) combined += obj.response + "\n";
      else if (obj.answer) combined += obj.answer + "\n";
      else combined += JSON.stringify(obj) + "\n"; // fallback

    } catch (err) {
      console.error("❌ Invalid JSONL line:", line);
    }
  }

  return combined;
}

// Chunk long text for RAG
export function chunkText(text, size = 300) {
  let chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}
