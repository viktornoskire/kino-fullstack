import { NextResponse, NextRequest } from "next/server";
import { movie } from "@/models/movies";
import { Screening } from "@/models/Screening";
import connectDB from "@/lib/db";
import { FilterQuery } from "mongoose";
import { movieType } from "@/types/Movietypes";

type MovieWithNextScreening = movieType & {
  nextScreeningTime: Date | null;
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Read URL parameters
    const tags = req.nextUrl.searchParams.getAll("tags");
    const date = req.nextUrl.searchParams.get("screeningDate");
    const search = req.nextUrl.searchParams.get("search");

    // Build movie filter
    const filter: FilterQuery<movieType> = {};
    if (tags.length > 0) {
      filter.tags = { $all: tags };
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } },
      ];
    }

    // Get movies and all screenings
    const movies: movieType[] = await movie.find(filter).lean<movieType[]>();
    const screenings = await Screening.find({}).lean();
    const now = new Date();

    // If a date is selected, prepare the day range
    const dayStart = date ? new Date(date) : null;
    const dayEnd = date
      ? new Date(new Date(date).setHours(23, 59, 59, 999))
      : null;

    // Prepare and sort movies
    const result: MovieWithNextScreening[] = movies
      .map((m) => {
        // Find all screenings for this movie
        let times = screenings.filter((s) => s.movieId.equals(m._id));

        // Filter screenings by selected date (if any)
        if (dayStart && dayEnd) {
          times = times.filter((s) => {
            const t = new Date(s.screeningTime);
            return t >= dayStart && t <= dayEnd;
          });
        }

        // Find the next future screening
        const next = times
          .map((s) => new Date(s.screeningTime))
          .filter((t) => t >= now)
          .sort((a, b) => a.getTime() - b.getTime())[0];

        return { ...m, nextScreeningTime: next || null };
      })
      // If filtering by date, remove movies with no screenings that day
      .filter((m) => !date || m.nextScreeningTime)
      // Sort movies by the next screening time
      .sort((a, b) => {
        const aTime = a.nextScreeningTime?.getTime() ?? Infinity;
        const bTime = b.nextScreeningTime?.getTime() ?? Infinity;
        return aTime - bTime;
      });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Could not load movies:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}