import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reservation from "@/models/reservation";

export async function POST(request: Request) {
  try {
    const { screeningId, seats, userId, totalPrice } = await request.json();

    if (
      !screeningId ||
      !seats ||
      !Array.isArray(seats) ||
      seats.length === 0 ||
      !userId ||
      !totalPrice
    ) {
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingReservations = await Reservation.find({
      screeningId,
      seats: { $in: seats },
      status: { $ne: "cancelled" },
    });

    if (existingReservations.length > 0) {
      return NextResponse.json(
        { error: "Some seats are already booked" },
        { status: 409 }
      );
    }

    const reservation = await Reservation.create({
      screeningId,
      seats,
      userId,
      status: "reserved",
      totalPrice,
    });

    return NextResponse.json({
      success: true,
      reservationId: reservation._id,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Error creating reservation" },
      { status: 500 }
    );
  }
}
