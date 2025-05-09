"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Screening {
  _id: string;
  startsAt: string;
}

interface TimeSelectorProps {
  /** Datum från DateDropdown. Kan vara Date objekt eller ISO string */
  selectedDate: Date | string | null;
  /** Anropas när användaren klickar på en tid */
  onSelect: (time: string) => void;
  /** Om en tid redan är vald (förval) */
  value?: string | null;
  /** (valfritt) Filmens id om API‑t:et kräver det */
  movieId?: string;
}

export default function TimeSelector({
  selectedDate,
  onSelect,
  value,
  movieId,
}: TimeSelectorProps) {
  const [times, setTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchTimes = async () => {
      try {
        setLoading(true);
        setError(null);

        const isoDate =
          typeof selectedDate === "string"
            ? selectedDate
            : format(selectedDate, "yyyy-MM-dd");

        const url = new URL("/api/screenings", window.location.origin);
        url.searchParams.append("date", isoDate);
        if (movieId) url.searchParams.append("movieId", movieId);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Kunde inte hämta visningar");

        const data: Screening[] = await res.json();
        // Sortera kronologiskt och ta max tre
        const sorted = data
          .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
          .slice(0, 3)
          .map((s) => s.startsAt.substring(0, 5)); // "14:00:00" -> "14:00"

        setTimes(sorted);
      } catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Okänt fel");
  }
    };

    fetchTimes();
  }, [selectedDate, movieId]);

  /* ------------------------------------------------
   * 2. Render
   * ------------------------------------------------*/
  if (!selectedDate) {
    return (
      <p className="text-center text-sm text-gray-400">Välj först ett datum</p>
    );
  }

  if (loading) {
    return <p className="text-center text-sm">Laddar tider…</p>;
  }

  if (error) {
    return <p className="text-center text-sm text-red-500">Fel: {error}</p>;
  }

  if (times.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400">
        Inga visningar för valt datum
      </p>
    );
  }

  return (
    <div className="flex gap-4 flex-wrap justify-center mt-6">
      {times.map((time) => (
        <button
          key={time}
          onClick={() => onSelect(time)}
          className={`w-28 h-14 rounded-xl font-bold text-xl flex items-center justify-center transition-colors ${
            value === time
              ? "bg-[#9A2D24] text-white" // vald
              : "bg-black text-white border border-white hover:bg-[#1a1a1a]"
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
