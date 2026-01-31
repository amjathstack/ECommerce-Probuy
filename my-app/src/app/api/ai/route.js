import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const prompt =
      formData.get("prompt") ??
      "Give one title (8 words) and one description (35 words). Do not add anything else.";

    if (!image || typeof image === "string") {
      return NextResponse.json(
        { success: false, error: "Invalid image file" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY missing");
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview", // ✅ CORRECT
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: image.type,
                data: buffer.toString("base64"),
              },
            },
          ],
        },
      ],
    });

    const text =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return NextResponse.json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
