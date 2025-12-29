
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStrategyAnalysis = async (conflictDetails: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analiza este conflicto y sugiere acciones de respuesta estratégica. RESPONDE ÚNICAMENTE EN ESPAÑOL: ${conflictDetails}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskClassification: { type: Type.STRING },
            suggestedActions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["title", "description"]
              }
            },
            longTermOutlook: { type: Type.STRING }
          },
          required: ["riskClassification", "suggestedActions", "longTermOutlook"]
        }
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error de la API de Gemini:", error);
    return null;
  }
};

/**
 * Genera una imagen conceptual del conflicto usando Nano Banana (Gemini 2.5 Flash Image)
 */
export const generateConflictVisual = async (prompt: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a professional, high-concept, 3D cinematic visualization of a social or political conflict scenario. 
            Style: Corporate, clean, symbolic, high-end digital art for a strategy firm. 
            Context: ${prompt}. 
            Avoid gore or realistic violence; focus on symbolic tension, scales, broken bridges, or contrasting light/shadow to represent the dispute.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generando imagen con Nano Banana:", error);
    return null;
  }
};
