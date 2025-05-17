// sketch-api.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import OpenAI from "openai";

config(); // Load .env

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate-sketch", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512"
    });
    const imageUrl = response.data[0].url;
    res.json({ url: imageUrl });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(port, () => {
  console.log(`✅ Sketch API server running at http://localhost:${port}`);
});
