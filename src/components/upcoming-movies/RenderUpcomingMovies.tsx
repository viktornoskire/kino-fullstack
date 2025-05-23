import { FC } from "react";
import { movieType } from "@/types/Movietypes";
import Image from "next/image";
import { format } from "date-fns";

interface RenderUpcomingMoviesProps {
  movies: movieType[];
  title?: string;
}

const RenderUpcomingMovies: FC<RenderUpcomingMoviesProps> = ({ movies, title }) => {
  // Sort movies based on closest premiereDate
  const sortedMovies = [...movies].sort((a, b) =>
    new Date(a.premiereDate).getTime() - new Date(b.premiereDate).getTime()
  );

  return (
    <div>
      <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-center py-3 sm:pb-4">
        {title}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center mx-2">
        {sortedMovies.map((movie, index) => (
          <li key={index} className="p-2 max-w-[240px]">
            <a href={`/movies/${movie.slug}`}>
              <Image
                src={movie.posterUrl}
                alt={`${movie.title} poster`}
                width={300}
                height={450}
                className="w-auto h-auto mb-2 rounded-2xl"
              />
              <p className="text-xl mb-1">{movie.title}</p>
              <p className="text-kino-grey mb-1">{movie.genre.slice(0, 2).join(", ")}</p>
              <p className="text-sm)]">
                Premiere: {format(new Date(movie.premiereDate), "d MMM yyyy")}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderUpcomingMovies;
