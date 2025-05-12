"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Spinner from "@/components/Spinner";
type Screening = {
  _id: string;
  screeningTime: string;
  auditorium: string;
};

type ScreeningListProps = {
  slug: string;
};

export default function ScreeningList({ slug }: ScreeningListProps) {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/screenings?slug=${slug}`);

        if (!response.ok) {
          throw new Error("Could not fetch screenings");
        }

        const data = await response.json();
        setScreenings(data);
      } catch (err) {
        setError("Failed to load screenings");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScreenings();
  }, [slug]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[200px]">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;
  if (screenings.length === 0)
    return <div>No screenings available for this movie.</div>;

  return (
    <div className="mt-30 ">
      <h2 className="text-2xl font-bold mb-4">Available Screenings</h2>
      <div className="flex flex-wrap gap-3">
        {screenings.map((screening) => {
          const screeningDate = new Date(screening.screeningTime);
          return (
            <div
              key={screening._id}
              className="p-3 border rounded-lg bg-kino-black hover:bg-kino-darkred cursor-pointer"
            >
              <div className="font-semibold">
                {format(screeningDate, "dd MMM yyyy")}
              </div>
              <div>{format(screeningDate, "HH:mm")}</div>
              <div className="text-sm mt-1">{screening.auditorium}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
