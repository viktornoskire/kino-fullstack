"use client";
import { openType } from "@/types/Opentype";
import { useEffect, useState } from "react";

const InfoKino = () => {
  const [open, setOpen] = useState<openType[]>([]);

  useEffect(() => {
    async function loadHours() {
      try {
        const response = await fetch("/api/hours");
        const hour = await response.json();
        setOpen(hour);
      } catch (err) {
        console.error("Couldn't get opening hours", err);
      }
    }
    loadHours();
  }, []);

  console.log("open", open);

  return (
    <>
      <div>
        <h2>Opening hours</h2>
        <ul className="flex flex-row justify-center">
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
