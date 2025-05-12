// app/api/screenings/route.ts
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { movie } from "@/models/movies";
import { Screening } from "@/models/screenings";

interface LeanMovie {
  _id: mongoose.Types.ObjectId;
  slug: string;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const slug = req.nextUrl.searchParams.get("slug");
    // Lägg till en query parameter för att begränsa antalet resultat
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "3");

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug parameter" },
        { status: 400 }
      );
    }

    // Hitta film baserat på slug
    const movieDoc = await movie.findOne({ slug }).lean<LeanMovie>();

    if (!movieDoc) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    // Kontrollera om Screening-modellen finns
    if (!Screening) {
      console.error("Screening model is undefined");
      return NextResponse.json(
        { error: "Internal Server Error - Model not defined" },
        { status: 500 }
      );
    }

    // Skapa ett aktuellt datum för att filtrera bort tidigare visningar
    const currentDate = new Date();

    // Hämta endast framtida screenings, sorterade efter datum och begränsade till 5
    const screenings = await Screening.find({
      movieId: movieDoc._id,
      screeningTime: { $gte: currentDate.toISOString() }, // Endast framtida visningar
    })
      .sort({ screeningTime: 1 }) // Sortera efter datum i stigande ordning
      .limit(limit) // Begränsa till 5 (eller angivet värde)
      .lean();

    return NextResponse.json(screenings || []);
  } catch (error) {
    console.error("Failed to fetch screenings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
