import BookingManager from "./BookingManager";
import MoviePageContainer from "./MovieInfoContainer";
import ScreeningList from "./ScreeningList";
export default async function BookingPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await Promise.resolve(params);

  return (
    <main className="w-full px-4 py-8 relative">
      
      <BookingManager slug={slug} />

      <div className="absolute right-40 top-0">
        <MoviePageContainer slug={slug} />
      </div>

    </main>
  );
}
