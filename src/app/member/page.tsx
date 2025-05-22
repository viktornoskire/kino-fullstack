'use client';
import InfoMeber from '@/components/member/infoMember';
import { useSession } from 'next-auth/react';

export default function Member() {
  const session = useSession();
  const { status } = session;
  if (status === 'authenticated') {
    return (
      <>
        <InfoMeber />
      </>
    );
  } else if (status === 'unauthenticated') {
    return (
      <>
        <h1>Becom member</h1>
      </>
    );
  }
}
