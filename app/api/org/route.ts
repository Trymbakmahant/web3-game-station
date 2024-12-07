/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { Organization } from "@/model/Orgs";
import { connectMongoDB } from "@/config/dbConfig";

// Create a new organization
export async function POST(request: NextRequest) {
  try {
    // Ensure MongoDB connection
    await connectMongoDB();

    // Parse request body
    const requestBody = await request.json();
    console.log(requestBody);

    try {
      // Create new organization
      const organization = new Organization({
        name: requestBody.name,
        discordHandle: requestBody.discordHandle || undefined,
        telegramHandle: requestBody.telegramHandle || undefined,
        description: requestBody.description || undefined,
        base: requestBody.base || undefined,
        isActive: requestBody.isActive ?? true,
      });

      // Save the organization
      const savedOrg = await organization.save();

      return NextResponse.json(
        {
          message: "Organization created successfully",
          organization: {
            id: savedOrg._id,
            name: savedOrg.name,
            discordHandle: savedOrg.discordHandle,
            telegramHandle: savedOrg.telegramHandle,
            base: savedOrg.base,
          },
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
    console.error("Error creating organization:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Get organizations (with pagination and filtering)
export async function GET(request: NextRequest) {
  try {
    // Ensure MongoDB connection
    await connectMongoDB();

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const isActive = searchParams.get("active");

    // Build query
    const query: any = {};

    // Add search filter for name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Add active filter
    if (isActive !== null) {
      query.isActive = isActive === "true";
    }

    // Find organizations with pagination
    const organizations = await Organization.find(query)
      .select("name discordHandle telegramHandle isActive") // Select specific fields
      .sort({ createdAt: -1 }) // Sort by most recent
      .skip((page - 1) * limit)
      .limit(limit);

    // Count total organizations
    const total = await Organization.countDocuments(query);

    return NextResponse.json({
      organizations: organizations.map((org) => ({
        id: org._id,
        name: org.name,
        discordHandle: org.discordHandle,
        telegramHandle: org.telegramHandle,
        isActive: org.isActive,
      })),
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalOrganizations: total,
    });
  } catch (error) {
    console.error("Error retrieving organizations:", error);

    return NextResponse.json(
      {
        message: "Failed to retrieve organizations",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Update an organization
export async function PUT(request: NextRequest) {
  try {
    // Ensure MongoDB connection
    await connectMongoDB();

    // Parse request body
    const requestBody = await request.json();

    // Validate required fields
    if (!requestBody.id) {
      return NextResponse.json(
        { message: "Organization ID is required" },
        { status: 400 }
      );
    }

    try {
      // Find and update the organization
      const updatedOrg = await Organization.findByIdAndUpdate(
        requestBody.id,
        {
          name: requestBody.name,
          discordHandle: requestBody.discordHandle,
          telegramHandle: requestBody.telegramHandle,
          description: requestBody.description,
          isActive: requestBody.isActive,
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Run model validations on update
        }
      );

      if (!updatedOrg) {
        return NextResponse.json(
          { message: "Organization not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Organization updated successfully",
        organization: {
          id: updatedOrg._id,
          name: updatedOrg.name,
          discordHandle: updatedOrg.discordHandle,
          telegramHandle: updatedOrg.telegramHandle,
        },
      });
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
    console.error("Error updating organization:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
