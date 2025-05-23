"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { movieType } from "@/types/Movietypes";

export default function SearchBar() {
  // User input and search results
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<movieType[]>([]);

  // Whether the input is currently focused
  const [isFocused, setIsFocused] = useState(false);

  // For navigating to selected movie detail page
  const router = useRouter();

  // Ref to detect clicks outside the search box
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close search box if user clicks outside it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setQuery("");
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  // Perform debounced search when query changes
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/movies?search=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error("Search failed");

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Navigate to selected movie and reset search
  function handleSelect(movie: movieType) {
    router.push(`/movies/${movie.slug}`);
    setQuery("");
    setResults([]);
  }

  return (
    <>
      {/* Blur background overlay when active */}
      {(isFocused || query.length > 0) && (
        <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30" />
      )}

      {/* Search box container */}
      <div
        ref={wrapperRef}
        className="relative z-20 w-full max-w-xl mx-auto mt-12 mb-16 px-2"
      >
        {/* Heading */}
        <h2 className="text-xl sm:text-xl md:text-2xl font-semibold text-center mb-2 px-2 text-white">
          What movie do you want to watch?
        </h2>

        {/* Search input and results */}
        <div
          className={`relative overflow-hidden px-2 py-2 transition-all duration-200 ${
            isFocused || query.length > 0
              ? "bg-kino-white text-black rounded-xl mx-2"
              : ""
          }`}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search movie or genre"
            className="text-xl w-full px-4 py-3 bg-white text-black placeholder-gray-500 rounded-xl focus:outline-none pr-10 focus:border-black focus:border-2"
          />

          {/* Clear button */}
          {query.length > 0 && (
            <button
              onClick={() => setQuery("")}
              className="absolute top-4 right-6 text-black text-4xl cursor-pointer"
              aria-label="Clear search"
            >
              &times;
            </button>
          )}

          {/* Search results */}
          {query.length >= 2 && (
            <ul className="mt-2 max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                results.map((movie) => (
                  <li
                    key={movie.slug}
                    onClick={() => handleSelect(movie)}
                    className="px-4 py-3 cursor-pointer hover:bg-red-300 rounded-xl"
                  >
                    <p className="font-semibold">{movie.title}</p>
                    <p className="text-sm text-kino-darkgrey">
                      {movie.genre.join(" ")}
                    </p>
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 text-kino-white">
                  <strong>No match</strong>
                  <p className="text-sm">
                    We couldn&apos;s find anything based on your search
                  </p>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}