import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import voiceRoute from "./routes/voiceRoute.js";

dotenv.config();

// Connect to MongoDB (ONLY once)
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api", voiceRoute);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
