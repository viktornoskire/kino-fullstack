"use client";
import Image from "next/image";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold text-kino-white">
        Error 500 – The projector broke!
      </h1>
      <p className="mt-3 mb-3 text-lg text-kino-white">
        We hit a technical glitch! Try refreshing the page or return home.
      </p>
      <p>{error.message}</p>
      <Image
        src="/error.png"
        alt="An illustration of a broken film reel"
        width={500}
        height={500}
        priority
        className="w-full max-w-[300px] mt-4 rounded-lg md:max-w-[400px] lg:max-w-[500px]"
      />
      <button
        onClick={reset}
        className="mt-6 px-6 py-3 text-lg font-bold text-kino-white bg-kino-darkred rounded-xl hover:bg-kino-red transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  );
}
