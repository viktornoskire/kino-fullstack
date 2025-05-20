"use client";

import { useState, useCallback } from "react";
import Button from "@/components/Button";
import Step1BookingModal from "./Step1BookingModal";
import Step2BookingModal from "./Step2BookingModal";
import Step3BookingModal from "./Step3BookingModal";
import Step4BookingModal from "./Step4BookingModal";
import {
  BookingConfirmationModalProps,
  UserInfo,
  PaymentMethod,
} from "./types/Booking.types";

export default function BookingConfirmationModal({
  isOpen,
  onClose,
  reservationId,
  movieTitle,
  screeningTime,
  seats,
  totalPrice,
}: BookingConfirmationModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const deleteReservation = useCallback(async () => {
    if (!reservationId || bookingId) {
      return;
    }

    try {
      await fetch(
        `/api/movies/booking/cancel-reservation?id=${reservationId}`,
        {
          method: "DELETE",
        }
      );
      console.log("Reservation deleted successfully");
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  }, [reservationId, bookingId]);

  const handleClose = () => {
    if (currentStep < 4) {
      deleteReservation();
    }
    onClose();
  };

  const formatScreeningTime = (timeString: string) => {
    const date = new Date(timeString);
    return new Intl.DateTimeFormat("sv-SE", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const handleGoToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleGoToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleUserInfoUpdate = (name: string, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handleConfirmBooking = async () => {
    if (!reservationId) {
      setBookingError("Missing reservation ID");
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);

    try {
      const response = await fetch(`/api/movies/booking/confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservationId,
          userInfo,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to confirm booking");
      }

      const { bookingId } = await response.json();
      setBookingId(bookingId);
      handleGoToNextStep();
    } catch (error) {
      console.error("Booking confirmation error:", error);
      setBookingError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Your booking";
      case 2:
        return "Your information";
      case 3:
        return "Payment options";
      case 4:
        return "Booking confirmed";
      default:
        return "Booking";
    }
  };

  const validateUserInfo = () => {
    const { email, phoneNumber, firstName, lastName } = userInfo;

    if (!firstName.trim()) return false;
    if (!lastName.trim()) return false;
    if (!email.trim() || !email.includes("@")) return false;
    if (!phoneNumber.trim()) return false;

    return true;
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-kino-darkgrey rounded-lg border border-kino-grey shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{getStepTitle()}</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 border border-black rounded-full ${
                  currentStep >= 1
                    ? "bg-kino-darkgreen"
                    : "bg-kino-white text-black"
                } flex items-center justify-center text-xs`}
              >
                1
              </div>
              <div className="h-1 w-4 bg-kino-white"></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border border-black ${
                  currentStep >= 2
                    ? "bg-kino-darkgreen"
                    : "bg-kino-white text-black"
                } flex items-center justify-center text-xs ${
                  currentStep < 2 ? "text-black" : ""
                }`}
              >
                2
              </div>
              <div className="h-1 w-4 bg-kino-white"></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border border-black ${
                  currentStep >= 3
                    ? "bg-kino-darkgreen"
                    : "bg-kino-white text-black"
                } flex items-center justify-center text-xs ${
                  currentStep < 3 ? "text-black" : ""
                }`}
              >
                3
              </div>
              <div className="h-1 w-4 bg-kino-white"></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 border border-black rounded-full ${
                  currentStep >= 4
                    ? "bg-kino-darkgreen"
                    : "bg-kino-white text-black"
                } flex items-center justify-center text-xs ${
                  currentStep < 4 ? "text-black" : ""
                }`}
              >
                4
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {currentStep === 1 && (
            <Step1BookingModal
              movieTitle={movieTitle}
              screeningTime={screeningTime}
              seats={seats}
              totalPrice={totalPrice}
              formatScreeningTime={formatScreeningTime}
            />
          )}

          {currentStep === 2 && (
            <Step2BookingModal
              userInfo={userInfo}
              onInputChange={handleUserInfoUpdate}
            />
          )}

          {currentStep === 3 && (
            <Step3BookingModal
              totalPrice={totalPrice}
              selectedMethod={paymentMethod}
              onSelectMethod={handlePaymentMethodSelect}
              error={bookingError}
            />
          )}

          {currentStep === 4 && (
            <Step4BookingModal
              bookingId={bookingId}
              movieTitle={movieTitle}
              screeningTime={screeningTime}
              seats={seats}
              totalPrice={totalPrice}
              userInfo={userInfo}
              paymentMethod={paymentMethod}
              formatScreeningTime={formatScreeningTime}
            />
          )}
        </div>

        <div className="flex flex-col gap-3">
          {currentStep === 1 && (
            <>
              <Button
                variant="primary"
                type="button"
                onClick={handleGoToNextStep}
              >
                Continue
              </Button>

              <Button variant="secondary" type="button" onClick={handleClose}>
                Back
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  if (validateUserInfo()) {
                    handleGoToNextStep();
                  } else {
                    alert("Please fill in all fields correctly");
                  }
                }}
              >
                Continue
              </Button>

              <Button
                variant="secondary"
                type="button"
                onClick={handleGoToPreviousStep}
              >
                Back
              </Button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <Button
                variant="primary"
                type="button"
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm and Pay"}
              </Button>

              <Button
                variant="secondary"
                type="button"
                onClick={handleGoToPreviousStep}
                disabled={isSubmitting}
              >
                Back
              </Button>
            </>
          )}

          {currentStep === 4 && (
            <Button variant="primary" type="button" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
