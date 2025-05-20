import connectDB from "@/lib/db";
import Reservation from "@/models/reservation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { reservationId } = await request.json();

    if (!reservationId) {
      return NextResponse.json(
        { error: "missing reservation id" },
        { status: 400 }
      );
    }

    await connectDB();

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    if (reservation.status === "reserved") {
      reservation.status = "cancelled";
      await reservation.save();
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    return NextResponse.json(
      { error: "Error cancelling reservation" },
      { status: 500 }
    );
  }
}
