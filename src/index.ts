import { openai } from "@ai-sdk/openai";
import { type ModelMessage, generateText } from "ai";
import dotenv from "dotenv";
import express, { type Request, type Response } from "express";

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.MODEL;
const CUSTOM_PROMPT = process.env.CUSTOM_PROMPT;

if (!API_KEY || !MODEL) {
  console.error("Error: OPENAI_API_KEY and MODEL env vars are required.");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.post("/api/test", async (req: Request, res: Response) => {
  try {
    const messages: ModelMessage[] = req.body.messages;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({
        error:
          "Invalid request. 'messages' array is required in ModelMessage[] format.",
      });
      return;
    }

    const prompt: ModelMessage[] = CUSTOM_PROMPT
      ? [{ role: "system", content: CUSTOM_PROMPT }, ...messages]
      : messages;

    const result = await generateText({
      model: openai(MODEL),
      messages: prompt,
    });

    res.json({
      text: result.text,
      model: MODEL,
      usage: result.usage,
    });
  } catch (error: unknown) {
    console.error("Error processing request:", error);
    res.status(500).json({
      error: "Failed to process request",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// Fixed PORT handling for Render
const port = parseInt(process.env.PORT || '8000', 10);
app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});