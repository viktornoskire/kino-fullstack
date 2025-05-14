"use client";

import { useEffect, useState } from "react";
import BookingDetails from "./BookingDetails";
import BookingScreeningSelector from "./BookingScreeningSelector";
import BookingManager from "./BookingManager";

interface Screening {
  _id: string;
  movieId: string;
  screeningTime: string;
  auditorium: string;
  status: string;
}

interface Movie {
  title: string;
  posterUrl: string;
  genre: string[];
  durationMinutes: number;
  ageLimit: number;
}

interface BookingPageWrapperProps {
  screeningId: string;
}

export default function BookingPageWrapper({ screeningId }: BookingPageWrapperProps) {
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/movies/booking/${screeningId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Kunde inte ladda bokningsdata");
        return;
      }

      const data = await res.json();
      setSelectedScreening(data.screening);
      setScreenings(data.screenings);
      setMovie(data.movie);
    };

    fetchData();
  }, [screeningId]);

  if (!selectedScreening || !movie) {
    return <p className="text-center text-white mt-10">Laddar bokningsdata...</p>;
  }

  return (
    <main className="w-full px-4 py-8 space-y-12">
      <BookingDetails movie={movie} screening={selectedScreening} />

      <BookingScreeningSelector
        screenings={screenings}
        selectedScreening={selectedScreening}
        onScreeningSelect={setSelectedScreening}
      />

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 max-w-lg">
          <BookingManager />
        </div>
      </div>
    </main>
  );
}
