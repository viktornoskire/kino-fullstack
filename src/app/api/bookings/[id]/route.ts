import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Booking } from "@/models/booking";
import { Screening } from "@/models/Screening";
import { movie } from "@/models/movies";
import Seat from "@/models/seat";
import { BookingType } from "@/models/booking";

export async function GET(...args: [Request, { params: { id: string } }]) {
  const [req, { params }] = args;
  await connectDB();

  const booking = await Booking.findById(params.id).lean<BookingType>();
  if (!booking) {
    return NextResponse.json({ error: "Bokning ej hittad" }, { status: 404 });
  }

  // Hämta screening-objektet
  const screening = await Screening.findById(booking.screeningId).lean();

  // Hämta filmen via screening.movieId
  const screeningObj = Array.isArray(screening) ? screening[0] : screening;
  const Movie = screeningObj
    ? await movie.findById(screeningObj.movieId).lean()
    : null;

  // Hämta varje säte
  const seats = await Seat.find({
    _id: { $in: booking.seatIds },
  }).lean();

  return NextResponse.json({
    ...booking,
    screening,
    Movie,
    seats,
  });
}