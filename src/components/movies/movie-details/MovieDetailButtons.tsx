"use client";

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function MovieDetailButtons({ slug }: { slug: string }) {
  const router = useRouter();

  return (
    <>
      <div className="max-w-3xl mt-8 flex flex-col-reverse md:flex-row md:justify-between gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/")}
          className="w-full max-w-xs self-center md:w-auto"
        >
          Back to Homepage
        </Button>
        <Button
          type="button"
          onClick={() => router.push(`/movies/${slug}/booking`)}
          className="w-full max-w-xs self-center md:w-auto"
        >
          Book Ticket
        </Button>
      </div>
    </>
  );
}