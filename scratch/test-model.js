const { GoogleGenAI, Type } = require('@google/genai');
require('dotenv').config({ path: '.env.local' });

async function main() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const analysisResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Test",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { companyName: { type: Type.STRING } },
          required: ["companyName"]
        }
      }
    });
    console.log(analysisResponse.text);
  } catch (err) {
    console.error("Error Object:", err.message);
  }
}
main();
