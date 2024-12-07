// app/api/user/router.ts
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/User"; // Adjust the path as necessary
import { connectMongoDB } from "@/config/dbConfig";

// Handle POST request for creating a user
export async function POST(request: NextRequest) {
  try {
    console.log("API route hit!"); // Debugging
    await connectMongoDB(); // Ensure MongoDB connection is established
    const requestBody = await request.json(); // Get the request body

    const user = new User({
      nickname: requestBody.nickname,
      base: requestBody.base,
    });

    const savedUser = await user.save();
    return NextResponse.json(
      { message: "User created", user: savedUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}

// Get users (with pagination)
export async function GET(request: NextRequest) {
  try {
    // Ensure MongoDB connection
    await connectMongoDB();

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Find users with pagination
    const users = await User.find()
      .select("nickname") // Only select nickname
      .sort({ createdAt: -1 }) // Sort by most recent
      .skip(skip)
      .limit(limit);

    // Count total users
    const total = await User.countDocuments();

    return NextResponse.json({
      users: users.map((user) => ({
        id: user._id,
        nickname: user.nickname,
      })),
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);

    return NextResponse.json(
      {
        message: "Failed to retrieve users",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}