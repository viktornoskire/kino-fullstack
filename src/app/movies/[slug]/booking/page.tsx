
import DateDropdown from "./Datedropdown";
import BookingManager from "./BookingManager";
import Movies from "@/components/Movies";
import MoviePageContainer from "./MovieInfoContainer";

export default function IndividualMovie({ params }: { params: { slug: string } }) {
  return (
    <main className="w-full px-4 py-8 relative">
      <BookingManager />

      <div className="absolute right-80 top-140">
        <DateDropdown />
        <MoviePageContainer slug={params.slug} />
      </div>
    </main>
  );
}