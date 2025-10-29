
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiDomainResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const domainInfoSchema = {
  type: Type.OBJECT,
  properties: {
    domainName: { type: Type.STRING, description: "The full domain name, including the TLD." },
    isAvailable: { type: Type.BOOLEAN, description: "Whether the domain is available for registration." },
    reason: { type: Type.STRING, description: "A brief reason if the domain is not available (e.g., 'Already registered', 'Premium domain'). Optional." },
  },
  required: ["domainName", "isAvailable"],
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
      primary: domainInfoSchema,
      suggestions: {
        type: Type.ARRAY,
        description: "A list of 5 creative and available alternative domain names.",
        items: domainInfoSchema,
      },
    },
    required: ["primary", "suggestions"],
};


export const checkDomainAvailability = async (domain: string): Promise<GeminiDomainResponse> => {
  try {
    const prompt = `
      You are a helpful domain registrar assistant.
      A user wants to check the availability of the domain "${domain}".

      1.  First, determine if "${domain}" is likely to be available. Treat very common or famous names (e.g., 'google.com', 'apple.com', 'news.com') as 'Taken'. Treat creative or unique names as 'Available'. This is a simulation.
      2.  If "${domain}" is taken, provide a reason like "Already registered".
      3.  Then, generate exactly 5 creative, clever, and available alternative domain suggestions.
      4.  The suggestions should use a mix of modern TLDs like .ai, .io, .app, .dev, .co, as well as traditional .com.
      5.  Ensure all suggested domains are marked as 'isAvailable: true'.
      6.  Return the response strictly in the specified JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    const result: GeminiDomainResponse = JSON.parse(jsonString);
    
    // Ensure the primary domain name in the response matches the query
    result.primary.domainName = domain;

    return result;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to check domain availability. The AI may be busy, please try again.");
  }
};
