import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";  // Adjust according to your NextAuth config
import { db } from "@/lib/db";  // Make sure this is your Prisma client setup

// POST API for creating a house ad
export async function POST(request: Request) {
  try {
    console.log("Received a POST request");
    
    // Get the session to fetch the user
    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    
    // If the session is not available, return an error
    if (!session || !session.user?.id) {
      console.log("User not authenticated");
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    // Parsing the incoming JSON body
    const data = await request.json();
    console.log("Parsed data:", data);

    const {
      title,
      description,
      location,
      price,
      houseType,
      numberOfBedrooms,
      numberOfBathrooms,
      houseRentalCapacity,
      isFurnished,
      houseCondition,
      images,
    } = data;

    // Simple validation
    if (!title || !description || !price || !houseType || !houseRentalCapacity || !images || images.length === 0) {
      console.log("Missing required fields");
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Create the house ad in the database
    const newHouseAd = await db.houseAd.create({
      data: {
        title,
        description,
        location,
        price,
        houseType,
        numberOfBedrooms,
        numberOfBathrooms,
        houseRentalCapacity,
        isFurnished,
        houseCondition,
        images,
        userId: session.user.id, // Use the authenticated user's ID
      },
    });
    console.log("House ad created:", newHouseAd);

    // Return success response
    return NextResponse.json({ message: "House ad posted successfully", houseAd: newHouseAd }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error posting house ad:", error);

    // Type assertion to treat `error` as an instance of `Error`
    if (error instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }

    // Handle any other unexpected error type (fallback)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
