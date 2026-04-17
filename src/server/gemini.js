const defaultModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function isGeminiConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}

function stripCodeFences(text) {
  return String(text || "")
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

async function generateStructuredJson({ systemInstruction, prompt, schema, temperature = 0.9 }) {
  if (!isGeminiConfigured()) {
    return null;
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${defaultModel}:generateContent`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature,
        responseMimeType: "application/json",
        responseJsonSchema: schema
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return JSON.parse(stripCodeFences(text));
}

module.exports = {
  generateStructuredJson,
  isGeminiConfigured
};
