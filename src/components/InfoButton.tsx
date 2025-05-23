'use client';

import Image from 'next/image';
import { FC } from 'react';
import { buttonType } from '@/types/Buttontypes';

const InfoButton: FC<buttonType> = ({
  children,
  type,
  style,
  open,
  onClick,
}) => {
  return (
    <button
      type={type}
      className="flex flex-row pt-1 pb-1 cursor-pointer"
      style={style}
      onClick={onClick}
    >
      <Image
        src={open ? '/QnAClose.png' : '/QnAOpen.png'}
        alt="Open"
        width={25}
        height={25}
        className="mr-4"
      />
      {children}
    </button>
  );
};

export default InfoButton;
