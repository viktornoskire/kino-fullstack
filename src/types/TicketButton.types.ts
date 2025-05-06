import type { ReactNode } from "react";

export interface TicketButtonProps {
  children: ReactNode;
  price: number;
  ticketType: string;
  onCountChange: (
    ticketType: string,
    count: number,
    totalPrice: number
  ) => void;
}
