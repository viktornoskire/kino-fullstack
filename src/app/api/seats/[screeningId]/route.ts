import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Seat from "@/models/seat";
import { Types } from "mongoose";
import Booking from "@/models/booking";
import Reservation from "@/models/reservation";

interface SeatDocument {
  _id: Types.ObjectId | string;
  row: number;
  seatNumber: number;
  [key: string]: unknown;
}

interface BookingDocument {
  _id: Types.ObjectId | string;
  screeningId: Types.ObjectId | string; //FIX ALL TPYING TO SEPARATE FILES LATER.
  seatIds: (Types.ObjectId | string)[];
  userId: string | null;
  status: string;
  [key: string]: unknown;
}

interface ReservationDocument {
  _id: Types.ObjectId | string;
  screeningId: Types.ObjectId | string;
  seats: (Types.ObjectId | string)[];
  userId: string;
  status: string;
  expiresAt: Date;
  [key: string]: unknown;
}

interface SeatWithBookingStatus extends SeatDocument {
  isBooked: boolean;
}

export async function GET(
  request: Request,
  context: { params: { screeningId: string } }
) {
  const resolvedParams = await context.params;
  const screeningId = resolvedParams.screeningId;

  try {
    await connectDB();
    console.log("Söker efter bokningar för screening:", screeningId); ///REMOVER LATER

    const allSeats = (await Seat.find().lean()) as unknown as SeatDocument[];
    console.log(`Hittade ${allSeats.length} säten totalt`); ///REMOVER LATER

    const bookings = (await Booking.find({
      screeningId,
      status: { $ne: "cancelled" },
    }).lean()) as unknown as BookingDocument[];

    console.log(`Hittade ${bookings.length} bokningar för denna screening`); ///REMOVER LATER

    const activeReservations = (await Reservation.find({
      screeningId,
      status: "reserved",
    }).lean()) as unknown as ReservationDocument[];

    console.log(
      `Hittade ${activeReservations.length} aktiva reservationer för denna screening` ///REMOVER LATER
    );

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

    console.log(`Totalt ${bookedSeatIds.size} bokade säten`); ///REMOVER LATER

    const seatsWithStatus: SeatWithBookingStatus[] = allSeats.map(
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
