import { GoogleGenAI } from "@google/genai";

function getAI() {
  // Use process.env.API_KEY if available (from platform dialog), 
  // otherwise fallback to process.env.GEMINI_API_KEY
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey });
}

function handleGeminiError(error: any, fallbackMessage: string) {
  // Log it for debugging
  console.error("Gemini Error Details:", error);
  
  // Check for rate limit error (429) in various possible structures
  const message = error?.message || "";
  const code = error?.code || error?.status || error?.error?.code;
  const status = error?.status || error?.error?.status;
  
  const isRateLimit = 
    code === 429 || 
    status === "RESOURCE_EXHAUSTED" || 
    message.includes("429") || 
    message.includes("RESOURCE_EXHAUSTED") ||
    JSON.stringify(error).includes("429");

  if (isRateLimit) {
    return "The AI is currently resting due to high demand (Rate Limit reached). Please try again in a few minutes, or use the 'Select API Key' option in the Help Center for uninterrupted access.";
  }
  
  return fallbackMessage;
}

export async function getConnectTheDots(mood: string, food: string, stressLevel: number) {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const prompt = `As a Holistic Resilience Architect (performance coach), explain the connection between these inputs:
  Mood: ${mood}
  Recent Food: ${food}
  Stress Level: ${stressLevel}/10
  
  Base all advice on:
  - The behavioral science of 'Atomic Habits' (James Clear)
  - The metabolic insights of 'The Glucose Revolution' (Jessie Inchauspé)
  - The nervous system regulation techniques found in 'Burnout' (Nagoski) and 'The Body Keeps the Score' (van der Kolk)
  - The cognitive principles of 'Thinking, Fast and Slow' (Daniel Kahneman)

  Provide a short, witty, and science-backed explanation. 
  Use bold text for key actions and bullet points for steps. Keep it scannable.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text || "Connection logic loading...";
  } catch (error) {
    return handleGeminiError(error, "The dots are currently disconnected. Try again in a moment.");
  }
}

export async function getAdaptiveWins(stressLevel: number) {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const prompt = `As a Holistic Resilience Architect, generate 3 personalized "Daily Wins" for a high-achiever with a stress level of ${stressLevel}/10.
  One for Mind (Psychology), one for Fuel (Nutrition), and one for Body (Stress Regulation).
  
  Base all advice on:
  - 'Atomic Habits' (Identity-based habits)
  - 'The Glucose Revolution' (Metabolic stability)
  - 'Burnout' and 'The Body Keeps the Score' (Nervous system reset)

  Keep them low-friction and science-backed.
  Return as a JSON array of objects with keys: title, description, category (mind, fuel, body).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    // Detect rate limit even for JSON responses to log it correctly
    handleGeminiError(error, "");
    
    // For JSON responses, we return the static fallback
    return [
      { title: "Deep Breath", description: "Take 3 conscious breaths.", category: "body" },
      { title: "Hydrate", description: "Drink 500ml of water.", category: "fuel" },
      { title: "Quick Reframe", description: "Name one thing going well.", category: "mind" }
    ];
  }
}

export async function getSourceOfTheDay() {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const prompt = `Generate a "Source of the Day" notification for a high-end wellness app.
  It should be inspired by one of these books: 
  - 'Thinking, Fast and Slow'
  - 'Atomic Habits'
  - 'The Glucose Revolution'
  - 'How Not to Die'
  - 'The Body Keeps the Score'
  - 'Burnout'

  Format: "Today’s [Stress Killer/Mindset Shift/Fuel Hack] is inspired by '[Book Title]': [Actionable Tip]."
  Example: "Today’s Stress Killer is inspired by 'The Body Keeps the Score': Try 30 seconds of jumping jacks to reset your nervous system from 'Freeze' to 'Flow'."
  
  Return only the text.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text || "Today's tip is loading...";
  } catch (error) {
    const msg = handleGeminiError(error, "Today's Stress Killer is inspired by 'The Body Keeps the Score': Try 30 seconds of jumping jacks to reset your nervous system.");
    return msg;
  }
}

export async function searchBookIdea(query: string) {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const prompt = `Search for and explain this idea from the context of high-performance wellness books (like 'Atomic Habits', 'The Glucose Revolution', 'The Body Keeps the Score', etc.): ${query}
  
  Provide a concise, actionable explanation with citations if possible.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    // Extract grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks?.map((chunk: any) => chunk.web?.uri).filter(Boolean) || [];
    
    return {
      text: response.text || "No results found.",
      sources: Array.from(new Set(sources)) as string[]
    };
  } catch (error) {
    const msg = handleGeminiError(error, "The search system is currently offline. Please try again later.");
    return {
      text: msg,
      sources: []
    };
  }
}
