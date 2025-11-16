import Database from "better-sqlite3";
import fs from "fs";

const DB_PATH = "./rag.db";

// Create database file if not exists
const db = new Database(DB_PATH);

// Enable vector extension (32-dim, 256-dim, etc.)
db.exec(`
  CREATE TABLE IF NOT EXISTS rag_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    embedding BLOB NOT NULL
  );
`);

export function saveEmbedding(text, embedding) {
  const stmt = db.prepare(
    "INSERT INTO rag_data (text, embedding) VALUES (?, ?)"
  );
  stmt.run(text, Buffer.from(new Float32Array(embedding).buffer));
}

export function searchEmbedding(queryEmbedding, topK = 3) {
  const rows = db.prepare("SELECT * FROM rag_data").all();

  function cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
  }

  const scored = rows.map(row => {
    const emb = new Float32Array(row.embedding.buffer);
    return { text: row.text, score: cosine(queryEmbedding, emb) };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}
