import { NextResponse, NextRequest } from 'next/server';
import { movie } from '@/models/movies';
import connectDB from '@/lib/db';

export async function GET(req: NextRequest) {
try {
    await connectDB();
<<<<<<< HEAD
    const movieTag = req.nextUrl.searchParams.get('tags');
    const movies = await movie.find({ tags: movieTag });
=======

    const tagParams = req.nextUrl.searchParams.getAll("tags");
    const filter = tagParams.length > 0
      ? { tags: { $all: tagParams } }
      : {};

    const movies = await movie.find(filter);
>>>>>>> b970c69 (Added tag-based filtering to NowShowingWrapper and updated movie API to support multiple tags with getAll)
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Couldn't get movies:", error);
  }
}
