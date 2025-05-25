import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reservation from "@/models/reservation";
import Booking from "@/models/booking";

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
      status: "reserved",
    });

    const existingBookings = await Booking.find({
      screeningId,
      seatIds: { $in: seats },
      status: "confirmed",
    });

    if (existingReservations.length > 0 || existingBookings.length > 0) {
      return NextResponse.json(
        { error: "Some seats are already booked or reserved" },
        { status: 409 }
      );
    }

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const reservation = await Reservation.create({
      screeningId,
      seats,
      userId,
      status: "reserved",
      totalPrice,
      expiresAt,
    });

    return NextResponse.json({
      success: true,
      reservationId: reservation._id,
      expiryTime: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Error creating reservation" },
      { status: 500 }
    );
  }
}
