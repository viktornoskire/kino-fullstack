import { NextResponse } from "next/server";
import { Movie } from "@/models/singleMovie";
import connectDB from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const foundMovie = await Movie.findOne({ slug: params.slug });

    if (!foundMovie) {
      return NextResponse.json({ error: "Film hittades inte" }, { status: 404 });
    }
    
    return NextResponse.json(foundMovie);
  } catch (error) {
    return new NextResponse("Internt serverfel", { status: 500 });
  }
}