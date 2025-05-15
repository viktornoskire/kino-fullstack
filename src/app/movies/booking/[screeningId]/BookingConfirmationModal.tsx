"use client";

import { useState } from "react";
import Button from "@/components/Button";

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationId: string | null;
  movieTitle: string;
  screeningTime: string;
  seats: string[];
  totalPrice: number;
  onContinue: () => void;
}

export default function BookingConfirmationModal({
  isOpen,
  onClose,
  reservationId,
  movieTitle,
  screeningTime,
  seats,
  totalPrice,
  onContinue,
}: BookingConfirmationModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const formatScreeningTime = (timeString: string) => {
    const date = new Date(timeString);
    return new Intl.DateTimeFormat("sv-SE", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  ////////////
  // FUNCTION TO GO TO THE NEXT STEP IN MODAL (FUTURE WORK)
  ///////////
  const goToNextStep = () => {
    onContinue();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-kino-darkgrey rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Header med stegindikator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Din bokning</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          {/* Stegindikator */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 border border-black rounded-full bg-kino-darkgreen flex items-center justify-center text-xs">
                1
              </div>
              <div className="h-1 w-4 bg-kino-white text-kino-blac"></div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full border border-black bg-kino-white flex items-center justify-center text-xs text-black">
                2
              </div>
              <div className="h-1 w-4 bg-kino-white"></div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full border border-black bg-kino-white flex items-center justify-center text-xs text-black">
                3
              </div>
              <div className="h-1 w-4 bg-kino-white"></div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 border border-black rounded-full bg-kino-white  flex items-center justify-center text-xs text-black">
                4
              </div>
            </div>
 
          </div>
        </div>

        {/* Steg 1: Bokningssammanfattning */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4 p-3 rounded-lg">
            <div>
              <p className="font-semibold">{movieTitle}</p>
              <p className="text-sm text-gray-600">
                {formatScreeningTime(screeningTime)}
              </p>
              <p className="text-sm text-gray-600">
                {seats.length} biljetter • {totalPrice} kr
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Valda platser</h3>
            <div className="flex flex-wrap gap-1">
              {seats.map((seat) => (
                <span
                  key={seat}
                  className="px-2 py-1 rounded text-sm"
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-3 mt-4">
            <div className="flex justify-between font-semibold">
              <span>Totalt:</span>
              <span>{totalPrice} kr</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Button variant="primary" type="button" onClick={goToNextStep}>
            Fortsätt
          </Button>

          <Button variant="secondary" type="button" onClick={onClose}>
            Tillbaka
          </Button>
        </div>
      </div>
    </div>
  );
}
