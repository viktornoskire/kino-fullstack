import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Types } from "mongoose";
import Seat from "@/models/seat";
import Booking from "@/models/booking";
import Reservation from "@/models/reservation";
import {
  SeatDocument,
  ReservationDocument,
  BookingDocument,
} from "./ScreeningId.types";

export async function GET(
  request: Request,
  context: { params: { screeningId: string } }
) {
  const resolvedParams = await context.params;
  const screeningId = resolvedParams.screeningId;

  try {
    await connectDB();

    const allSeats = (await Seat.find().lean()) as unknown as SeatDocument[];

    const bookings = (await Booking.find({
      screeningId,
      status: { $ne: "cancelled" },
    }).lean()) as unknown as BookingDocument[];

    const activeReservations = (await Reservation.find({
      screeningId,
      status: "reserved",
    }).lean()) as unknown as ReservationDocument[];

    const bookedSeatIds = new Set(
      bookings.flatMap((booking: BookingDocument) =>
        (booking.seatIds || []).map((seatId: Types.ObjectId | string) =>
          seatId.toString()
        )
      )
    );

    activeReservations.forEach((reservation: ReservationDocument) => {
      (reservation.seats || []).forEach((seatId: Types.ObjectId | string) => {
        bookedSeatIds.add(seatId.toString());
      });
    });

    const seatsWithStatus: SeatDocument[] = allSeats.map(
      (seat: SeatDocument) => ({
        ...seat,
        isBooked: bookedSeatIds.has(seat._id.toString()),
      })
    );

    return NextResponse.json(seatsWithStatus);
  } catch (error) {
    console.error("Error fetching seats:", error);
    return NextResponse.json(
      { error: "Error fetching seats" },
      { status: 500 }
    );
  }
}
