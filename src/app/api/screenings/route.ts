import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

// Definiera ett interface för dina screenings
interface IScreening {
  movieId: mongoose.Types.ObjectId;
  screeningTime: Date;
  auditorium: string;
  status: string;
}

// Skapa ett interface för dokumenten som returneras från databasen
interface ScreeningDocument extends mongoose.Document {
  movieId: mongoose.Types.ObjectId;
  screeningTime: Date;
  auditorium: string;
  status: string;
}

const screeningSchema = new mongoose.Schema(
  {
    movieId: mongoose.Schema.Types.ObjectId,
    screeningTime: Date,
    auditorium: String,
    status: String,
  },
  { collection: "screenings" }
);

const Screening =
  mongoose.models.Screening ||
  mongoose.model<IScreening>("Screening", screeningSchema);

export async function GET() {
  try {
    await connectDB();

    // 1. Logga för att se att anslutningen fungerar
    console.log("Connected to database");

    // 2. Hämta aktuellt datum och logga
    const now = new Date();
    console.log("Current date:", now);

    // 3. Kolla först om det finns NÅGRA visningar alls
    const totalCount = await Screening.countDocuments();
    console.log("Total screenings in database:", totalCount);

    // 4. Hämta alla visningar (utan filtrering) för att se om grund-queryn fungerar
    const allDbScreenings = await Screening.find().limit(5);
    console.log(
      "Sample of all screenings:",
      JSON.stringify(allDbScreenings, null, 2)
    );

    // 5. Nu hämta framtida visningar med bättre loggning
    console.log("Searching for screenings with date >=", now);
    const futureScreenings = await Screening.find({
      screeningTime: { $gte: now },
    }).sort({ screeningTime: 1 });

    console.log("Future screenings count:", futureScreenings.length);
    if (futureScreenings.length > 0) {
      console.log(
        "First future screening:",
        JSON.stringify(futureScreenings[0], null, 2)
      );
    }

    let allScreenings = futureScreenings;
    if (futureScreenings.length === 0) {
      console.log(
        "No future screenings found, fetching all instead for debugging"
      );
      allScreenings = await Screening.find().sort({ screeningTime: 1 });
      console.log("All screenings count:", allScreenings.length);
    }

    const screeningsByMovie: Record<string, ScreeningDocument[]> = {};

    allScreenings.forEach((screening) => {
      const movieId = screening.movieId.toString();

      if (!screeningsByMovie[movieId]) {
        screeningsByMovie[movieId] = [];
      }

      if (screeningsByMovie[movieId].length < 3) {
        screeningsByMovie[movieId].push(screening as ScreeningDocument);
      }
    });

    console.log("Movies found:", Object.keys(screeningsByMovie).length);
    console.log("Movies IDs:", Object.keys(screeningsByMovie));

    const limitedScreenings = Object.values(screeningsByMovie).flat();
    console.log("Limited screenings count:", limitedScreenings.length);

    return NextResponse.json(limitedScreenings);
  } catch (error) {
    console.log("Could not get screenings:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
