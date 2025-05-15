"use client";
import React, { useState, useEffect } from "react";
import {
  AvailableSeatIcon,
  SelectedSeatIcon,
  DisabledSeatIcon,
  TakenSeatIcon,
} from "./SeatingIcons";
import { Seat, SeatsByRow, CinemaSeatingProps } from "./types/Seatings.types";
import Spinner from "@/components/Spinner";
import HandicapSeatHandler from "./HandicapSeatHandler";

interface UpdatedCinemaSeatingProps extends CinemaSeatingProps {
  screeningId: string;
  onSelectedSeatsChange: (seats: string[]) => void;
}

const CinemaSeating: React.FC<UpdatedCinemaSeatingProps> = ({
  totalTickets,
  screeningId,
  onSelectedSeatsChange,
}) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(`/api/seats/${screeningId}`);

        if (!response.ok) {
          throw new Error("Not able to fetch seats");
        }

        const data = await response.json();
        setSeats(data);
        setSelectedSeats([]);
      } catch (error) {
        console.error("Error fetching seats:", error);
      } finally {
        setLoading(false);
      }
    };
    if (screeningId) {
      fetchSeats();
    }
  }, [screeningId]);

  useEffect(() => {
    if (selectedSeats.length > totalTickets) {
      setSelectedSeats(selectedSeats.slice(0, totalTickets));
    }
  }, [totalTickets, selectedSeats]);

  useEffect(() => {
    onSelectedSeatsChange(selectedSeats);
  }, [selectedSeats, onSelectedSeatsChange]);

  const seatsByRow: SeatsByRow = seats.reduce((acc: SeatsByRow, seat: Seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const toggleSeat = (seatId: string, isDisabled: boolean): void => {
    if (isDisabled) {
      return;
    }

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        if (prev.length < totalTickets) {
          return [...prev, seatId];
        }
        return prev;
      }
    });
  };

  const isDisabledSeat = (row: number, seatNumber: number): boolean => {
    return row === 6 && [1, 2, 14, 15].includes(seatNumber);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select Seats</h1>
      <div
        className="flex flex-col items-center p-8 rounded-lg max-w-2xl mx-auto"
        style={{ backgroundColor: "var(--color-kino-darkgrey)" }}
      >
        <div className="w-3/4 h-5 bg-gray-400 rounded mb-12 flex items-center justify-center">
          <span className="text-white text-sm">SCREEN</span>
        </div>

        <div className="flex flex-col gap-4">
          {Object.keys(seatsByRow).map((rowNum) => (
            <div key={rowNum} className="flex gap-2 justify-center">
              {seatsByRow[Number(rowNum)]
                .sort((a, b) => a.seatNumber - b.seatNumber)
                .map((seat) => {
                  const isDisabled =
                    seat.disabled || isDisabledSeat(seat.row, seat.seatNumber);
                  const isBooked = seat.isBooked;

                  if (isDisabled) {
                    return (
                      <HandicapSeatHandler key={seat._id}>
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded bg-[#5a5a5a] cursor-pointer"
                          aria-label="Handikapp säte"
                        >
                          <DisabledSeatIcon />
                        </button>
                      </HandicapSeatHandler>
                    );
                  }

                  return (
                    <button
                      key={seat._id}
                      onClick={() => toggleSeat(seat._id, isDisabled)}
                      className={`
                      w-7 h- flex items-center justify-center 
                       rounded 
                      ${
                        isDisabled
                          ? "cursor-not-allowed bg-[#5a5a5a]"
                          : isBooked
                          ? "cursor-not-allowed"
                          : selectedSeats.length >= totalTickets &&
                            !selectedSeats.includes(seat._id)
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }
                      ${
                        selectedSeats.includes(seat._id)
                          ? ""
                          : isDisabled
                          ? "bg-[#5A5A5A] text-white"
                          : isBooked
                          ? "bg-[#333333] text-white"
                          : "bg-kino-darkgrey text-white hover:bg-[#1a1a1a]"
                      }
                    `}
                      aria-label={
                        isDisabled ? "Disable seat" : `Säte ${seat.seatNumber}`
                      }
                      disabled={
                        isDisabled ||
                        isBooked ||
                        (selectedSeats.length >= totalTickets &&
                          !selectedSeats.includes(seat._id))
                      }
                    >
                      {isDisabled ? (
                        <DisabledSeatIcon />
                      ) : isBooked ? (
                        <TakenSeatIcon />
                      ) : selectedSeats.includes(seat._id) ? (
                        <SelectedSeatIcon />
                      ) : (
                        <AvailableSeatIcon />
                      )}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="flex gap-15 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-kino-darkgrey rounded flex items-center justify-center text-white">
                <AvailableSeatIcon />
              </div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center">
                <SelectedSeatIcon />
              </div>
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6rounded flex items-center justify-center text-white">
                <TakenSeatIcon />
              </div>
              <span className="text-sm">Taken</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#5A5A5A] rounded flex items-center justify-center text-white">
                <DisabledSeatIcon />
              </div>
              <span className="text-sm">Disabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaSeating;
