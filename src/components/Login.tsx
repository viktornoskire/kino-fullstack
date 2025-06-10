'use client';

import { useState, FormEvent } from 'react';
import { FC } from 'react';
import Button from './Button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

type Props = {
  showLoginModal: string;
  showLoggedInModal: string;
  onToggleModal: (modal: string) => void;
  onResetForm: (event: FormEvent<HTMLFormElement>) => void;
};

const Login: FC<Props> = ({ showLoginModal, showLoggedInModal, onToggleModal, onResetForm }) => {
  const [error, setError] = useState<string>('');
  const resetError = () => {
    if (error !== '') {
      setError('');
    }
  };

  return (
    <div>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-51 ${showLoginModal}`}
        onClick={() => {
          onToggleModal('login');
        }}></div>
      <div
        className={`w-full max-w-100 flex items-center z-999 bg-neutral-800 top-1/5 bottom-1/5 text-white p-8 rounded-xl shadow-lg fixed flex-col right-2 left-2 ml-auto mr-auto overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ${showLoginModal}`}>
        <Image src={'/kinoLogoOverlay.png'} alt='kino logo' width={200} height={120} className='w-auto h-auto' />
        <h2 className='text-2xl font-bold mt-4 mb-6'>Login</h2>
        <p>
          Not a member?{' '}
          <span
            className='underline cursor-pointer'
            onClick={() => {
              onToggleModal('login');
              onToggleModal('register');
            }}>
            Register
          </span>
        </p>
        <form
          className='login-form'
          onSubmit={async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            try {
              const sign = await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false,
              });

              if (!sign?.ok) {
                const error = sign?.error;
                if (error !== null && error !== undefined) {
                  setError(error);
                  return;
                } else {
                  setError('Invalid credentials');
                }
              } else {
                onResetForm(event);
                onToggleModal('login');
                onToggleModal('logged in');
              }
            } catch (error) {
              throw new Error(error as string);
            }
          }}>
          <input
            onChange={resetError}
            type='email'
            placeholder='email...'
            name='email'
            className='w-full p-3 bg-neutral-900 rounded-lg text-white mb-4 outline-none focus:ring-2 border-2 border-s-gray-300'
            autoComplete='email'
            id='login-email'
          />
          <input
            onChange={resetError}
            type='password'
            placeholder='password...'
            name='password'
            className='w-full p-3 bg-neutral-900 rounded-lg text-white mb-4 outline-none focus:ring-2 border-2 border-s-gray-300'
            autoComplete='current-password'
            id='login-password'
          />
          <small className='block pb-4 mr-auto ml-auto text-kino-darkred'>{error}</small>
          <Button type='submit' className='block mr-auto ml-auto'>
            Login
          </Button>
          <p
            className='hover:text-gray-300 text-center mt-4 cursor-pointer'
            onClick={() => {
              onToggleModal('login');
            }}>
            Close
          </p>
        </form>
      </div>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-51 ${showLoggedInModal}`}
        onClick={() => {
          onToggleModal('logged in');
        }}></div>
      <div
        className={`w-full max-w-100 flex items-center z-999 bg-neutral-800 top-1/4 bottom-1/4 text-white p-8 rounded-xl shadow-lg fixed flex-col right-2 left-2 ml-auto mr-auto overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ${showLoggedInModal}`}>
        <Image src={'/kinoLogoOverlay.png'} alt='kino logo' width={200} height={120} className='w-auto h-auto' />
        <h2 className='text-2xl font-bold mt-4 mb-6'>Welcome back!</h2>
        <Image
          src='/confirmed-order.png'
          alt='Order confirmed'
          width={80}
          height={80}
          className='mx-auto mb-4 print:hidden'
        />
        <p
          className='hover:text-gray-300 text-center mt-4 cursor-pointer'
          onClick={() => {
            onToggleModal('logged in');
          }}>
          Close
        </p>
      </div>
    </div>
  );
};

export default Login;
