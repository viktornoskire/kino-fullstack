'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../Button';

const InfoMeber = () => {
  const { data: session } = useSession();
  const [newName, setName] = useState('');
  const [svar, setSvar] = useState('');
  console.log('svar', svar);
  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl text-center">Welcome back</h1>

        <div className="h-[200px] w-[200px] relative">
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

        <div>
          <h2 className="text-2xl">Userinfo</h2>
          <p>Name: {session?.user?.name}</p>
          <p>E-mail: {session?.user?.email}</p>
        </div>

        <div>
          <h2>Update userinfo</h2>
          <label>Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="button"
            onClick={async () => {
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
                const test = await res.json();

                if (test) {
                  setSvar(test);
                  return;
                } else {
                  setSvar('');
                }
              } catch (error) {
                console.log(error as string);
                throw new Error(error as string);
              }
            }}
          >
            Update userinfor
          </Button>
        </div>
      </div>
    </>
  );
};

export default InfoMeber;
