'use client';
import { openType } from '@/types/Opentype';
import { useEffect, useMemo, useState } from 'react';
import OpeningHours from '../OpeningHours';
import InfoModal from '../InfoModal';
import Spinner from '../Spinner';

const InfoKino = () => {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const [open, setOpen] = useState<openType[]>([]);
  const date = useMemo(() => new Date(), []);

  useEffect(() => {
    async function loadHours() {
      try {
        const response = await fetch('/api/hours');
        const data = await response.json();
        setOpen(data);
      } catch (err) {
        console.error("Couldn't get opening hours", err);
      }
    }
    loadHours();
  }, []);

  if (open.length === 0)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );

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
      date: getDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
      }),
    });
  }

  const disp = dateDays.map((a) => {
    const thisDay = open.find((b) => a.weekday === b.day);
    return { day: thisDay?.day, date: a.date, hours: thisDay?.hours };
  });

  return (
    <>
      <div className=" lg: grid lg:grid-cols-2 p-4">
        <div className="bg-kino-black py-4 px-4 lg:col-span-2 mr-12 rounded-t-2xl">
          <h1 className="text-3xl font-bold mb-4">Kino Sandviken</h1>
          <p>Today&apos;s hours: {disp[0].hours}</p>
        </div>
        <div className="lg:col-span-2">
          <InfoModal display={disp} />
        </div>
        <div className="hidden lg:block lg:col-start-3 lg:row-start-1 lg:row-span-2">
          <OpeningHours display={disp} />
        </div>
      </div>
    </>
  );
};
export default InfoKino;