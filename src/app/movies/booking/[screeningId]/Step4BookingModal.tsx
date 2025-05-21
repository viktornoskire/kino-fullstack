"use client";
import {
  PaymentMethod,
  Step4BookingModalProps,
} from "./types/BookingModalTypes";
import Image from "next/image";

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
  const getPaymentMethodText = (method: PaymentMethod) => {
    switch (method) {
      case "swish":
        return "Swish";
      case "card":
        return "Credit/Debit Card";
      case "atCinema":
        return "Pay at Cinema";
      default:
        return "unknown";
    }
  };

  return (
    <div className="text-center">
      <Image
        src="/confirmed-order.png"
        alt="Order Confirmed picture"
        width={90}
        height={90}
        className="mx-auto mb-6"
      />
      <p className="mb-4">
        Your booking for {movieTitle} is confirmed. We have sent a confirmation
        to {userInfo.email}.
      </p>

      <div className="bg-kino-gray-800 p-4 rounded text-left mb-4">
        <p className="text-xs text-kino-grey">Booking ID: {bookingId}</p>
        <p className="text-xs text-kino-grey">Movie: {movieTitle}</p>
        <p className="text-xs text-kino-grey">
          {formatScreeningTime(screeningTime)}
        </p>
        <p className="text-xs text-kino-grey">Seats: {seats.join(", ")}</p>

        <div className="border-t border-gray-700 my-3"></div>

        <p className="text-xs text-kino-grey">
          Name: {userInfo.firstName} {userInfo.lastName}
        </p>
        <p className="text-xs text-kino-grey">Email: {userInfo.email}</p>
        <p className="text-xs text-kino-grey">Phone: {userInfo.phoneNumber}</p>

        <div className="border-t border-gray-700 my-3"></div>

        <p className="text-xs text-kino-grey">
          Payment Method: {getPaymentMethodText(paymentMethod)}
        </p>
        <p className="text-xs text-kino-grey">Total: {totalPrice} SEK</p>
      </div>
      <p className="text-xs text-kino-grey">
        Please arrive at least 15 minutes before the screening time. Enjoy your
        movie!
      </p>
    </div>
  );
}
