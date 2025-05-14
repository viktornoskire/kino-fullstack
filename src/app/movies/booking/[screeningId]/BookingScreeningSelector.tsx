"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

interface Screening {
  _id: string;
  movieId: string;
  screeningTime: string;
  auditorium: string;
  status: string;
}

interface ScreeningSelectorProps {
  screenings: Screening[];
  selectedScreening: Screening;
  onScreeningSelect: (screening: Screening) => void;
}

export default function BookingScreeningSelector({
  screenings,
  selectedScreening,
  onScreeningSelect,
}: ScreeningSelectorProps) {
  const [limitedScreeningsArray] = useState(() => {
    const groupedScreenings: Record<string, Screening[]> = {};
    for (const screening of screenings) {
      const dateKey = format(new Date(screening.screeningTime), "yyyy-MM-dd");
      if (!groupedScreenings[dateKey]) {
        groupedScreenings[dateKey] = [];
      }
      groupedScreenings[dateKey].push(screening);
    }

    const screeningsArray: { date: Date; screenings: Screening[] }[] = [];
    for (const dateString in groupedScreenings) {
      const date = new Date(dateString);
      const screeningsForDate = groupedScreenings[dateString];
      screeningsArray.push({ date, screenings: screeningsForDate });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filtered = screeningsArray.filter((s) => s.date >= today);
    const sorted = filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
    return sorted.slice(0, 5);
  });

  const [selectedDate, setSelectedDate] = useState<Date>(
    limitedScreeningsArray[0]?.date ?? new Date()
  );
  const [availableScreenings, setAvailableScreenings] = useState<Screening[]>(
    []
  );

  useEffect(() => {
    const selectedDay = limitedScreeningsArray.find(
      (day) =>
        format(day.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    );
    setAvailableScreenings(selectedDay ? selectedDay.screenings : []);
  }, [selectedDate, limitedScreeningsArray]);

  return (
    <div>
      <div className="border border-kino-grey rounded-lg p-4 mb-4 mt-4 max-w-xl mx-2">
        <h2 className="text-2xl font-bold mb-4">Available Dates</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[15px]">
          {limitedScreeningsArray.map((screening, idx) => {
            const isSelected =
              format(screening.date, "yyyy-MM-dd") ===
              format(selectedDate, "yyyy-MM-dd");
            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(screening.date)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg border ${
                  isSelected
                    ? "bg-kino-darkred border-kino-darkred"
                    : "border-kino-grey"
                }`}
              >
                <span className="font-bold">
                  {format(screening.date, "yyyy-MM-dd") ===
                  format(new Date(), "yyyy-MM-dd")
                    ? "Today"
                    : format(screening.date, "EEEE", { locale: enGB })}
                </span>
                <span className="text-sm">
                  {format(screening.date, "dd MMM", { locale: enGB })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border border-kino-grey rounded-lg p-4 mb-4 max-w-xl mx-2">
        <h2 className="text-2xl font-bold mb-4">Available Times</h2>
        <div className="flex flex-wrap gap-[15px]">
          {availableScreenings.length > 0 ? (
            availableScreenings.map((screening) => {
              const isSelected = screening._id === selectedScreening._id;
              return (
                <button
                  key={screening._id}
                  onClick={() => onScreeningSelect(screening)}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg border ${
                    isSelected
                      ? "bg-kino-darkred border-kino-darkred"
                      : "border-kino-grey"
                  }`}
                >
                  <span className="font-bold text-lg">
                    {format(new Date(screening.screeningTime), "HH:mm")}
                  </span>
                  <span className="text-sm">{screening.auditorium}</span>
                  <span className="text-sm text-kino-grey">93 of 93</span>
                </button>
              );
            })
          ) : (
            <p>No available times</p>
          )}
        </div>
      </div>
    </div>
  );
}
