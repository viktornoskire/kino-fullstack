"use client";

import { useState } from "react";
import type { TicketButtonProps } from "@/types/TicketButton.types";

export default function TicketButton({
  children,
  price,
  ticketType,
  onCountChange,
}: TicketButtonProps) {
  const [count, setCount] = useState<number>(0);

  function handleIncrement() {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(ticketType, newCount, newCount * price);
  }

  function handleDecrement() {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(ticketType, newCount, newCount * price);
    }
  }

  return (
    <div className="flex items-center justify-between w-full max-w-sm p-4 mb-3 bg-gray-800 rounded-lg text-white">
      <div className="text-lg font-medium">{children}</div>
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-md"
          aria-label="Decrease quantity"
        >
          <span className="text-xl font-bold">-</span>
        </button>
        <div className="w-10 mx-2 text-center">{count}</div>
        <button
          onClick={handleIncrement}
          className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-md"
          aria-label="Increase quantity"
        >
          <span className="text-xl font-bold">+</span>
        </button>
      </div>
    </div>
  );
}
