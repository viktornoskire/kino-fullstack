'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../Button';

const InfoMeber = () => {
  const { data: session, update } = useSession();
  const [newName, setName] = useState('');
  const [booked, setBooked] = useState();

  const [svar, setSvar] = useState<null | {
    message: string;
    type: 'success' | 'error';
  }>(null);

  console.log('svar', svar);
  console.log('booked', booked);

  //Kontrollera och jämför om bokning har varit eller om det är en kommande visning

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch(`/api/booking/${session?.user.id}`);
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

  async function updateUser() {
    try {
      const res = await fetch('/api/register/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update user');
      }

      setSvar(data.message);
      update({ name: newName });
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
      <div className="flex flex-col justify-center  p-4">
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
            <p className="absolute bottom-14 right-[50%] translate-[50%] max-w-[100px] text-center">
              {session?.user?.name}
            </p>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-2xl">Userinfo</h2>
          <p>Name: </p>
          <span>{session?.user?.name} </span>
          <p>Email: {session?.user.email}</p>
          <p>Mobile:</p>
        </div>

        <div className="flex flex-col max-w-[450px] p-4">
          <h2 className="text-2xl">Update userinfo</h2>
          <label>Name:</label>
          <input
            type="text"
            value={newName}
            className="border-solid border-kino-darkred border rounded-md font-bold p-1"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Mobile:</label>
          <input
            type="text"
            className="border-solid border-kino-darkred border rounded-md font-bold p-1"
          />
          <div>
            <Button
              type="button"
              onClick={updateUser}
              style={{ marginTop: '16px' }}
            >
              Update userinfo
            </Button>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-2xl">Booked movies</h2>
          <ul>
            <li>Titel:</li>
            <li>Date:</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default InfoMeber;
