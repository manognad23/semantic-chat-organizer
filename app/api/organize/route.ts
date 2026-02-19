import { NextRequest, NextResponse } from "next/server";
import { parseConversation } from "@/lib/parser";
import { categorizePairs } from "@/lib/categorizer";
import { categorizePairsWithAI } from "@/lib/categorizer-ai";

// Enable AI by default, can be disabled with USE_AI=false
const USE_AI = process.env.USE_AI !== "false";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { text } = body;

    if (typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'text' field" },
        { status: 400 }
      );
    }

    const trimmed = text.trim();
    if (trimmed.length === 0) {
      return NextResponse.json(
        { error: "Text cannot be empty" },
        { status: 400 }
      );
    }

    const pairs = parseConversation(trimmed);

    if (pairs.length === 0) {
      return NextResponse.json(
        {
          error:
            "Could not parse conversation. Use format: 'User: ... Assistant: ...'",
        },
        { status: 400 }
      );
    }

    let blocks;
    if (USE_AI && OPENAI_API_KEY) {
      blocks = await categorizePairsWithAI(pairs, OPENAI_API_KEY);
    } else {
      blocks = categorizePairs(pairs);
    }

    return NextResponse.json({ blocks });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
