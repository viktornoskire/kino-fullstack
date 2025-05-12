import BookingManager from "./BookingManager";
import MoviePageContainer from "./MovieInfoContainer";

export default async function IndividualMovie({ params }: { params: { slug: string } }) {

  const { slug } = await Promise.resolve(params);
  return (
    <main className="w-full px-4 py-8 relative">
      <BookingManager />

      <div className="absolute right-10 top-0">
        <MoviePageContainer slug={slug} />
      </div>
    </main>
  );
}