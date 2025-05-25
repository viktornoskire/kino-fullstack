import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Seat from "@/models/seat";
import Booking from "@/models/booking";
import Reservation from "@/models/reservation";
import type {
  SeatDocument,
  BookingDocument,
  ReservationDocument,
} from "./ScreeningId.types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ screeningId: string }> }
) {
  const { screeningId } = await params;

  try {
    await connectDB();

    const allSeatsRaw = await Seat.find().lean();
    const allSeats = allSeatsRaw as unknown as SeatDocument[];

    const bookingsRaw = await Booking.find({
      screeningId,
      status: { $ne: "cancelled" },
    }).lean();
    const bookings = bookingsRaw as unknown as BookingDocument[];

    const activeResRaw = await Reservation.find({
      screeningId,
      status: "reserved",
    }).lean();
    const activeReservations = activeResRaw as unknown as ReservationDocument[];

    const bookedSeatIds = new Set<string>();
    bookings.forEach((b) =>
      (b.seatIds || []).forEach((id) => bookedSeatIds.add(id.toString()))
    );
    activeReservations.forEach((r) =>
      (r.seats || []).forEach((id) => bookedSeatIds.add(id.toString()))
    );

    const seatsWithStatus: SeatDocument[] = allSeats.map((seat) => ({
      ...seat,
      isBooked: bookedSeatIds.has(seat._id.toString()),
    }));

    return NextResponse.json(seatsWithStatus);
  } catch (error) {
    console.error("Error fetching seats:", error);
    return NextResponse.json(
      { error: "Error fetching seats" },
      { status: 500 }
    );
  }
}
