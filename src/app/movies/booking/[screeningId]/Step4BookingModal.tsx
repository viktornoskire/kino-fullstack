"use client";

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
        className="mx-auto mb-4"
      />

      <h3 className="text-base font-semibold mb-1">Booking confirmed!</h3>
      <p className="text-xs mb-4">
        We emailed a receipt to&nbsp;
        <span className="font-medium">{userInfo.email}</span>.
      </p>

      <div className="bg-kino-black/50 rounded-lg shadow-md p-5 text-left divide-y divide-gray-700">
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
          <span className="font-semibold">{totalPrice} SEK</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-tight text-kino-grey">
        Please arrive at least 15 minutes early. Enjoy the show!
      </p>
    </div>
  );
}
