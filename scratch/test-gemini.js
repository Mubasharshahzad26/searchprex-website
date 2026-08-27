const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: '.env.local' });

async function main() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "Hello",
    });
    console.log("Success:", response.text);
  } catch (err) {
    console.error("Error Object:", err);
  }
}
main();
