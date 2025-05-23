import { FC } from "react";
import { movieType } from "@/types/Movietypes";
import Image from "next/image";

interface RenderCurrentMoviesProps {
  movies: movieType[];
  title?: string;
}

const RenderCurrentMovies: FC<RenderCurrentMoviesProps> = ({ movies, title }) => {
  return (
    <>
      <div>
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-center py-3 sm:pb-3">
          {title}
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center mx-2">
          {movies.map((movie, index) => {
            return (
              <li key={index} className="p-2 max-w-[240px]">
                <a href={`/movies/${movie.slug}`}>
                  <Image
                    src={movie.posterUrl}
                    alt="Movie poster"
                    width={300}
                    height={450}
                    className="w-auto h-auto mb-2 rounded-2xl"
                  />
                  <p className="text-xl mb-1">{movie.title}</p>
                  <p className="text-kino-grey">{movie.genre.slice(0, 2).join(", ")}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default RenderCurrentMovies;
