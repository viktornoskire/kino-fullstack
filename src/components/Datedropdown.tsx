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
      <button
        className="flex items-center justify-between px-4 py-2 bg-black text-white border-2 border-red-500 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {format(selectedDate, "MMMM dd", { locale: enGB }).replace(/^[a-z]/, (char) => char.toUpperCase())}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute w-full bg-black text-white mt-1 rounded-lg shadow-lg overflow-hidden z-10">
          {dates.map((date, idx) => (
            <div
              key={idx}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-gray-600 last:border-0"
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