import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/ask", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    const result = await model.generateContent(
      `You are a helpful AI study assistant. Answer clearly and simply.\nQuestion: ${question}`
    );

    const answer = result.response.text();

    res.json({ reply: answer });

  } catch (error) {
    console.error("FULL AI ERROR:", error.message || error);
    res.status(500).json({
      error: "AI failed: " + error.message,
    });
  }
});
export default router;