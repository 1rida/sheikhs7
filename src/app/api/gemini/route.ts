import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_API_KEY!
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      "Hello Gemini"
    );

    return NextResponse.json({
      reply: result.response.text(),
    });
  } catch (e: unknown) {
    let message = 'An unknown error occurred.';
    if (e instanceof Error) {
      message = e.message;
    }
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
