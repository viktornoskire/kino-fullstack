'use client';

import { FormEvent, useState } from 'react';
import { FC } from 'react';
import Button from './Button';
import PasswordInput from './PasswordInput';
import Image from 'next/image';

type Props = {
  showRegisterModal: string;
  showRegisteredModal: string;
  onToggleModal: (modal: string) => void;
  onResetForm: (event: FormEvent<HTMLFormElement>) => void;
};

const Register: FC<Props> = ({ showRegisterModal, showRegisteredModal, onToggleModal, onResetForm }) => {
  const [error, setError] = useState<string>('');
  const resetError = () => {
    if (error !== '') {
      setError('');
    }
  };

  return (
    <div>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-51 ${showRegisterModal}`}
        onClick={() => {
          onToggleModal('register');
        }}></div>
      <div
        className={`w-full bottom-1/13 top-1/13 max-w-100 h-auto flex items-center z-999 bg-neutral-800 text-white p-8 rounded-xl shadow-lg fixed flex-col right-2 left-2 ml-auto mr-auto overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ${showRegisterModal}`}>
        <Image src={'/kinoLogoOverlay.png'} alt='kino logo' width={200} height={120} className='w-auto h-auto' />

        <h2 className='text-2xl font-bold mt-4 mb-6'>Register</h2>
        <p className=''>
          Already a member?{' '}
          <span
            className='underline cursor-pointer'
            onClick={() => {
              onToggleModal('login');
              onToggleModal('register');
            }}>
            Login
          </span>
        </p>
        <form
          className='register-form'
          onSubmit={async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            const firstName = String(formData.get('firstname')).trim();
            const lastName = String(formData.get('lastname')).trim();

            try {
              const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  firstname: firstName,
                  lastname: lastName,
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  password: formData.get('password'),
                }),
              });
              const { created, message } = await res.json();

              if (!created) {
                setError(message);
                return;
              } else {
                setError('');
                onToggleModal('register');
                onToggleModal('registered');
                onResetForm(event);
              }
            } catch (error) {
              console.log(error as string);
              throw new Error(error as string);
            }
          }}>
          <input
            onChange={resetError}
            type='text'
            placeholder='first name...'
            name='firstname'
            className='w-full p-3 bg-neutral-900 rounded-lg text-white mb-4 outline-none focus:ring-2 border-2 border-s-gray-300'
            id='register-first'
          />
          <input
            onChange={resetError}
            type='text'
            placeholder='last name...'
            name='lastname'
            className='w-full p-3 bg-neutral-900 rounded-lg text-white mb-4 outline-none focus:ring-2 border-2 border-s-gray-300'
            id='register-last'
          />
          <input
            onChange={resetError}
            type='email'
            placeholder='email...'
            name='email'
            className='w-full p-3 bg-neutral-900 rounded-lg text-white mb-4 outline-none focus:ring-2 border-2 border-s-gray-300'
            autoComplete='email'
            id='register-email'
          />
          <input
            onChange={resetError}
            type='text'
            placeholder='phone number...'
            name='phone'
            className='w-full p-3 bg-neutral-900 rounded-lg text-white mb-4 outline-none focus:ring-2 border-2 border-s-gray-300'
            autoComplete='tel'
            id='register-phone'
          />
          <PasswordInput resetError={resetError} />
          <small className='block pb-4 mr-auto ml-auto text-red-500'>{error}</small>

          <Button type='submit' className='block mr-auto ml-auto'>
            Register
          </Button>

          <p
            className='hover:text-gray-300 text-center mt-4 cursor-pointer'
            onClick={() => {
              onToggleModal('register');
            }}>
            Close
          </p>
        </form>
      </div>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-51 ${showRegisteredModal}`}
        onClick={() => {
          onToggleModal('registered');
        }}></div>
      <div
        className={`w-full max-w-100 flex items-center z-999 bg-neutral-800 top-1/4 bottom-1/4 text-white p-8 rounded-xl shadow-lg fixed flex-col right-2 left-2 ml-auto mr-auto overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ${showRegisteredModal}`}>
        <Image src={'/kinoLogoOverlay.png'} alt='kino logo' width={200} height={120} className='w-auto h-auto' />
        <h2 className='text-2xl font-bold mt-4 mb-6'>Welcome to the club!</h2>
        <Image
          src='/confirmed-order.png'
          alt='Register completed'
          width={80}
          height={80}
          className='mx-auto mb-4 print:hidden'
        />
        <p className=''>
          <span
            className='underline cursor-pointer'
            onClick={() => {
              onToggleModal('login');
              onToggleModal('registered');
            }}>
            Login
          </span>
        </p>
        <p
          className='hover:text-gray-300 text-center mt-4 cursor-pointer'
          onClick={() => {
            onToggleModal('registered');
          }}>
          Close
        </p>
      </div>
    </div>
  );
};

export default Register;
