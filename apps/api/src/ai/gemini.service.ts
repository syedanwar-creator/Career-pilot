import { Injectable } from "@nestjs/common";

const defaultModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function stripCodeFences(text: string): string {
  return String(text || "")
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

@Injectable()
export class GeminiService {
  isConfigured(): boolean {
    return Boolean(process.env.GEMINI_API_KEY);
  }

  async generateStructuredJson<T>({
    systemInstruction,
    prompt,
    schema,
    temperature = 0.7
  }: {
    systemInstruction: string;
    prompt: string;
    schema: Record<string, unknown>;
    temperature?: number;
  }): Promise<T | null> {
    if (!this.isConfigured()) {
      return null;
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${defaultModel}:generateContent`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY || ""
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
      throw new Error(`Gemini request failed with status ${response.status}: ${await response.text()}`);
    }

    const payload = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();

    if (!text) {
      throw new Error("Gemini returned an empty structured response.");
    }

    return JSON.parse(stripCodeFences(text)) as T;
  }
}
