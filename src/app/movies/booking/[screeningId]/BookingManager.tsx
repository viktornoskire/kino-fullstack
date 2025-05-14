"use client";

import { useEffect, useState } from "react";
import BookingDetails from "./BookingDetails";
import BookingScreeningSelector from "./BookingScreeningSelector";
import TicketSelector from "./TicketSelector";
import CinemaSeating from "./Seatings";
import Spinner from "@/components/Spinner";

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

export default function BookingPageWrapper({
  screeningId,
}: BookingPageWrapperProps) {
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(
    null
  );
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [totalTickets, setTotalTickets] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
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
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="w-full px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/1 space-y-8">
            <BookingDetails movie={movie} screening={selectedScreening} />

            <BookingScreeningSelector
              screenings={screenings}
              selectedScreening={selectedScreening}
              onScreeningSelect={setSelectedScreening}
            />
          </div>

          <div className="w-full md:w-1/2 flex justify-end">
            <div className="w-full max-w-md ml-auto">
              <TicketSelector onTotalTicketsChange={setTotalTickets} />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <CinemaSeating totalTickets={totalTickets} />
        </div>
      </div>
    </main>
  );
}
