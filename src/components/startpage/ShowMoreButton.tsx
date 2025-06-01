'use client';

import Button from '@/components/Button';

interface Props {
  onClick: () => void;
}

export default function ShowMoreButton({ onClick }: Props) {
  return (
    <div className='text-center col-start-1 col-end-3'>
      <Button type='button' variant='secondary' onClick={onClick} className='mt-10 mb-10 px-14 py-2 text-center'>
        Show more movies
      </Button>
    </div>
  );
}
