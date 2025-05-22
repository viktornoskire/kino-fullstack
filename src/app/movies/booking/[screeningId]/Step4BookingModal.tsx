"use client";

import { Printer } from "lucide-react";
import Image from "next/image";
import {
  PaymentMethod,
  Step4BookingModalProps,
} from "./types/BookingModalTypes";

export default function Step4BookingModal({
  bookingId,
  movieTitle,
  screeningTime,
  seats,
  userInfo,
  paymentMethod,
  totalPrice,
  formatScreeningTime,
}: Step4BookingModalProps) {
  const paymentLabel: Record<PaymentMethod, string> = {
    swish: "Swish",
    card: "Credit/Debit Card",
    atCinema: "Pay at Cinema",
  };

  return (
    <div className="text-center">
      <Image
        src="/confirmed-order.png"
        alt="Order confirmed"
        width={80}
        height={80}
        className="mx-auto mb-4 print:hidden"
      />
    
      <h3 className="print:hidden text-base font-semibold mb-1">
        Booking confirmed!
      </h3>
      <p className="text-xs mb-4 print:hidden">
        We emailed a receipt to&nbsp;
        <span className="font-medium">{userInfo.email}</span>.
      </p>

      <div className="bg-kino-black/50 rounded-lg shadow-md p-5 text-left divide-y divide-gray-700 print:hidden">
        <div className="grid gap-y-1 gap-x-4 text-xs sm:grid-cols-2">
          <span className="text-kino-grey">Booking ID:</span>
          <span>{bookingId}</span>

          <span className="text-kino-grey">Movie:</span>
          <span>{movieTitle}</span>

          <span className="text-kino-grey">Date & Time:</span>
          <span>{formatScreeningTime(screeningTime)}</span>

          <span className="text-kino-grey">Seats</span>
          <div className="flex flex-col">
            {seats.map((seat) => (
              <span key={seat}>{seat}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-y-1 gap-x-4 text-xs pt-3 sm:grid-cols-2">
          <span className="text-kino-grey">Name</span>
          <span>
            {userInfo.firstName} {userInfo.lastName}
          </span>

          <span className="text-kino-grey">Phone</span>
          <span>{userInfo.phoneNumber}</span>
        </div>

        <div className="grid gap-y-1 gap-x-4 text-xs pt-3 sm:grid-cols-2">
          <span className="text-kino-grey">Payment</span>
          <span>{paymentLabel[paymentMethod]}</span>

          <span className="text-kino-grey font-semibold">Total</span>
          <div className="flex items-center justify-between w-full print:hidden">
            <span className="font-semibold">{totalPrice} SEK</span>
            <button
              onClick={() => window.print()}
              className="ml-2 cursor-pointer hover:text-gray-300"
              aria-label="Skriv ut biljett"
            >
              <Printer size={18} />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-tight text-kino-grey print:hidden">
        Please arrive at least 15 minutes early. Enjoy the show!
      </p>
      <div
        id="printable-area"
        className="hidden print:block p-6 text-black bg-white"
      >
        <h1 className="text-2xl font-bold mb-4">Your ticket</h1>
        <p>
          <strong>Booking ID:</strong> {bookingId}
        </p>
        <p>
          <strong>Movie:</strong> {movieTitle}
        </p>
        <p>
          <strong>Date & Time:</strong> {formatScreeningTime(screeningTime)}
        </p>
        <p>
          <strong>Seats:</strong> {seats.join(", ")}
        </p>
        <p>
          <strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}
        </p>
        <p>
          <strong>Phone:</strong> {userInfo.phoneNumber}
        </p>
        <p>
          <strong>Payment:</strong> {paymentLabel[paymentMethod]}
        </p>
        <p>
          <strong>Total:</strong> {totalPrice} SEK
        </p>
      </div>
    </div>
  );
}
