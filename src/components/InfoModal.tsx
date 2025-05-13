"use client";

import { useState } from "react";
import InfoButton from "./InfoButton";

const InfoModal = () => {
  const update = [
    { id: 1, display: false },
    { id: 2, display: false },
    { id: 3, display: false },
  ];

  const [open, setOpen] = useState(update);

  function readMore(index: number) {
    const result = open.map((a) => {
      if (a.id === index) {
        return { ...a, display: !a.display };
      } else {
        return { ...a };
      }
    });
    setOpen(result);
  }

  return (
    <div className="bg-kino-darkgrey max-w-[700px] rounded-2xl p-4">
      <h3 className="text-2xl mb-2">Vanliga frågor</h3>
      <ul>
        <li>
          <InfoButton
            type="button"
            onClick={() => {
              readMore(1);
            }}
          >
            {"Kort om biografen"}
          </InfoButton>

          {open[0].display && (
            <p className="p-2">
              Kino Sandviken is a charming and modern cinema located in the
              heart of the fantastic city of Sandviken. The cinema offers a
              unique movie experience with two state-of-the-art auditoriums, one
              of which is equipped with an exclusive IMAX screen for outstanding
              picture and sound quality. With a wide selection of films – from
              major blockbusters to indie films and classics – Kino Sandviken
              has something for every taste. It is a natural meeting place for
              movie lovers of all ages!
            </p>
          )}
        </li>
        <li>
          <InfoButton
            type="button"
            onClick={() => {
              readMore(2);
            }}
          >
            {"Tillgänglighet"}
          </InfoButton>
          {open[1].display && (
            <p className="p-2">
              Kino Sandviken is accessible to everyone! Our facilities feature
              wheelchair-accessible entrances, ramps, and seating in every
              auditorium. For guests with hearing impairments, we offer hearing
              loops and subtitled screenings, and for those with visual
              impairments, audio description is available for selected films.
              Our staff is always on hand to assist and make your visit as
              smooth as possible.
            </p>
          )}
        </li>
        <li>
          <InfoButton
            type="button"
            onClick={() => {
              readMore(3);
            }}
          >
            {"Öppettider"}
          </InfoButton>
          {open[2].display && (
            <p className="p-2">
              The cinema closes 15 minutes after the screening.
            </p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default InfoModal;
