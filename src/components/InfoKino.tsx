"use client";
import { openType } from "@/types/Opentype";
import { useEffect, useMemo, useState } from "react";

const InfoKino = () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [open, setOpen] = useState<openType[]>([]);
  const date = useMemo(() => new Date(), []);

  useEffect(() => {
    async function loadHours() {
      try {
        const response = await fetch("/api/hours");
        const data = await response.json();
        setOpen(data);
      } catch (err) {
        console.error("Couldn't get opening hours", err);
      }
    }
    loadHours();
  }, []);

  type dates = {
    weekday: string;
    date: string;
  };

  const dateDays: dates[] = [];

  for (let i = 0; i < 7; i++) {
    const dateToday = new Date(date);
    const timestamp = dateToday.setDate(date.getDate() + i);
    const getDate = new Date(timestamp);
    const getDay = weekday[getDate.getDay()];
    dateDays.push({
      weekday: getDay,
      date: getDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
      }),
    });
  }

  useEffect(() => {}, []);

  const display = open.map((a) => {
    const sameDay = dateDays.find((b) => a.day === b.weekday);
    return { day: sameDay?.weekday, date: sameDay?.date, hours: a.hours };
  });

  /* function sortWeek(week){
   const spliceFrom = date.getDay();
    const pastDays = week.splice(0, spliceFrom);
    setWeek(week.concat(pastDays));
}
 */
  console.log(display);

  return (
    <>
      <div>
        <h1>Kino Sandviken</h1>
        <p>Open hours today </p>
      </div>
      <div className="bg-kino-darkgrey rounded-2xl p-4 max-w-[500px]">
        <h2>Opening hours</h2>
        <p>The cinema closes 15 minutes after the screening</p>
        <div className="flex flex-row justify-between">
          <p>Weekday</p>
          <p>Date</p>
          <p>Opening hours</p>
        </div>

        <ul className="flex flex-col justify-center">
          {open.map((show, index) => {
            return (
              <li key={index} className="p-2 max-w-[240px]">
                {show.day}:{show.hours}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default InfoKino;
