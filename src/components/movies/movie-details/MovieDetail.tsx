import Image from "next/image";

interface MovieDetailProps {
  movie: {
    title: string;
    slug: string;
    ageLimit: number;
    durationMinutes: number;
    genre: string[];
    posterUrl: string;
    description: string;
  };
}

export default function MovieDetail({ movie }: MovieDetailProps) {
  const hours = Math.floor(movie.durationMinutes / 60);
  const minutes = movie.durationMinutes % 60;

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-kino-white mb-2">
        {movie.title}
      </h1>

      <p className="flex items-center gap-2 text-sm text-kino-grey mb-4">
        <span className="px-2 py-1 rounded-md border border-kino-grey text-kino-grey text-xs font-semibold">
          {movie.ageLimit}+
        </span>
        <span>
          {hours} h {minutes} min
        </span>
        <span>{movie.genre.join(", ")}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <Image
          src={movie.posterUrl}
          alt={movie.title || "Movieposter"}
          width={400}
          height={600}
          loading="lazy"
          className="rounded-4xl w-full md:w-1/2 max-h-[550px]"
        />

        <div className="bg-kino-darkgrey rounded-4xl p-4 text-lg leading-relaxed md:w-1/2 text-kino-white max-h-[550px]">
          {movie.description}
        </div>
      </div>
    </div>
  );
}
