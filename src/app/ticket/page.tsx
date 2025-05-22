"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TicketPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("bookingId");
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      const res = await fetch(`/api/bookings/${id}`);
      const data = await res.json();
      setBooking(data);
    };

    fetchBooking();
  }, [id]);

  if (!booking) return <p>Laddar biljett...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto bg-kino-darkgrey print:bg-white print:text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Din biljett</h1>
      <p>
        <strong>Film:</strong> {booking.movie?.title ?? "Titel saknas"}
      </p>

      <p>
        <strong>Datum:</strong>
        {booking.screening?.screeningTime
          ? new Date(booking.screening.screeningTime).toLocaleString()
          : "Okänt datum"}
      </p>

      <p>
        <strong>Platser:</strong>
        {booking.seats?.length
          ? booking.seats
              .map((s: any) => `Rad ${s.row}, Plats ${s.seatNumber}`)
              .join(", ")
          : "Inga platser"}
      </p>

      <p>
        <strong>Bokningsnummer:</strong> {booking._id}
      </p>

      <div className="mt-6 text-center">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
        >
          Skriv ut biljett
        </button>
      </div>
    </div>
  );
};

export default TicketPage;
