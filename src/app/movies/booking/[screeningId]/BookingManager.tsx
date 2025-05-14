"use client";

import { useEffect, useState } from "react";
import BookingDetails from "./BookingDetails";
import ScreeningSelector from "@/components/movies/movie-details/ScreeningSelector";
import TicketSelector from "./TicketSelector";
import CinemaSeating from "./Seatings";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  slug: string;
}

interface BookingManagerProps {
  screeningId: string;
}

export default function BookingManager({ screeningId }: BookingManagerProps) {
  const router = useRouter();
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(
    null
  );
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [totalTickets, setTotalTickets] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [isBooking, setIsBooking] = useState<boolean>(false);

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

  const handleSelectedSeatsChange = (seats: string[]) => {
    setSelectedSeats(seats);
  };
  const handleFinalPriceChange = (price: number) => {
    setFinalPrice(price);
  };

  const handleBooking = async () => {
    if (selectedSeats.length !== totalTickets || totalTickets === 0) {
      alert("Choose as many seats as tickets please.");
      return;
    }
    setIsBooking(true);

    try {
      const response = await fetch("/api/movies/booking/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          screeningId: selectedScreening?._id,
          seats: selectedSeats,
          usersId: "temp-user-id", //THIS SHOULD BE SWITCHED LATER TO THE LOGGED IN USER !!
          totalPrice: finalPrice,
        }),
      });
      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const data = await response.json();
      router.push(`/booking/confirmation/${data.reservationId}`);
    } catch (error) {
      console.log("Booking error", error);
      alert("Error while booking");
    } finally {
      setIsBooking(false);
    }
  };

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
          <div className="w-full md:w-1/2 space-y-2">
            <BookingDetails movie={movie} screening={selectedScreening} />

            <ScreeningSelector
              screenings={screenings}
              selectedScreening={selectedScreening}
              onScreeningSelect={setSelectedScreening}
              maxDays={5} // Show only 5 days (like original BookingScreeningSelector)
              showActions={false} // Hide action buttons (we have our own)
              customClass="mt-4" // Add a custom class if needed
            />
          </div>

          <div className="w-full md:w-1/2 flex justify-end">
            <div className="w-full max-w-md ml-auto">
              <TicketSelector
                onTotalTicketsChange={setTotalTickets}
                onFinalPriceChange={handleFinalPriceChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <CinemaSeating
            totalTickets={totalTickets}
            screeningId={selectedScreening._id}
            onSelectedSeatsChange={handleSelectedSeatsChange}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <Button
          variant="primary"
          type="button"
          onClick={handleBooking}
          disabled={
            totalTickets === 0 ||
            selectedSeats.length !== totalTickets ||
            isBooking
          }
        >
          {isBooking ? "Booking..." : "Book"}{" "}
          {/* MAYBE KEEP THIS FOR LOADING??*/}
        </Button>

        <Link href={`/movies/${movie.slug}`}>
          <Button variant="secondary" type="button">
            Back
          </Button>
        </Link>
      </div>
    </main>
  );
}
