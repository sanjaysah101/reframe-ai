"use server";

import OpenAI from "openai";

const NOVITA_API_KEY = process.env.NEXT_PUBLIC_NOVITA_API_KEY;
const BASE_URL = "https://api.novita.ai/v3/openai";
const MODEL = "meta-llama/llama-3.1-8b-instruct";

function ensureApiKey(): string {
  if (!NOVITA_API_KEY) {
    // eslint-disable-next-line no-console
    console.error("CRITICAL: Novita API Key not configured.");
    throw new Error("Novita API Key is missing. Set NEXT_PUBLIC_NOVITA_API_KEY in environment variables.");
  }
  return NOVITA_API_KEY;
}

const openai = new OpenAI({
  apiKey: ensureApiKey(),
  baseURL: BASE_URL,
  dangerouslyAllowBrowser: true,
});

export async function callNovitaAi(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert modern web developer. Follow strict HTML output rules.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    });

    const result = response.choices[0].message?.content?.trim();

    if (!result || !result.toLowerCase().includes("<!doctype html>")) {
      throw new Error("Response is not a valid HTML document.");
    }

    return result
      .replace(/^```(?:html)?\s*/, "")
      .replace(/```$/, "")
      .trim();
  } catch (err: any) {
    const message = err?.response?.data?.message || err.message;
    throw new Error(`Novita API Error: ${message}`);
  }
}
