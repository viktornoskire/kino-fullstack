'use client';

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
    swish: 'Swish',
    card: 'Credit/Debit Card',
    atCinema: 'Pay at Cinema',
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
        <span className='font-medium'>{userInfo.email}</span>.
      </p>

      <div className="bg-kino-black/50 rounded-lg shadow-md p-5 text-left divide-y divide-gray-700 print:hidden">
        <div className="grid gap-y-1 gap-x-4 text-xs sm:grid-cols-2">
          <span className="text-kino-grey">Booking ID:</span>
          <span>{bookingId}</span>

          <span className='text-kino-grey'>Movie:</span>
          <span>{movieTitle}</span>

          <span className='text-kino-grey'>Date & Time:</span>
          <span>{formatScreeningTime(screeningTime)}</span>

          <span className='text-kino-grey'>Seats</span>
          <div className='flex flex-col'>
            {seats.map(seat => (
              <span key={seat}>{seat}</span>
            ))}
          </div>
        </div>

        <div className='grid gap-y-1 gap-x-4 text-xs pt-3 sm:grid-cols-2'>
          <span className='text-kino-grey'>Name</span>
          <span>{userInfo.name}</span>

          <span className='text-kino-grey'>Phone</span>
          <span>{userInfo.phoneNumber}</span>
        </div>

        <div className='grid gap-y-1 gap-x-4 text-xs pt-3 sm:grid-cols-2'>
          <span className='text-kino-grey'>Payment</span>
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
        className="hidden print:block p-6 text-black bg-white text-left divide-y"
      >
        <h1 className="text-2xl font-bold mb-4">Your ticket</h1>

        <div className="grid gap-y-1 gap-x-4 text-sm grid-cols-2">
          <span className="font-semibold">Booking ID:</span>
          <span>{bookingId}</span>

          <span className="font-semibold">Movie:</span>
          <span>{movieTitle}</span>

          <span className="font-semibold">Date & Time:</span>
          <span>{formatScreeningTime(screeningTime)}</span>

          <span className="font-semibold">Seats:</span>
          <div className="flex flex-col">
            {seats.map((seat) => (
              <span key={seat}>{seat}</span>
            ))}
          </div>

          <span className="font-semibold">Name:</span>
          <span>
            {userInfo.name}
          </span>

          <span className="font-semibold">Phone:</span>
          <span>{userInfo.phoneNumber}</span>

          <span className="font-semibold">Payment:</span>
          <span>{paymentLabel[paymentMethod]}</span>

          <span className="font-semibold">Total:</span>
          <span>{totalPrice} SEK</span>
        </div>
      </div>
    </div>
  );
}
