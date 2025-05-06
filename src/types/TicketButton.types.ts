import type { ReactNode } from "react";

export interface TicketButtonProps {
  children?: ReactNode;
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}
