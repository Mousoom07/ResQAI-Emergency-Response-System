require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function test() {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",   // ✅ IMPORTANT (NEW MODEL)
      contents: "Say hello"
    });

    console.log("RESULT:\n", res.text);

  } catch (err) {
    console.error("❌ ERROR:", err);
  }
}

test();