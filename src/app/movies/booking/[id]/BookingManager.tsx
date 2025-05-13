"use client";

import { useState } from "react";
import CinemaSeating from "./Seatings";
import TicketSelector from "./TicketSelector";

export default function BookingManager() {
  const [totalTickets, setTotalTickets] = useState<number>(0);

  return (
    <>
      <div className="max-w-md">
        <TicketSelector onTotalTicketsChange={setTotalTickets} />
      </div>
      <div className="mt-8">
        <CinemaSeating totalTickets={totalTickets} />
      </div>
    </>
  );
}
