"use client";

interface Step1BookingModalProps {
  movieTitle: string;
  screeningTime: string;
  seats: string[];
  totalPrice: number;
  formatScreeningTime: (time: string) => string;
}

export default function Step1BookingModal({
  movieTitle,
  screeningTime,
  seats,
  totalPrice,
  formatScreeningTime,
}: Step1BookingModalProps) {
  return (
    <>
      <div className="flex items-center gap-4 p-3 rounded-lg">
        <div>
          <p className="font-semibold">{movieTitle}</p>
          <p className="text-sm text-gray-600">
            {formatScreeningTime(screeningTime)}
          </p>
          <p className="text-sm text-gray-600">
            {seats.length} tickets • {totalPrice} kr
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Chosen seats</h3>
        <div className="flex flex-wrap gap-1">
          {seats.map((seat) => (
            <span
              key={seat}
              className="px-2 py-1 bg-kino-gray-700 ronded text-sm"
            >
              {seat}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t pt-3 mt-3">
        <div className="flex items-center justify-between">
          <span>Total:</span>
          <span>{totalPrice}</span>
        </div>
      </div>
    </>
  );
}
