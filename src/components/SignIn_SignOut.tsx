import React from 'react';
import Button from './Button';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

type Props = { onToggleModal: () => void };

const SignIn_SignOut: FC<Props> = ({ onToggleModal }) => {
  const session = useSession();
  const { status } = session;
  if (status === 'authenticated') {
    return (
      <Button
        type='button'
        onClick={() => {
          signOut({ redirect: false });
        }}
        className='hidden sm:hidden md:hidden lg:inline-block ml-auto border border-kino-white hover:text-kino-darkgrey'>
        Sign Out
      </Button>
    );
  } else if (status === 'unauthenticated') {
    return (
      <Button
        type='button'
        onClick={onToggleModal}
        className='hidden sm:hidden md:hidden lg:inline-block ml-auto border border-kino-white hover:text-kino-darkgrey'>
        Sign In
      </Button>
    );
  }
};

export default SignIn_SignOut;
