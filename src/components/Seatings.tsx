"use client";
import React, { useState, useEffect } from "react";

interface Seat {
  _id: string;
  row: number;
  seatNumber: number;
}

type SeatsByRow = {
  [key: number]: Seat[];
};

const CinemaSeating: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch("/api/seats");

        if (!response.ok) {
          throw new Error("Kunde inte hämta säten");
        }

        const data = await response.json();
        console.log("Hämtad data:", data);

        if (Array.isArray(data)) {
          setSeats(data);
        } else if (data.seats && Array.isArray(data.seats)) {
          setSeats(data.seats);
        } else {
          console.error("Ogiltig datastruktur:", data);
        }
      } catch (error) {
        console.error("Fel vid hämtning av säten:", error);
      }
    };

    fetchSeats();
  }, []);

  const seatsByRow: SeatsByRow = seats.reduce((acc: SeatsByRow, seat: Seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const toggleSeat = (seatId: string): void => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  return (
    <div
      className="flex flex-col items-center p-8 rounded-lg"
      style={{ backgroundColor: "var(--color-kino-darkgrey" }}
    >
      <h2 className="text-2xl font-bold mb-6">Biograf Sätesbokning</h2>

      {/* Skärm */}
      <div className="w-2/4 h-5 bg-gray-400 rounded mb-12 flex items-center justify-center">
        <span className="text-white text-sm">SKÄRM</span>
      </div>

      {/* Säten */}
      <div className="flex flex-col gap-4">
        {Object.keys(seatsByRow).map((rowNum) => (
          <div key={rowNum} className="flex gap-2 justify-center">
            <div className="w-6 flex items-center justify-center font-bold">
              {rowNum}
            </div>
            {seatsByRow[Number(rowNum)]
              .sort((a, b) => a.seatNumber - b.seatNumber)
              .map((seat) => (
                <button
                  key={seat._id}
                  onClick={() => toggleSeat(seat._id)}
                  className={`
                    w-10 h-10 flex items-center justify-center 
                    border rounded cursor-pointer
                    ${
                      selectedSeats.includes(seat._id)
                        ? "bg-[#154e10]"
                        : "bg-kino-darkgrey text-white hover:bg-[#1a1a1a]"
                    }
                  `}
                >
                  {selectedSeats.includes(seat._id) ? (
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <ellipse
                        cx="50"
                        cy="62"
                        rx="28"
                        ry="20"
                        fill="currentColor"
                      />
                      <circle cx="50" cy="36" r="20" fill="currentColor" />

                      <circle cx="50" cy="36" r="13" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <ellipse
                        cx="50"
                        cy="62"
                        rx="28"
                        ry="20"
                        fill="currentColor"
                      />
                      <circle cx="50" cy="36" r="20" fill="currentColor" />

                      <circle cx="50" cy="36" r="13" fill="currentColor" />
                    </svg>
                  )}
                </button>
              ))}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="font-bold">Valda säten: {selectedSeats.length}</p>
        <div className="flex gap-4 mt-2 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-kino-darkgrey border rounded flex items-center justify-center text-white">
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <ellipse cx="50" cy="62" rx="28" ry="20" fill="currentColor" />
                <circle cx="50" cy="36" r="20" fill="currentColor" />

                <circle cx="50" cy="36" r="13" fill="currentColor" />
              </svg>
            </div>
            <span>Tillgängligt</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 border rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--color-kino-darkgreen)" }}
            >
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <ellipse cx="50" cy="62" rx="28" ry="20" fill="currentColor" />
                <circle cx="50" cy="36" r="20" fill="currentColor" />

                <circle cx="50" cy="36" r="13" fill="currentColor" />
              </svg>
            </div>
            <span>Valt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaSeating;
