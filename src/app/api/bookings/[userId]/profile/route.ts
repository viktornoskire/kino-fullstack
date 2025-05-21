import { NextResponse } from 'next/server';
import Booking from '@/models/booking';
import { Screening } from '@/models/Screening';
import { movie } from '@/models/movies';
import connectDB from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const resolvedParams = await params;
    await connectDB();
    const booked = await Booking.find(
      {
        userId: resolvedParams.userId,
        paymentStatus: 'completed',
      },
      'screeningId'
    );

    const findScreeing = booked.map((id) => id.screeningId);

    const bookedScreeing = await Screening.find({
      _id: { $in: findScreeing },
    });

    const findMovie = bookedScreeing.map((id) => id.movieId);

    const bookedMovie = await movie.find(
      { _id: { $in: findMovie } },
      'title posterUrl'
    );

    const screeningTime = bookedScreeing.map((time) => {
      return {
        movieId: time.movieId,
        date: time.screeningTime.toLocaleDateString('en-GB'),
        time: time.screeningTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
    });

    const madeBookings = bookedMovie.map((movie) => {
      const movieTime = screeningTime.find(
        (time) => movie._id.toString() === time.movieId.toString()
      );
      console.log(movieTime);
      if (movieTime) {
        return {
          movie: movie.title,
          url: movie.posterUrl,
          date: movieTime.date,
          time: movieTime.time,
        };
      }
    });

    return NextResponse.json(madeBookings);
  } catch (error) {
    console.error("Couldn't get bookings", error);
  }
}
