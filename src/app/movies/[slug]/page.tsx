import { notFound } from "next/navigation";
import { headers } from "next/headers";
import MovieLayout from "@/components/movies/movie-details/MovieLayout";
import type { movieType } from "@/types/Movietypes";
import type { ScreeningType } from "@/models/Screening";

type ApiResponse = {
  movie: movieType;
  screenings: ScreeningType[];
};

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "localhost:3000";
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const url = new URL(`/api/movies/${slug}`, baseUrl).toString();
  const res = await fetch(url, { cache: "no-store" });

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Failed to fetch movie");

  const data = (await res.json()) as ApiResponse;
  return <MovieLayout movie={data.movie} screenings={data.screenings} />;
}
