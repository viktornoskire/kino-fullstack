"use client"
import { useEffect, useState } from "react"
import { movieType } from "@/types/Movietypes"
import RenderCurrentMovies from "./RenderCurrentMovies"

export default function CurrentMoviesList() {
  const [movies, setMovies] = useState<movieType[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/movies?tags=nowShowing")
        if (!res.ok) throw new Error("Could not fetch movies")
        const data = await res.json()
        setMovies(data)
      } catch (err) {
        console.error(err)
        setError("Failed to load movies")
      }
    }

    fetchMovies()
  }, [])

  if (error) return <p>{error}</p>
  if (movies.length === 0) return <p>Loading...</p>

  return (
    <div>
      <RenderCurrentMovies movies={movies} title="Now showing on Kino cinema" />;
    </div>
  );
}