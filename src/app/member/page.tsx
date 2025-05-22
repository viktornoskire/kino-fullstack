'use client';

import InfoMeber from '@/components/member/infoMember';
import LoggedOut from '@/components/member/LoggedOut';
import { useSession } from 'next-auth/react';

export default function Member() {
  const session = useSession();
  const { status } = session;

  if (status === 'authenticated') {
    return (
      <main className='max-w-6xl mx-auto pb-10 px-4 mt-4 md:px-6 lg:mt-10 text-white'>
        <InfoMeber />
      </main>
    );
  } else if (status === 'unauthenticated') {
    return (
      <main className='max-w-6xl mx-auto pb-10 px-4 mt-4 md:px-6 lg:mt-10 text-white'>
        <LoggedOut />
      </main>
    );
  }
}
