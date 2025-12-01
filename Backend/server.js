import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"
// import chatRoutes from "./routes/chatRoutes.js"; // we'll add later
import fileUpload from "express-fileupload";
import voiceRoute from "./routes/voiceRoute.js";


dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use(fileUpload());

app.use("/api", voiceRoute); 


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB Connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server running on port ${process.env.PORT}`);

    });
})
.catch((err) => console.log(err)
);


