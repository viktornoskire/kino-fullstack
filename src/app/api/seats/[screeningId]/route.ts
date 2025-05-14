import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Seat from "@/models/seat";
import { Types } from "mongoose";

import Booking from "@/models/booking";

interface SeatDocument {
  _id: Types.ObjectId | string;
  row: number;
  seatNumber: number;
  [key: string]: unknown;
}

interface BookingDocument {
  _id: Types.ObjectId | string;
  screeningId: Types.ObjectId | string;
  seatIds: (Types.ObjectId | string)[];
  userId: string | null;
  status: string;
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
    console.log("Söker efter bokningar för screening:", screeningId);

    // Hämta alla säten
    const allSeats = (await Seat.find().lean()) as unknown as SeatDocument[];
    console.log(`Hittade ${allSeats.length} säten totalt`);

    // Använd Booking-modellen istället och sök efter "seatIds" fältet
    const bookings = (await Booking.find({
      screeningId,
      status: { $ne: "cancelled" },
    }).lean()) as unknown as BookingDocument[];

    console.log(`Hittade ${bookings.length} bokningar för denna screening`);

    // Skapa en uppsättning med bokade säte-IDs, använd "seatIds" istället för "seats"
    const bookedSeatIds = new Set(
      bookings.flatMap((booking: BookingDocument) =>
        (booking.seatIds || []).map((seatId: Types.ObjectId | string) =>
          seatId.toString()
        )
      )
    );

    console.log(`Totalt ${bookedSeatIds.size} bokade säten`);

    // Märk säten som tillgängliga eller bokade
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
