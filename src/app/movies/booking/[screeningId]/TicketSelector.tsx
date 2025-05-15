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
  onFinalPriceChange: (finalPrice: number) => void;
}

export default function TicketSelector({
  onTotalTicketsChange,
  onFinalPriceChange,
}: TicketSelectorProps) {
  const isLoggedIn = false; //TEMPORARY SET TO FALSE UNTIL WE IMPLEMENTED LOGIN.
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

    let discountAmount = 0;
    if (isLoggedIn) {
      discountAmount = Math.round(newTotal * 0.1)
    }

    const newFinalPrice = newTotal - discountAmount;


    setTotalPrice(newTotal);
    setFinalPrice(newFinalPrice);

    onTotalTicketsChange(ticketCount);
    onFinalPriceChange(newFinalPrice);
  }, [ticketCounts, ticketPrices, onTotalTicketsChange, onFinalPriceChange]);

  return (
    <div className=" bg-white-900 rounded-xl max-w-sm mx auto ml-12">
      <h2 className="mb-6 text-2xl font-bold">Select tickets</h2>
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
      <div className="mt-6 p-4 rounded-lg border border-kino-grey">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span className="font-medium">{totalPrice} kr</span>
          </div>

          {isLoggedIn && (
            <div className="flex justify-between">
              <span className="font-medium">Discount (10%)</span>
              <span className="font-medium">{totalPrice - finalPrice} kr</span>
              </div>
          )}
          <div className="flex justify-between">
              <span className="font-medium">Discount (10%)</span>
              <span className="font-medium">Not a member</span>
          </div>

          <hr className="my-2 border-t-[0.5px]" />
          <div className="flex justify-between">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-lg">{finalPrice} kr</span>
          </div>
          <div className="mt-2 text-sm text-kino-grey">
            <span className="text-kino-darkred">Login </span><span>to recieve discount</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
