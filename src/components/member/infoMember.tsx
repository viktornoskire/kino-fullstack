'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../Button';

const InfoMeber = () => {
  type user = { [value: string]: string };
  type booking = {
    movie: string;
    url: string;
    date: string;
    time: string;
  };

  const { data: session, update } = useSession();
  const [newName, setName] = useState<user>();
  const [newNumber, setNumber] = useState<user>();
  const [booked, setBooked] = useState<booking[]>([]);
  const [svar, setSvar] = useState<null | {
    message: string;
    type: 'success' | 'error';
  }>(null);

  console.log('svar', svar);
  console.log('booked', booked);

  //Kontrollera och jämför om bokning har varit eller om det är en kommande visning
  if (new Date('2025-05-08T12:00:00') < new Date()) {
    console.log('Datumet har redan varit');
  } else {
    console.log('Datumet är i framtiden');
  }

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

      setSvar(data.message);
      update(userInfo);
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

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl text-center">Member page</h1>

        <div className=" mt-8 mb-4 ">
          <div className="h-[250px] w-[250px] relative">
            <Image
              src="/inloggad-member.png"
              alt="icon for logged in member"
              width={350}
              height={350}
              className=" rounded-4xl "
            />
            <p className="absolute bottom-16 right-[50%] translate-[50%] max-w-[100px] text-center">
              {session?.user?.name}
            </p>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-2xl">Userinfo</h2>
          <p>Name: </p>
          <span>{session?.user?.name} </span>
          <p>Email: {session?.user.email}</p>
          <p>Mobile: {session?.user.number}</p>
        </div>

        <div className="flex flex-col max-w-[450px] p-4">
          <h2 className="text-2xl">Update userinfo</h2>

          <div>
            <label htmlFor="nameInput">Name:</label>
            <input
              type="text"
              id="nameInput"
              value={newName?.name}
              className="border-solid border-kino-darkred border rounded-md font-bold p-1"
              onChange={(e) => setName({ name: e.target.value })}
              required
            />
            <Button
              type="button"
              onClick={() => {
                if (newName !== undefined) {
                  updateUser(newName);
                }
              }}
              style={{ marginTop: '16px' }}
            >
              Update name
            </Button>
          </div>

          <div>
            <label htmlFor="numberInput">Mobile:</label>
            <input
              type="text"
              id="numberInput"
              value={newNumber?.number}
              className="border-solid border-kino-darkred border rounded-md font-bold p-1"
              onChange={(e) => setNumber({ number: e.target.value })}
              required
            />
            <Button
              type="button"
              onClick={() => {
                if (newNumber !== undefined) {
                  updateUser(newNumber);
                }
              }}
              style={{ marginTop: '16px' }}
            >
              Update number
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-2xl">Booked movies</h2>
          <ul>
            {booked ? (
              booked.map((book, index) => {
                return (
                  <li key={index} className="p-2 max-w-[240px]">
                    <Image
                      src={book.url}
                      alt="Movie poster"
                      width={300}
                      height={450}
                      className="w-auto h-auto mb-2 rounded-2xl"
                    />
                    <p>{book.movie}</p>
                    <p>Date: {book.date}</p>
                    <p className="text-xl mb-4">Time: {book.time}</p>
                  </li>
                );
              })
            ) : (
              <li>No upcoming bookings</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default InfoMeber;
