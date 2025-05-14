import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { movie } from "@/models/movies";
import { review } from "@/models/reviews";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  await connectDB();

  const foundMovie = (await movie
    .findOne({ slug: resolvedParams.slug })
    .lean()) as { _id: string };

  if (!foundMovie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  const reviews = await review.find({ movieId: foundMovie._id }).lean();

  return NextResponse.json({ reviews }, { status: 200 });
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();

    if (!body.slug) {
      return NextResponse.json(
        { error: "Movie slug is required" },
        { status: 400 }
      );
    }

    const foundMovie = await movie.findOne({ slug: body.slug });

    if (!foundMovie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    if (!body.userName || !body.rating || !body.comment) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const rating = Number(body.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const newReview = await review.create({
      movieId: foundMovie._id,
      userName: body.userName,
      rating: rating,
      comment: body.comment,
    });

    return NextResponse.json(
      { message: "Review added successfully", review: newReview },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
