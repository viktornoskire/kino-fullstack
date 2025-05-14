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

  const disp = dateDays.map((a) => {
    const thisDay = open.find((b) => a.weekday === b.day);
    return { day: thisDay?.day, date: a.date, hours: thisDay?.hours };
  });

  return (
    <>
      <div>
        <h1>Kino Sandviken</h1>
        <p>Open hours today {disp[0].hours}</p>
      </div>

      <div className="bg-kino-darkgrey rounded-2xl p-4 max-w-[500px]">
        <h2>Opening hours</h2>
        <p>The cinema closes 15 minutes after the screening</p>

        <div className="grid grid-cols-3">
          <p className="col-start-1">Weekday</p>
          <p className="col-start-2">Date</p>
          <p className="col-start-3">Opening hours</p>
        </div>

        <ul className="">
          {disp.map((show, index) => {
            return (
              <li key={index} className="p-2  grid grid-cols-3">
                <span className="col-start-1">{show.day} </span>{" "}
                <span className="col-start-2">{show.date}</span>
                <span className="col-start-3">{show.hours}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default InfoKino;
