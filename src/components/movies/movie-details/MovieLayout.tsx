import MovieDetail from "./MovieDetail";
import ScreeningSelector from "./ScreeningSelector";
import ShowReviews from "@/components/movies/movie-details/ShowReviews";
import PostReview from "./PostReview";
import { movieType } from "@/types/Movietypes";
import { ScreeningType } from "@/models/Screening";

type MovieLayoutProps = {
  movie: movieType;
  screenings: ScreeningType[];
};

export default function MovieLayout({ movie, screenings }: MovieLayoutProps) {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-24 gap-6">
      {/* Movie info */}
      <div className="col-span-1 md:col-start-1 md:col-end-15">
        <MovieDetail movie={movie} />
      </div>

      {/* Create review – mobile: below MovieDetail */}
      <div className="col-span-1 md:col-start-16 md:col-end-25 md:row-start-1 md:row-end-2 md:mt-[87px]">
        <PostReview movie={movie} />
      </div>

      {/* ScreeningSelector */}
      <div className="col-span-1 md:col-start-1 md:col-end-15">
        <ScreeningSelector screenings={screenings} />
      </div>

      {/* Show reviews */}
      <div className="col-span-1 md:col-start-16 md:col-end-25 md:row-start-2 md:row-end-3">
        <ShowReviews movie={movie} />
      </div>
    </div>
  );
}