"use client";
import Image from "next/image";
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
          icon={
            <Image
              src="/mastercard.svg"
              alt="Swish logo"
              width={28}
              height={28}
              className="w-8 h-8"
            />
          }
        />

        <PaymentOption
          id="swish"
          title="Swish"
          description="Pay with swish mobile payment"
          isSelected={selectedMethod === "swish"}
          onSelect={() => onSelectMethod("swish")}
          icon={
            <Image
              src="/swish-logo.png"
              alt="Swish logo"
              width={28}
              height={28}
              className="w-8 h-8"
            />
          }
        />

        <PaymentOption
          id="atCinema"
          title="Pay at cinema"
          description="Pay when you arrive at the cinema"
          isSelected={selectedMethod === "atCinema"}
          onSelect={() => onSelectMethod("atCinema")}
          icon={
            <Image
              src="/kinoLogo.png"
              alt="Swish logo"
              width={28}
              height={28}
              className="w-8 h-8"
            />
          }
        />
      </div>

      <div className="border-t pt-3 mt-4">
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>{totalPrice}kr</span>
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
  icon,
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
      <div className="flex items-center gap-3">
        <input
          type="radio"
          id={id}
          name="paymentMethod"
          checked={isSelected}
          onChange={handleChange}
          className="sr-only"
        />

        {icon && <div className="shrink-0">{icon}</div>}

        <div className="flex-1">
          <label htmlFor={id} className="font-medium cursor-pointer">
            {title}
          </label>
          <p className="text-sm text-kino-grey">{description}</p>
        </div>
      </div>
    </div>
  );
}
