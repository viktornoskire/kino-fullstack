"use client";

import { useState } from "react";
import type { TicketButtonProps } from "@/types/TicketButton.types";

export default function TicketButton({
  children,
  initialValue = 1,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
}: TicketButtonProps) {
  const [value, setValue] = useState<number>(initialValue);

  const decrement = () => {
    setValue((prev) => {
      const next = Math.max(prev - step, min);
      if (next !== prev && onChange) onChange(next);
      return next;
    });
  };
  const increment = () => {
    setValue((prev) => {
      const next = Math.min(prev + step, max);
      if (next !== prev && onChange) onChange(next);
      return next;
    });
  };
}
