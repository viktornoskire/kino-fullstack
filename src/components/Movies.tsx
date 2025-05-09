"use client";
import { movieType } from "@/types/Movietypes";
import { useState, useEffect } from "react";
import Image from "next/image";

const Movies = () => {
  const [movies, setMovies] = useState<movieType[]>([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch("/api/movies");
        const dataMovies: movieType[] = await response.json();
        setMovies(dataMovies);
      } catch (err) {
        console.error("Couldn't get movies", err);
      }
    }

    loadMovies();
  }, []);

  const nowShowing = movies.filter((movie) =>
    movie.tags.includes("nowShowing")
  );

  shufffle(nowShowing);

  //Fisher-Yates algoritm
  function shufffle(shuff: movieType[]) {
    for (let i = shuff.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));

      [shuff[i], shuff[random]] = [shuff[random], shuff[i]];
    }
  }

  const display = nowShowing.slice(0, 5);

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-center p-4">
          Know showing on cinema
        </h2>
        <ul className="flex flex-row">
          {display.map((movie, index) => {
            return (
              <li key={index} className="p-2 max-w-[240px]">
                <a href={movie.slug}>
                  <Image
                    src={movie.posterUrl}
                    alt="Movie poster"
                    width={130}
                    height={180}
                    className="w-auto h-auto rounded-2xl"
                  />
                  <p className="text-xl">{movie.title}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default Movies;
