import { Movie } from "@/models/singleMovie";
import MovieInfo from "./Movieinfo";
import { MovieInfoType } from "./types/MovieInfoContainer.types";

type Props = {
  slug: string;
};

const MoviePageContainer = async ({ slug }: Props) => {

  const movie = await Movie.findOne<MovieInfoType>({ slug }).lean();

  if (!movie) {
    return <div>Filmen hittades inte.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <MovieInfo title={movie.title} posterUrl={movie.posterUrl} />
    </div>
  );
};

export default MoviePageContainer;