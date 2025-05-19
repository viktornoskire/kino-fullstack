<<<<<<< HEAD
import { NextResponse, NextRequest } from 'next/server';
import { movie } from '@/models/movies';
import connectDB from '@/lib/db';
=======
import { NextResponse, NextRequest } from "next/server";
import { movie } from "@/models/movies";
import { Screening } from "@/models/Screening";
import connectDB from "@/lib/db";
import { Types } from "mongoose";
>>>>>>> a319700 (Added filtering by date and tag to NowShowingWrapper and movie API route)

export async function GET(req: NextRequest) {
  try {
    await connectDB();
<<<<<<< HEAD
    const movieTag = req.nextUrl.searchParams.get('tags');
    const movies = await movie.find({ tags: movieTag });
=======

    const tagParams = req.nextUrl.searchParams.getAll("tags");
    const screeningDate = req.nextUrl.searchParams.get("screeningDate");

    const filter: any = {};
    if (tagParams.length > 0) {
      filter.tags = { $all: tagParams };
    }

    if (screeningDate) {
      const dateStart = new Date(`${screeningDate}T00:00:00Z`);
      const dateEnd = new Date(`${screeningDate}T23:59:59Z`);

      const allScreenings = await Screening.find({});
      const matchingScreenings = allScreenings.filter((s) => {
        const time = new Date(s.screeningTime);
        return time >= dateStart && time < dateEnd;
      });

      const movieIds = matchingScreenings.map((s) =>
        typeof s.movieId === "string"
          ? new Types.ObjectId(s.movieId)
          : s.movieId
      );

      if (movieIds.length === 0) return NextResponse.json([]);

      filter._id = { $in: movieIds };
    }

    const movies = await movie.find(filter);
>>>>>>> b970c69 (Added tag-based filtering to NowShowingWrapper and updated movie API to support multiple tags with getAll)
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Couldn't get movies:", error);
  }
}
