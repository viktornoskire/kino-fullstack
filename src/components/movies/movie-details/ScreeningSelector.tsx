"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

interface Screening {
  _id: string;
  movieId: string;
  screeningTime: string;
  auditorium: string;
  status: string;
}

interface ScreeningSelectorProps {
  screenings: Screening[];
  // New optional props for booking page
  selectedScreening?: Screening; // Optional - if provided, use this as selected
  onScreeningSelect?: (screening: Screening) => void; // Optional callback
  maxDays?: number; // Optional - control how many days to show
  showActions?: boolean; // Optional - show action buttons
  customClass?: string; // Optional - additional classNames
}

export default function ScreeningSelector({
  screenings,
  selectedScreening,
  onScreeningSelect,
  maxDays = 14, // Default to 14 days for original behavior
  showActions = true, // Default to showing actions
  customClass = "",
}: ScreeningSelectorProps) {
  const router = useRouter();

  // Prepare and store screenings only once to avoid infinite re-renders
  const [limitedScreeningsArray] = useState(() => {
    // Group screenings by date
    const groupedScreenings: Record<string, Screening[]> = {};
    for (const screening of screenings) {
      const dateKey = format(new Date(screening.screeningTime), "yyyy-MM-dd");
      if (!groupedScreenings[dateKey]) {
        groupedScreenings[dateKey] = [];
      }
      groupedScreenings[dateKey].push(screening);
    }

    // Convert to array
    const screeningsArray: { date: Date; screenings: Screening[] }[] = [];
    for (const dateString in groupedScreenings) {
      const date = new Date(dateString);
      const screeningsForDate = groupedScreenings[dateString];
      screeningsArray.push({ date, screenings: screeningsForDate });
    }

    // Filter + sort + limit
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filtered = screeningsArray.filter((s) => s.date >= today);
    const sorted = filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
    return sorted.slice(0, maxDays);
  });

  // State: selected day and time
  const [selectedDate, setSelectedDate] = useState<Date>(
    limitedScreeningsArray[0]?.date ?? new Date()
  );
  const [availableScreenings, setAvailableScreenings] = useState<Screening[]>(
    []
  );
  const [selectedScreeningTime, setSelectedScreeningTime] = useState<
    string | null
  >(selectedScreening?.screeningTime || null);

  // Update times when date changes
  useEffect(() => {
    const selectedDay = limitedScreeningsArray.find(
      (day) =>
        format(day.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    );
    setAvailableScreenings(selectedDay ? selectedDay.screenings : []);

    // Only auto-select first screening if no screening is explicitly selected
    if (!selectedScreening) {
      setSelectedScreeningTime(
        selectedDay && selectedDay.screenings.length > 0
          ? selectedDay.screenings[0].screeningTime
          : null
      );
    }
  }, [selectedDate, limitedScreeningsArray, selectedScreening]);

  // Effect to handle external selectedScreening changes
  useEffect(() => {
    if (selectedScreening) {
      // Update selected date based on the selected screening
      const screeningDate = new Date(selectedScreening.screeningTime);
      setSelectedDate(screeningDate);
      setSelectedScreeningTime(selectedScreening.screeningTime);
    }
  }, [selectedScreening]);

  // Get the full screening object that matches the selected time
  const currentSelectedScreening = availableScreenings.find(
    (s) => s.screeningTime === selectedScreeningTime
  );

  // Handle screening selection
  const handleScreeningSelect = (screening: Screening) => {
    setSelectedScreeningTime(screening.screeningTime);

    // If callback provided, call it (for booking page)
    if (onScreeningSelect) {
      onScreeningSelect(screening);
    }
  };

  return (
    <div className={customClass}>
      {/* Screening dates */}
      <div className="border border-[color:var(--color-kino-grey)] rounded-lg p-4 mb-4 w-full">
        <h2 className="text-2xl text-[color:var(--color-kino-white)] font-bold mb-4">
          Available Dates
        </h2>
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
                    ? "bg-[color:var(--color-kino-darkred)] text-[color:var(--color-kino-white)] border-[color:var(--color-kino-darkred)]"
                    : "text-[color:var(--color-kino-white)] border-[color:var(--color-kino-grey)]"
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

      {/* Screening times */}
      <div className="border border-[color:var(--color-kino-grey)] rounded-lg p-4 mb-4 w-full">
        <h2 className="text-2xl text-[color:var(--color-kino-white)] font-bold mb-4">
          Available Times
        </h2>
        <div className="flex flex-wrap gap-[15px]">
          {availableScreenings.length > 0 ? (
            availableScreenings.map((screening) => {
              // Check if this is the selected screening
              const isSelected = selectedScreening
                ? screening._id === selectedScreening._id
                : selectedScreeningTime === screening.screeningTime;

              return (
                <button
                  key={screening._id}
                  onClick={() => handleScreeningSelect(screening)}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg border ${
                    isSelected
                      ? "bg-[color:var(--color-kino-darkred)] text-[color:var(--color-kino-white)] border-[color:var(--color-kino-darkred)]"
                      : "text-[color:var(--color-kino-white)] border-[color:var(--color-kino-grey)]"
                  }`}
                >
                  <span className="font-bold text-lg">
                    {format(new Date(screening.screeningTime), "HH:mm")}
                  </span>
                  <span className="text-sm">{screening.auditorium}</span>
                  <span className="text-sm text-[color:var(--color-kino-grey)]">
                    93 of 93
                  </span>
                </button>
              );
            })
          ) : (
            <p className="text-[color:var(--color-kino-white)]">
              No available times
            </p>
          )}
        </div>
      </div>

      {/* Action buttons - only show if showActions is true */}
      {showActions && currentSelectedScreening && (
        <div className="max-w-3xl mt-8 flex flex-col-reverse md:flex-row md:justify-between gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/")}
            className="w-full max-w-xs self-center md:w-auto"
          >
            Back to Homepage
          </Button>

          <Button
            type="button"
            onClick={() =>
              router.push(`/movies/booking/${currentSelectedScreening._id}`)
            }
            className="w-full max-w-xs self-center md:w-auto"
          >
            Book Ticket
          </Button>
        </div>
      )}
    </div>
  );
}