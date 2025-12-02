//{"id":"59302","variant":"standard","title":"Final chatAIRoutes.js for Smart Study App"}
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// POST /api/ai/ask
router.post("/ask", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages[] array is required" });
    }

    // Convert frontend format → Gemini format
    const lastUserMessage = messages[messages.length - 1].content;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(lastUserMessage);

    const aiText = result.response.text();

    res.json({ reply: aiText });
  } catch (error) {
    console.error("FULL AI ERROR:", error);
    res.status(500).json({
      error: "AI failed: " + error.message,
    });
  }
});

module.exports = router;
