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
              Kino Sandviken är en charmig och modern biograf som ligger i
              hjärtat av den fantastiska staden Sandviken. Biografen erbjuder en
              unik filmupplevelse med sina tre toppmoderna salonger, varav en är
              utrustad med en exklusiv IMAX-duk för enastående bild- och
              ljudkvalitet. Med ett brett urval av filmer - från stora
              blockbusters till indiefilmer och klassiker - har Kino Sandviken
              något för alla smaker. Det är en självklar mötesplats för
              filmälskare i alla åldrar!
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
              Kino Sandviken är tillgänglig för alla! Våra lokaler har
              rullstolsanpassade ingångar, ramper och sittplatser i varje
              salong. För gäster med nedsatt hörsel erbjuder vi hörslingor och
              textade visningar, och för de med nedsatt syn finns syntolkning
              tillgänglig vid utvalda filmer. Vår personal finns alltid på plats
              för att hjälpa till och göra besöket så smidigt som möjligt.
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
              Biografen stränger 15 minuter efter föreställningen
            </p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default InfoModal;
