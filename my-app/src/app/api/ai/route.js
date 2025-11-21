import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs"; 

export async function POST(req) {
  try {
    const form = await req.formData();

    const image = form.get("image");
    const prompt = form.get("prompt") || "Give me a one title and 20 wrods of description only don't generate anything";

  
    const bytes = Buffer.from(await image.arrayBuffer());

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY, 
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite-preview-02-05",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: image.type, 
                data: bytes.toString("base64"),
              },
            },
          ],
        },
      ],
    });

    return NextResponse.json({ 
      status:true, message: response.text
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
