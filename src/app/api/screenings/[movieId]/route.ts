import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

interface IScreening {
  movieId: mongoose.Types.ObjectId;
  screeningTime: string | Date;
  auditorium: string;
  status: string;
}

const screeningSchema = new mongoose.Schema(
  {
    movieId: mongoose.Schema.Types.ObjectId,
    screeningTime: String,
    auditorium: String,
    status: String,
  },
  { collection: "screenings" }
);

const Screening =
  mongoose.models.Screening ||
  mongoose.model<IScreening>("Screening", screeningSchema);

export async function GET(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    const movieIdParam = params?.movieId;
    if (!movieIdParam) {
      return new NextResponse("Movie ID is required", { status: 400 });
    }

    await connectDB();

    let movieId;
    try {
      movieId = new mongoose.Types.ObjectId(movieIdParam);
    } catch (err) {
      console.error("Invalid movie ID format:", err);
      return new NextResponse("Invalid movie ID format", { status: 400 });
    }

    console.log(`Looking for screenings for movie: ${movieId}`);

    const now = new Date();
    const tenDaysLater = new Date();
    tenDaysLater.setDate(now.getDate() + 10);

    console.log(
      "Date range:",
      now.toISOString(),
      "to",
      tenDaysLater.toISOString()
    );

    const allScreenings = await Screening.find({
      movieId: movieId,
    }).lean();

    console.log(
      `Total screenings for movie ${movieId} (all dates): ${allScreenings.length}`
    );

    if (allScreenings.length > 0) {
      console.log("All screening dates for this movie:");
      allScreenings.forEach((screening, index) => {
        console.log(
          `${index + 1}. ${screening.screeningTime} in ${screening.auditorium}`
        );
      });
    }

    const upcomingScreenings = allScreenings.filter((screening) => {
      const screeningDate = new Date(screening.screeningTime);
      return screeningDate >= now && screeningDate <= tenDaysLater;
    });

    upcomingScreenings.sort((a, b) => {
      return (
        new Date(a.screeningTime).getTime() -
        new Date(b.screeningTime).getTime()
      );
    });

    console.log(
      `Found ${upcomingScreenings.length} screenings for movie ${movieId} in the next 10 days`
    );

    if (upcomingScreenings.length > 0) {
      console.log("Upcoming screenings in next 10 days:");
      upcomingScreenings.forEach((screening, index) => {
        console.log(
          `${index + 1}. ${screening.screeningTime} in ${screening.auditorium}`
        );
      });
    }

    return NextResponse.json({
      movieId: movieId.toString(),
      dateRange: {
        from: now.toISOString(),
        to: tenDaysLater.toISOString(),
      },
      allScreeningsCount: allScreenings.length,
      upcomingScreeningsCount: upcomingScreenings.length,
      screenings: upcomingScreenings,
      count: upcomingScreenings.length,
    });
  } catch (err) {
    console.log("Error getting screenings for movie:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
