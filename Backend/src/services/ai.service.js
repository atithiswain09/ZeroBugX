// CommonJS version

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey:process.env.GOOGLE_GEMINI_KEY});

async function main(prompt,code) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `### Prompt\n${prompt}\n### File\n${code}`,
  });

  return response.text;
}


module.exports=main;