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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const baseUrl = "/api/movies?tags=nowShowing";
        const fullUrl = selectedTag
          ? `${baseUrl}&tags=${selectedTag}`
          : baseUrl;

        const res = await fetch(fullUrl);
        if (!res.ok) throw new Error("Could not fetch movies");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
        setVisibleCount(10);
      }
    }

    fetchMovies();
  }, [selectedTag]);

  const visibleMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;

  if (error) return <p>{error}</p>;
  if (loading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="ml-4 space-x-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`cursor-pointer px-6 py-2 rounded-xl border font-semibold transition hover:bg-kino-white
      ${selectedTag === null
              ? "bg-kino-white text-kino-black"
              : "border-kino-grey text-white bg-transparent hover:bg-kino-white hover:text-kino-black"}`}
        >
          Now showing
        </button>
        <button
          onClick={() => setSelectedTag("children")}
          className={`cursor-pointer px-6 py-2 rounded-xl border font-semibold transition hover:bg-kino-white
      ${selectedTag === "children"
              ? "bg-kino-white text-kino-black"
              : "border-kino-grey text-white bg-transparent hover:bg-kino-white hover:text-kino-black"}`}
        >
          Children & Family
        </button>
      </div>

      <RenderCurrentMovies
        movies={visibleMovies}
      />

      {hasMore && (
        <div className="text-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="mt-10 mb-10 px-14 py-2 text-center"
          >
            Show more movies
          </Button>
        </div>
      )}
    </div>
  );
}