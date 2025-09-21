import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const dataUrlToPart = (dataUrl: string) => {
    const [header, data] = dataUrl.split(',');
    const mimeType = header.match(/:(.*?);/)?.[1];

    if (!mimeType || !data) {
        throw new Error("Invalid data URL format");
    }

    return {
        inlineData: {
            data,
            mimeType,
        }
    };
};


export const generateStyledImage = async (
  clothImageDataUrl: string,
  faceImageDataUrl: string,
  pose: string,
  aspectRatio: string,
  quality: string,
): Promise<string> => {
  try {
    const clothPart = dataUrlToPart(clothImageDataUrl);
    const facePart = dataUrlToPart(faceImageDataUrl);

    const prompt = `You are an expert AI fashion stylist. Your task is to generate a new, photorealistic image of a person wearing a specific piece of clothing. Two images will be provided: one of the person's face, and one of the clothing item.

**Constraint Checklist (Must be 100% fulfilled):**

1.  **Face Identity Preservation (CRITICAL PRIORITY):**
    *   The generated model's face **MUST BE AN EXACT REPLICA** of the face in the provided face image.
    *   Preserve **ALL** facial features: eye shape and color, nose, mouth, jawline, and any unique characteristics like freckles or moles.
    *   Maintain the **EXACT** skin tone, hair color, and hairstyle from the face image.
    *   **DO NOT** generate a new person. **DO NOT** blend features. Replicate the face perfectly. This is the most important instruction.

2.  **Clothing Application:**
    *   The model must be wearing the exact clothing item shown in the clothing image. The clothing should look natural on the model's body.

3.  **Pose & Composition:**
    *   The model must be in the following pose: "${pose}".
    *   The image must be a full-body shot of the model.
    *   The background must be a clean, minimalist studio setting (light gray or off-white).
    *   The lighting should be soft and professional, as in a fashion photoshoot.

4.  **Aspect Ratio:**
    *   The final image's aspect ratio must be strictly **${aspectRatio}**.
    
5.  **Image Quality:**
    *   The desired quality for the final image is: "${quality}".

**Final Output:**
A single, high-resolution, photorealistic image. Do not output text, only the image.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          facePart, // Face first for context
          clothPart,
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            const mimeType = part.inlineData.mimeType;
            return `data:${mimeType};base64,${base64ImageBytes}`;
        }
    }
    
    // Check for a text response if no image is found, which might contain an error or refusal.
    const textResponse = response.text;
    if (textResponse) {
        throw new Error(`Model returned a text response instead of an image: ${textResponse}`);
    }

    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image. Please check the console for more details.");
  }
};
