import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getConnectTheDots(mood: string, food: string, stressLevel: number) {
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
    console.error("Gemini Error:", error);
    return "The dots are currently disconnected. Try again in a moment.";
  }
}

export async function getAdaptiveWins(stressLevel: number) {
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
    console.error("Gemini Error:", error);
    return [
      { title: "Deep Breath", description: "Take 3 conscious breaths.", category: "body" },
      { title: "Hydrate", description: "Drink 500ml of water.", category: "fuel" },
      { title: "Quick Reframe", description: "Name one thing going well.", category: "mind" }
    ];
  }
}

export async function getSourceOfTheDay() {
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
    return "Today's Stress Killer is inspired by 'The Body Keeps the Score': Try 30 seconds of jumping jacks to reset your nervous system.";
  }
}

export async function searchBookIdea(query: string) {
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
    console.error("Gemini Search Error:", error);
    return {
      text: "The search system is currently offline. Please try again later.",
      sources: []
    };
  }
}
