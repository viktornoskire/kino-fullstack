'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { booking } from '@/types/Bookedmovietypes';
import BookedMovies from './BookedMovies';

const InfoMeber = () => {
  type user = { [value: string]: string };

  const { data: session, update } = useSession();
  const [newName, setName] = useState<user>({ name: '' });
  const [newNumber, setNumber] = useState<user>({ number: '' });
  const [booked, setBooked] = useState<booking[]>([]);
  const [svar, setSvar] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch(
          `/api/bookings/${session?.user.id}/profile`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch booked movies');
        }
        const bookedMovies = await response.json();
        setBooked(bookedMovies);
      } catch (error) {
        console.error("Couldn't get booked movies", error);
      }
    }

    loadMovies();
  }, []);

  async function updateUser(userInfo: user) {
    try {
      const res = await fetch('/api/register/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInfo,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update user');
      }
      await update(userInfo);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setSvar({ message: error.message, type: 'error' });
      } else {
        console.error(error);
        setSvar({ message: 'unknown error', type: 'error' });
      }
    }
  }

  useEffect(() => {
    if (svar) {
      const timer = setTimeout(() => {
        setSvar(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [svar]);

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl text-center">Member page</h1>

        <div className="mt-4 mb-4">
          <div className="h-[300px] w-[300px] relative">
            <Image
              src="/inloggad-member.png"
              alt="icon for logged in member"
              width={350}
              height={350}
              className=" rounded-4xl "
            />
            <p className="absolute bottom-20 right-[50%] translate-[50%] max-w-[100px] text-center">
              {session?.user?.name}
            </p>
          </div>

          <div className="pt-4">
            <h2 className="text-2xl font-bold pb-2">Userinfo</h2>
            <p>Name: {session?.user?.name} </p>
            <p>Email: {session?.user.email}</p>
            <p>Mobile: {session?.user.number}</p>
          </div>
        </div>

        <div className="min-w-[300px]">
          <h2 className="text-2xl font-bold pb-2">Update userinfo</h2>
          {svar && (
            <div className={'mb-2 text-xl text-kino-red'} role="alert">
              {svar.message}
            </div>
          )}
          <div>
            <label htmlFor="nameInput">Name:</label>
            <br />
            <input
              type="text"
              id="nameInput"
              value={newName?.name}
              className="border-solid border-kino-darkred border rounded-md font-bold p-1"
              onChange={(e) => setName({ name: e.target.value })}
              required
            />
            <br />
            <Button
              type="button"
              onClick={() => {
                if (newName !== undefined) {
                  updateUser(newName);
                }
              }}
              style={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
              Update name
            </Button>
          </div>

          <div>
            <label htmlFor="numberInput">Mobile:</label>
            <br />
            <input
              type="text"
              id="numberInput"
              value={newNumber?.number}
              className="border-solid border-kino-darkred border rounded-md font-bold p-1"
              onChange={(e) => setNumber({ number: e.target.value })}
              required
            />
            <br />
            <Button
              type="button"
              onClick={() => {
                if (newNumber !== undefined) {
                  updateUser(newNumber);
                }
              }}
              style={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
              Update number
            </Button>
          </div>
        </div>

        <BookedMovies booked={booked} />
      </div>
    </>
  );
};

export default InfoMeber;
