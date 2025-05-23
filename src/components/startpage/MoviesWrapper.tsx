"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import RenderCurrentMovies from "../current-movies/RenderCurrentMovies";
import Spinner from "../Spinner";

import FilterButtons from "./FilterButtons";
import DateSelector from "./DateSelector";
import ShowMoreButton from "./ShowMoreButton";

import { movieType } from "@/types/Movietypes";

export default function NowShowingWrapper() {
  // Store all fetched movies
  const [movies, setMovies] = useState<movieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Controls how many movies to display
  const [visibleCount, setVisibleCount] = useState(10);

  // Filter states
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("all");

  // Fetch movies when filters change
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const url = new URL("/api/movies", window.location.origin);
        url.searchParams.append("tags", "nowShowing");

        // Add extra tag filter if one is selected
        if (selectedTag) {
          url.searchParams.append("tags", selectedTag);
        }

        // Add date filter if applicable
        const dateFilter = getFormattedDate(selectedDate);
        if (dateFilter) {
          url.searchParams.append("screeningDate", dateFilter);
        }

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Could not fetch movies");

        const data = await res.json();
        setMovies(data);
        setVisibleCount(10);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [selectedTag, selectedDate]);

  // Convert filter option to date string if needed
  function getFormattedDate(option: string): string | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (option === "all") return null;

    if (option === "today") {
      return format(today, "yyyy-MM-dd");
    }

    if (option === "tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return format(tomorrow, "yyyy-MM-dd");
    }

    return option;
  }

  // Determine which movies to show right now
  const visibleMovies = movies.slice(0, visibleCount);
  const hasMoreMovies = visibleCount < movies.length;

  // Show error message if something went wrong
  if (error) return <p>{error}</p>;

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    );
  }

  // Render filters, movie list and pagination button
  return (
    <div className="">
      <FilterButtons selectedTag={selectedTag} onSelect={setSelectedTag} />
      <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
      <RenderCurrentMovies movies={visibleMovies} />
      {hasMoreMovies && (
        <ShowMoreButton onClick={() => setVisibleCount((prev) => prev + 10)} />
      )}
    </div>
  );
}
