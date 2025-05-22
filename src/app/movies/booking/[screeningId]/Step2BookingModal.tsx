'use client';

import { useState, useEffect } from 'react';
import { Step2BookingModalProps } from './types/BookingModalTypes';
import { useSession } from 'next-auth/react';

export default function Step2BookingModal({ userInfo, onInputChange }: Step2BookingModalProps) {
  const session = useSession();
  const user = session.data?.user;
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (!userInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!userInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!userInfo.email.includes('@')) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!userInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };
  useEffect(() => {
    onInputChange('name', user?.name || '');
    onInputChange('email', user?.email || '');
    onInputChange('phoneNumber', user?.number || '');
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  };

  const renderField = (name: keyof typeof userInfo, label: string, type: string = 'text') => {
    const hasError = touched[name] && Boolean(errors[name]);
    return (
      <div>
        <label htmlFor={name} className='block text-sm font-medium mb-1'>
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={(user?.[name as keyof typeof user] || userInfo[name as keyof typeof userInfo]) ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`
            w-full p-3 rounded
            ${hasError ? 'border-2 border-red-500 bg-kino-darkgrey' : 'border bg-kino-darkgrey border-kino-grey'}
          `}
        />
        {hasError && <p className='mt-1 text-sm text-red-500'>{errors[name]}</p>}
      </div>
    );
  };

  return (
    <>
      <p className='text-sm mb-4'>Please provide your information to continue:</p>

      <div className='space-y-3'>
        {renderField('name', 'Name')}
        {renderField('email', 'Email', 'email')}
        {renderField('phoneNumber', 'Phone Number', 'tel')}
      </div>
    </>
  );
}
