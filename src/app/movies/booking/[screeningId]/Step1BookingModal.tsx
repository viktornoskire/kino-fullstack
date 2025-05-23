"use client";
import { Step1BookingModalProps } from "./types/BookingModalTypes";

export default function Step1BookingModal({
  movieTitle,
  screeningTime,
  seats,
  totalPrice,
  ticketSummary,
  formatScreeningTime,
}: Step1BookingModalProps) {
  const ticketItems = ticketSummary
    ? ticketSummary
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="text-left">
      <div className="bg-kino-black/50 rounded-lg shadow-md p-5 divide-y divide-gray-700 text-xs sm:text-sm">
        <div className="grid gap-y-1 gap-x-4 sm:grid-cols-2">
          <span className="text-kino-grey">Movie</span>
          <span className="font-medium">{movieTitle}</span>

          <span className="text-kino-grey">Date &amp; Time</span>
          <span>{formatScreeningTime(screeningTime)}</span>

          <span className="text-kino-grey">Tickets</span>
          <div className="flex flex-col">
            {ticketItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        <div className="pt-3 grid gap-y-1 gap-x-4 sm:grid-cols-2">
          <span className="text-kino-grey">Seats</span>
          <div className="flex flex-col">
            {seats.map((seat) => (
              <span key={seat}>{seat}</span>
            ))}
          </div>
        </div>

        <div className="pt-3 grid gap-y-1 gap-x-4 sm:grid-cols-2">
          <span className="text-kino-grey font-semibold">Total</span>
          <span className="font-semibold">{totalPrice} SEK</span>
        </div>
      </div>
    </div>
  );
}
