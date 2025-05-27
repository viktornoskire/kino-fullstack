import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reservation from "@/models/reservation";
import Booking from "@/models/booking";

export async function POST(request: Request) {
  try {
    const { reservationId, userInfo, paymentMethod } = await request.json();

    if (!reservationId || !userInfo || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found or expired" },
        { status: 404 }
      );
    }

    if (reservation.status !== "reserved") {
      return NextResponse.json(
        {
          error: `Reservation is no longer valid (status: ${reservation.status})`,
        },
        { status: 400 }
      );
    }

    const existingBooking = await Booking.findOne({
      screeningId: reservation.screeningId,
      seatIds: { $in: reservation.seats },
      status: "confirmed",
    });

    if (existingBooking) {
      reservation.status = "cancelled";
      await reservation.save();

      return NextResponse.json(
        { error: "One or more seats have already been booked by someone else" },
        { status: 409 }
      );
    }

    const booking = await Booking.create({
      screeningId: reservation.screeningId,
      seatIds: reservation.seats,
      userId: reservation.userId,
      status: "confirmed",
      totalPrice: reservation.totalPrice,
      customerInfo: {
        email: userInfo.email,
        phone: userInfo.phoneNumber,
        name: userInfo.name,
      },
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "atCinema" ? "pending" : "completed",
    });

    reservation.status = "confirmed";
    await reservation.save();

    return NextResponse.json({ success: true, bookingId: booking._id });
  } catch (error) {
    console.error("Error in booking confirmation:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
