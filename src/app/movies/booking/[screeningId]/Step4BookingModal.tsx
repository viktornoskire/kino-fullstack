"use client";
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
      <div className="text-kino-darkgreen text-5xl mb-4"></div>
      <h3 className="text-xl font-bold mb-2">Booking Confirmed</h3>
      <p className="mb-4">
        Your booking for {movieTitle} is confirmed. We have sent a confirmation
        to {userInfo.email}.
      </p>

      <div className="bg-kino-gray-800 p-4 rounded text-left mb-4">
        <p className="text-xs text-gray-400">Booking ID: {bookingId}</p>
        <p className="text-xs text-gray-400">{movieTitle}</p>
        <p className="text-xs text-gray-400">
          {formatScreeningTime(screeningTime)}
        </p>
        <p className="text-xs text-gray-400">Seats: {seats.join(", ")}</p>

        <div className="border-t border-gray-700 my-3"></div>

        <p className="text-xs text-gray-400">
          Name: {userInfo.firstName} {userInfo.lastName}
        </p>
        <p className="text-xs text-gray-400">Email: {userInfo.email}</p>
        <p className="text-xs text-gray-400">Phone: {userInfo.phoneNumber}</p>

        <div className="border-t border-gray-700 my-3"></div>

        <p className="text-xs text-gray-400">
          Payment Method: {getPaymentMethodText(paymentMethod)}
        </p>
        <p className="text-xs text-gray-400">Total: {totalPrice} SEK</p>
      </div>
      <p className="text-xs text-gray-400">
        Please arrive at least 15 minutes before the screening time. Enjoy your
        movie!
      </p>
    </div>
  );
}
