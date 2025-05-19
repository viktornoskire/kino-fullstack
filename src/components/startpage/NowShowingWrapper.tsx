"use client";

import { useEffect, useState } from "react";
import { movieType } from "@/types/Movietypes";
import RenderCurrentMovies from "../current-movies/RenderCurrentMovies";
import Spinner from "../Spinner";
import Button from "@/components/Button";

export default function NowShowingWrapper() {
  const [movies, setMovies] = useState<movieType[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/movies?tags=nowShowing");
        if (!res.ok) throw new Error("Could not fetch movies");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
      }
    }

    fetchMovies();
  }, []);

  const visibleMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;

  if (error) return <p>{error}</p>;
  if (movies.length === 0) return <Spinner />;

  return (
    <div className="text-center">
      <RenderCurrentMovies
        movies={visibleMovies}
        title="Now showing on Kino cinema"
      />
      {hasMore && (
        <Button
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 10)}
          className="mt-10 mb-10 px-14 py-2"
        >
          Show more movies
        </Button>
      )}
    </div>
  );
}