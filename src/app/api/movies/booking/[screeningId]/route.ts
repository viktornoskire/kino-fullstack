import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Screening, ScreeningType } from "@/models/Screening";
import { movie } from "@/models/movies";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ screeningId: string }> }
) {
  const { screeningId } = await params;

  try {
    await connectDB();

    const screening = await Screening.findById(
      screeningId
    ).lean<ScreeningType>();
    if (!screening) {
      return NextResponse.json(
        { error: "Screening not found" },
        { status: 404 }
      );
    }

    const movieData = await movie.findById(screening.movieId).lean();
    if (!movieData) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const screeningsForThisMovie = await Screening.find({
      movieId: screening.movieId,
    }).lean<ScreeningType[]>();

    return NextResponse.json({
      screening,
      movie: movieData,
      screenings: screeningsForThisMovie,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
