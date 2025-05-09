"use client";
import { useState, useEffect, useMemo } from "react";
import TicketButton from "./TicketButton";

interface TicketPrices {
  regular: number;
  kids: number;
  student: number;
  senior: number;
}

interface TicketCounts {
  regular: number;
  kids: number;
  student: number;
  senior: number;
}

interface TicketSelectorProps {
  onTotalTicketsChange: (totalTickets: number) => void;
}

export default function TicketSelector({
  onTotalTicketsChange,
}: TicketSelectorProps) {
  const [ticketCounts, setTicketCounts] = useState<TicketCounts>({
    regular: 0,
    kids: 0,
    student: 0,
    senior: 0,
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const ticketPrices = useMemo<TicketPrices>(
    () => ({
      regular: 150,
      kids: 70,
      student: 90,
      senior: 100,
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
    let ticketCount = 0;

    Object.entries(ticketCounts).forEach(([type, count]) => {
      newTotal += count * ticketPrices[type as keyof TicketPrices];
      ticketCount += count;
    });

    const discountAmount = Math.round(newTotal * 0.1);
    setTotalPrice(newTotal);
    setFinalPrice(newTotal - discountAmount);

    onTotalTicketsChange(ticketCount);
  }, [ticketCounts, ticketPrices, onTotalTicketsChange]);

  return (
    <div className="p-6 bg-white-900 rounded-xl mb-10 max-w-sm mx auto">
      <h2 className="mb-6 text-xl font-bold">Select tickets</h2>
      <TicketButton
        price={ticketPrices.regular}
        ticketType="regular"
        onCountChange={handleTicketCountChange}
      >
        Regular
      </TicketButton>
      <TicketButton
        price={ticketPrices.kids}
        ticketType="kids"
        onCountChange={handleTicketCountChange}
      >
        Kids (0-11)
      </TicketButton>
      <TicketButton
        price={ticketPrices.student}
        ticketType="student"
        onCountChange={handleTicketCountChange}
      >
        Student
      </TicketButton>
      <TicketButton
        price={ticketPrices.senior}
        ticketType="senior"
        onCountChange={handleTicketCountChange}
      >
        Senior
      </TicketButton>
      <div className="mt-6 p-4 rounded-lg border border-kino-white">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span className="font-medium">{totalPrice} kr</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Discount (10%):</span>
            <span className="font-medium">{totalPrice - finalPrice} kr</span>
          </div>
          <hr className="my-2 border-t-[0.5px]" />
          <div className="flex justify-between">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-lg">{finalPrice} kr</span>
          </div>
        </div>
      </div>
    </div>
  );
}
