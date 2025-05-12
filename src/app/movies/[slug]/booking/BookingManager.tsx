"use client";

import { useState } from "react";
import CinemaSeating from "./Seatings";
import TicketSelector from "./TicketSelector";

type BookingManagerProps = Record<never, never>;

export default function BookingManager({}: BookingManagerProps) {
  const [totalTickets, setTotalTickets] = useState<number>(0);

  const handleTotalTicketsChange = (ticketCount: number) => {
    setTotalTickets(ticketCount);
  };

  return (
    <>
      <div className="max-w-md">
        <TicketSelector onTotalTicketsChange={handleTotalTicketsChange} />
      </div>

      <div className="mt-8">
        <CinemaSeating totalTickets={totalTickets} />
      </div>
    </>
  );
}
