'use client';
import { useState, useEffect, useMemo, FormEvent } from 'react';
import TicketButton from './TicketButton';
import { Tickets, TicketSelectorProps } from './types/TicketSelector.types';
import { useSession } from 'next-auth/react';
import Register from '@/components/Register';
import Login from '@/components/Login';

export default function TicketSelector({
  onTotalTicketsChange,
  onFinalPriceChange,
  onTicketSummaryChange,
}: TicketSelectorProps) {
  const session = useSession();
  const { status } = session;
  const [showLoginModal, setLoginModal] = useState<string>('hidden');
  const [showRegisterModal, setRegisterModal] = useState<string>('hidden');

  const resetForm = (event: FormEvent<HTMLFormElement>) => {
    const userForm = event.target as HTMLFormElement;
    userForm.reset();
  };

  const toggleModal = (modal: string) => {
    if (modal === 'login') {
      if (showLoginModal === 'hidden') {
        setLoginModal('');
      } else {
        setLoginModal('hidden');
      }
    } else if (modal === 'register') {
      if (showRegisterModal === 'hidden') {
        setRegisterModal('');
      } else {
        setRegisterModal('hidden');
      }
    }
  };

  const isLoggedIn = status === 'authenticated' ? true : false;
  const [ticketCounts, setTicketCounts] = useState<Tickets>({
    regular: 0,
    kids: 0,
    student: 0,
    senior: 0,
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const ticketPrices = useMemo<Tickets>(
    () => ({
      regular: 150,
      kids: 70,
      student: 90,
      senior: 100,
    }),
    []
  );

  const handleTicketCountChange = (ticketType: string, count: number): void => {
    setTicketCounts(prev => ({
      ...prev,
      [ticketType]: count,
    }));
  };

  useEffect(() => {
    let newTotal = 0;
    let ticketCount = 0;

    Object.entries(ticketCounts).forEach(([type, count]) => {
      newTotal += count * ticketPrices[type as keyof Tickets];
      ticketCount += count;
    });

    let discountAmount = 0;
    if (isLoggedIn) {
      discountAmount = Math.round(newTotal * 0.1);
    }
    setTotalPrice(newTotal);

    const newFinalPrice = newTotal - discountAmount;

    setFinalPrice(newFinalPrice);

    const summary = Object.entries(ticketCounts)
      .filter(([, c]) => c > 0)
      .map(([ticket, count]) => `${count}x ${ticket}`)
      .join(', ');

    onTicketSummaryChange(summary);

    onTotalTicketsChange(ticketCount);
    onFinalPriceChange(newFinalPrice);
  }, [ticketCounts, ticketPrices, onTotalTicketsChange, onFinalPriceChange, isLoggedIn, onTicketSummaryChange]);

  return (
    <div className=' bg-white-900 rounded-xl max-w-sm mx auto ml-12'>
      <h2 className='mb-6 text-2xl font-bold'>Select tickets</h2>
      <TicketButton price={ticketPrices.regular} ticketType='regular' onCountChange={handleTicketCountChange}>
        Regular
      </TicketButton>
      <TicketButton price={ticketPrices.kids} ticketType='kids' onCountChange={handleTicketCountChange}>
        Kids (0-11)
      </TicketButton>
      <TicketButton price={ticketPrices.student} ticketType='student' onCountChange={handleTicketCountChange}>
        Student
      </TicketButton>
      <TicketButton price={ticketPrices.senior} ticketType='senior' onCountChange={handleTicketCountChange}>
        Senior
      </TicketButton>
      <div className="mt-6 p-4 rounded-lg border border-kino-grey">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span className="font-medium">{totalPrice} SEK</span>
          </div>

          {isLoggedIn && (
            <div className="flex justify-between">
              <span className="font-medium">Discount (10%)</span>
              <span className="font-medium">{totalPrice - finalPrice} SEK</span>
            </div>
          )}
          {!isLoggedIn && (
            <div className='flex justify-between'>
              <span className='font-medium'>Discount (10%)</span>
              <span className='font-medium'>Not a member</span>
            </div>
          )}

          <hr className="my-2 border-t-[0.5px]" />
          <div className="flex justify-between">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-lg">{finalPrice} SEK</span>
          </div>
          {!isLoggedIn && (
            <div className='mt-2 text-sm text-kino-grey'>
              <small className='text-sm'>
                <span
                  onClick={() => {
                    toggleModal('login');
                  }}
                  className='underline text-kino-darkred cursor-pointer'>
                  Login
                </span>{' '}
                to recieve discount
              </small>
            </div>
          )}
        </div>
      </div>
      <Register showRegisterModal={showRegisterModal} onToggleModal={toggleModal} onResetForm={resetForm} />
      <Login showLoginModal={showLoginModal} onToggleModal={toggleModal} onResetForm={resetForm} />
    </div>
  );
}
