// /api/movies/booking/cancel-reservation/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reservation from "@/models/reservation";

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reservationId = searchParams.get("id");

    if (!reservationId) {
      const body = await request.json().catch(() => ({}));
      if (!body.reservationId) {
        return NextResponse.json(
          { error: "Missing reservation ID" },
          { status: 400 }
        );
      }
    }

    const idToDelete = reservationId || (await request.json()).reservationId;

    await connectDB();

    const result = await Reservation.findByIdAndDelete(idToDelete);

    if (!result) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    console.log(`Deleted reservation ${idToDelete}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { error: "Error deleting reservation" },
      { status: 500 }
    );
  }
}
