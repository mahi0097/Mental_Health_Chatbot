import express from "express";
import axios from "axios";
import fs from "fs";

const router = express.Router();

router.post("/voice-to-text", async (req, res) => {
  try {
    // 1) Check audio
    if (!req.files?.audio) {
      return res.status(400).json({ message: "No audio uploaded" });
    }

    const audioFile = req.files.audio;
    const filePath = "./temp_audio.webm";

    // 2) Save audio temporarily
    await audioFile.mv(filePath);

    // 3) Upload audio file to AssemblyAI
    const uploadResponse = await axios({
      method: "post",
      url: "https://api.assemblyai.com/v2/upload",
      headers: {
        authorization: process.env.ASSEMBLYAI_API_KEY,
        "transfer-encoding": "chunked",
      },
      data: fs.createReadStream(filePath),
    });

    const audioUrl = uploadResponse.data.upload_url;

    // 4) Create transcription request
    const transcriptResponse = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      {
        audio_url: audioUrl,
      },
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
        },
      }
    );

    const transcriptId = transcriptResponse.data.id;

    // 5) Poll transcription result
    let text = "";
    while (true) {
      const polling = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: { authorization: process.env.ASSEMBLYAI_API_KEY },
        }
      );

      if (polling.data.status === "completed") {
        text = polling.data.text;
        break;
      }

      if (polling.data.status === "error") {
        throw new Error(polling.data.error);
      }

      // Thoda wait karo 1 second (1000 ms)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // 6) Temp file delete karo
    fs.unlinkSync(filePath);

    // 7) Text return karo frontend ko
    return res.json({ text });

  } catch (error) {
    console.error("AssemblyAI error:", error.response?.data || error.message);
    res.status(500).json({ error: "Voice-to-text failed" });
  }
});

export default router;
