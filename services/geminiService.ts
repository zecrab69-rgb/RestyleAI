import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a restyled image based on an original image and a text prompt.
 * Uses gemini-2.5-flash-image for fast image editing.
 */
export const restyleFurniture = async (
  imageBase64: string,
  prompt: string
): Promise<string> => {
  try {
    // Strip the data:image/xyz;base64, prefix if present
    const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
    
    // Determine mime type from the header or default to png
    const match = imageBase64.match(/^data:(image\/[a-z]+);base64,/);
    const mimeType = match ? match[1] : 'image/png';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `You are an expert furniture restorer. Edit this image of a piece of furniture. ${prompt}. Maintain the perspective and main structure exactly, only change the surface finish, colors, and textures.`
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64
            }
          }
        ]
      }
    });

    // Handle response to extract the generated image
    // Note: The response for image generation typically comes in candidates -> content -> parts -> inlineData or text
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("No content generated");
    }

    // Search for the image part
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};