
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePatentText = async (invention: string) => {
  const ai = getAI();
  const prompt = `Create a 19th-century United States Patent Office specification for an invention named "${invention}". 
  Include:
  1. A formal inventor name (archaic style).
  2. A Patent Number (6 digits).
  3. A Date (between 1870 and 1895).
  4. "Specification of Letters Patent" written in formal, archaic legalese.
  5. A detailed "Description of the Drawings" referring to Fig. 1, Fig. 2, and Fig. 3.
  6. Exactly three "Claims" starting with "I claim as my invention..." or "What I claim as new and desire to secure by Letters Patent is..."`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          inventor: { type: Type.STRING },
          date: { type: Type.STRING },
          patentNumber: { type: Type.STRING },
          specification: { type: Type.STRING, description: "The full specification text" },
          claims: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of exactly 3 claims"
          }
        },
        required: ["inventor", "date", "patentNumber", "specification", "claims"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generatePatentImage = async (invention: string, inventor: string, date: string) => {
  const ai = getAI();
  const prompt = `A vintage patent document for ${invention}, styled after late 1800s United States Patent Office filings. 
  The page features precise technical black-ink line drawings with numbered callouts (Fig. 1, Fig. 2, Fig. 3) showing front, side, and exploded views. 
  Handwritten annotations in faded fountain-pen ink describe mechanisms. 
  The paper is aged ivory with foxing stains, subtle yellowing, and soft fold creases. 
  An official embossed seal and a red wax stamp appear in the bottom corner. 
  A hand-signed inventor's name "${inventor}" and date "${date}" appear at the bottom. 
  The entire image is a high-resolution archival scan, authoritative, historic, and slightly mysterious, centered on a dark wooden desk background.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        aspectRatio: "3:4"
      }
    }
  });

  let imageUrl = '';
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }
  
  if (!imageUrl) throw new Error("Failed to generate patent illustration");
  return imageUrl;
};
