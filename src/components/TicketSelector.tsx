"use client";

import { useState, useEffect, useMemo } from "react";
import TicketButton from "@/components/TicketButton";

interface TicketPrices {
  ordinarie: number;
  barn: number;
  student: number;
  pensionar: number;
}

interface TicketCounts {
  ordinarie: number;
  barn: number;
  student: number;
  pensionar: number;
}

export default function TicketSelector() {
  const [ticketCounts, setTicketCounts] = useState<TicketCounts>({
    ordinarie: 0,
    barn: 0,
    student: 0,
    pensionar: 0,
  });

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const ticketPrices = useMemo<TicketPrices>(
    () => ({
      ordinarie: 150,
      barn: 70,
      student: 90,
      pensionar: 100,
    }),
    []
  );

  const handleTicketCountChange = (ticketType: string, count: number): void => {
    setTicketCounts((prev) => ({
      ...prev,
      [ticketType]: count,
    }));
  };

  useEffect(() => {
    let newTotal = 0;

    Object.entries(ticketCounts).forEach(([type, count]) => {
      newTotal += count * ticketPrices[type as keyof TicketPrices];
    });

    setTotalPrice(newTotal);
  }, [ticketCounts, ticketPrices]);

  return (
    <div className="p-6 bg-gray-900 rounded-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">Välj biljetter</h2>

      <TicketButton
        price={ticketPrices.ordinarie}
        ticketType="ordinarie"
        onCountChange={handleTicketCountChange}
      >
        Ordinarie
      </TicketButton>

      <TicketButton
        price={ticketPrices.barn}
        ticketType="barn"
        onCountChange={handleTicketCountChange}
      >
        Barn (0-11)
      </TicketButton>

      <TicketButton
        price={ticketPrices.student}
        ticketType="student"
        onCountChange={handleTicketCountChange}
      >
        Student
      </TicketButton>

      <TicketButton
        price={ticketPrices.pensionar}
        ticketType="pensionar"
        onCountChange={handleTicketCountChange}
      >
        Pensionär
      </TicketButton>

      {totalPrice > 0 && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-white">
          <div className="flex justify-between">
            <span className="font-medium">Totalt:</span>
            <span className="font-bold">{totalPrice} kr</span>
          </div>
        </div>
      )}
    </div>
  );
}
