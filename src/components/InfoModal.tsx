"use client";

import Image from "next/image";
import { useState } from "react";

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
    <div className="bg-kino-darkgrey max-w-[700px] rounded-3xl p-4">
      <h3 className="text-2xl">Vanliga frågor</h3>
      <ul>
        <li>
          <button
            type="button"
            className="flex flex-row"
            onClick={() => {
              readMore(1);
            }}
          >
            <Image src="/QnAOpen.png" alt="Open" width={25} height={25} />
            Kort om biografen
          </button>

          {open[0].display && (
            <p>
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
          <button
            type="button"
            className="flex flex-row"
            onClick={() => {
              readMore(2);
            }}
          >
            <Image src="/QnAOpen.png" alt="Open" width={25} height={25} />
            Tillgänglighet
          </button>
          {open[1].display && (
            <p>
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
          <button
            type="button"
            className="flex flex-row"
            onClick={() => {
              readMore(3);
            }}
          >
            <Image src="/QnAOpen.png" alt="Open" width={25} height={25} />
            Öppettider
          </button>
          {open[2].display && (
            <p>Biografen stränger 15 minuter efter föreställningen</p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default InfoModal;
