import { NextResponse } from 'next/server';
import connectDB from "@/lib/db";
import { movie } from "@/models/movies";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  await connectDB();

  const foundMovie = await movie.findOne({ slug: resolvedParams.slug }).lean();

  if (!foundMovie) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ movie: foundMovie });
}
