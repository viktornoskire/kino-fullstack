'use client';
import { useEffect } from 'react';
import { Step2BookingModalProps } from './types/BookingModalTypes';
import { useSession } from 'next-auth/react';

export default function Step2BookingModal({ userInfo, onInputChange }: Step2BookingModalProps) {
  const session = useSession();
  const user = session.data?.user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };
  useEffect(() => {
    onInputChange('name', user?.name || '');
    onInputChange('email', user?.email || '');
    onInputChange('phoneNumber', user?.number || '');
  }, []);

  return (
    <>
      <p className='text-sm mb-4'>Please provide your information to continue:</p>

      <div className='space-y-3'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium mb-1'>
            Name*
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={user?.name || userInfo.name}
            onChange={handleChange}
            className='w-full p-2 bg-gray-800 rounded border border-gray-700'
          />
        </div>

        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-1'>
            Email*
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={user?.email || userInfo.email}
            onChange={handleChange}
            className='w-full p-2 bg-gray-800 rounded border border-gray-700'
          />
        </div>

        <div>
          <label htmlFor='phoneNumber' className='block text-sm font-medium mb-1'>
            Phone Number*
          </label>
          <input
            type='tel'
            id='phoneNumber'
            name='phoneNumber'
            value={user?.number || userInfo.phoneNumber}
            onChange={handleChange}
            className='w-full p-2 bg-gray-800 rounded border border-gray-700'
          />
        </div>
      </div>
    </>
  );
}
