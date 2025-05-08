'use client';
import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { enGB } from "date-fns/locale";

const DateDropdown = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    setDates([...Array(7)].map((_, i) => addDays(today, i)));
  }, []);

  return (
    
    <div className="relative w-52">
      <h1 className="mb-2 text-xl font-bold">Date and times</h1>
      <button
        className="px-6 py-2 w-full bg-kino-black border-2 border-kino-darkred rounded-lg cursor-pointer flex items-center justify-between z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {format(selectedDate, "MMMM dd", { locale: enGB }).replace(/^[a-z]/, (char) => char.toUpperCase())}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute w-full bg-kino-darkgrey mt-1 rounded-lg overflow-hidden">
          {dates.map((date, idx) => (
            <div
              key={idx}
              className="px-4 py-2 hover:bg-kino-darkred cursor-pointer border-b border-kino-white"
              onClick={() => {
                setSelectedDate(date);
                setIsOpen(false);
              }}
            >
            {format(date, "MMMM dd", { locale: enGB }).replace(/^[a-z]/, (char) => char.toUpperCase())}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateDropdown;