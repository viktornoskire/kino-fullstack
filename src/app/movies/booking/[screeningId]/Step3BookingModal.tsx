"use client";

import {
  Step3BookingModalProps,
  PaymentOptionProps,
} from "./types/BookingModalTypes";

export default function Step3BookingModal({
  totalPrice,
  selectedMethod,
  onSelectMethod,
  error,
}: Step3BookingModalProps) {
  return (
    <>
      <h3 className="font-semibold mb-2">Select payment method</h3>

      {error && (
        <div className="p-2 mb-4 bg-red-900 text-white rounded text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <PaymentOption
          id="card"
          title="Credit/Debit Card"
          description="Pay securely with your card"
          isSelected={selectedMethod === "card"}
          onSelect={() => onSelectMethod("card")}
        />

        <PaymentOption
          id="swish"
          title="Swish"
          description="Pay with swish mobile payment"
          isSelected={selectedMethod === "swish"}
          onSelect={() => onSelectMethod("swish")}
        />

        <PaymentOption
          id="atCinema"
          title="Pay at cinema"
          description="Pay when you arrive at the cinema"
          isSelected={selectedMethod === "atCinema"}
          onSelect={() => onSelectMethod("atCinema")}
        />
      </div>

      <div className="border-t pt-3 mt-4">
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>{totalPrice}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          *This is a simulated payment for demonstration purposes*
        </p>
      </div>
    </>
  );
}

function PaymentOption({
  id,
  title,
  description,
  isSelected,
  onSelect,
}: PaymentOptionProps) {
  const handleChange = () => {
    onSelect();
  };
  return (
    <div
      className={`border rounded-lg p-3 cursor-pointer transition ${
        isSelected
          ? "border-kino-darkred bg-kino-black"
          : "border-kino-grey hover:bg-kino-black"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center">
        <div className="mr-3">
          <input
            type="radio"
            id={id}
            name="paymentMethod"
            checked={isSelected}
            onChange={handleChange}
            className="sr-only"
          />
        </div>

        <div className="flex-1">
          <label htmlFor={id} className="font-medium block cursor-pointer">
            {title}
          </label>
          <p className="text-sm text-kino-grey">{description}</p>
        </div>
      </div>
    </div>
  );
}
