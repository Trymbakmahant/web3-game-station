/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { GameSession } from "@/model/Gamesession";
import { connectMongoDB } from "@/config/dbConfig";

export async function POST(request: NextRequest) {
  try {
    // Ensure MongoDB connection
    await connectMongoDB();

    // Parse request body
    const requestBody = await request.json();

    // Validate and create game session
    try {
      const gameSession = new GameSession({
        orgId: requestBody.orgId,
        title: requestBody.title,
        description: requestBody.description || "",
        startTime: new Date(requestBody.startTime),
        endTime: new Date(requestBody.endTime),
        maxPlayers: requestBody.maxPlayers,
        isPrivate: requestBody.isPrivate || false,
        reward: requestBody.reward || 0,
        // Optional: Add createdBy if you have authentication
        // createdBy: req.user.id
      });

      // Save the game session
      const savedSession = await gameSession.save();

      return NextResponse.json(
        {
          message: "Game session created successfully",
          gameSession: savedSession,
        },
        { status: 201 }
      );
    } catch (validationError) {
      // Handle Mongoose validation errors
      const errors = Object.values((validationError as any).errors).map(
        (err: any) => err.message
      );

      return NextResponse.json(
        {
          message: "Validation failed",
          errors,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error creating game session:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET handler to retrieve game sessions
export async function GET(request: NextRequest) {
  try {
    // Ensure MongoDB connection
    await connectMongoDB();

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Find active sessions with pagination
    const sessions = await GameSession.find({
      status: { $in: ["upcoming", "ongoing"] },
    })
      .sort({ startTime: 1 })
      .skip(skip)
      .limit(limit);

    // Count total sessions
    const total = await GameSession.countDocuments({
      status: { $in: ["upcoming", "ongoing"] },
    });

    return NextResponse.json({
      sessions,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSessions: total,
    });
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
