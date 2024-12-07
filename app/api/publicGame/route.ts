import { connectMongoDB } from "@/config/dbConfig";
import { GameSession } from "@/model/Gamesession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const currentTime = Math.floor(Date.now() / 1000);
    const isPrivate = searchParams.get("isPrivate") === "true";

    const sessions = await GameSession.find({
      endTime: { $gt: currentTime },
      isPrivate: isPrivate,
    }).sort({ startTime: 1 });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error retrieving game sessions:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve game sessions",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
