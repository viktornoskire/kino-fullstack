import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center"
      role="main"
    >
      <h1 className="text-3xl mb-4 font-bold text-kino-white md:text-4xl lg:text-5xl">
        404 - Scene Missing!
      </h1>
      <h2 className="mt-2 text-xl text-kino-white md:text-2xl lg:mt-3">
        Oops! This page must have been cut in the final edit.
      </h2>
      <p className="mt-3 text-base text-kino-white md:text-lg md:mt-4">
        The page you were looking for might have taken a dramatic exit...
      </p>
      <div className="w-full max-w-[300px] mt-4 md:max-w-[400px] lg:max-w-[500px]">
        <Image
          src="/404.png"          
          alt="Illustration of a missing page with a cinematic theme"
          width={500}
          height={500}
          priority
          className="w-full h-auto rounded-lg"
        />
      </div>
      <Link
        href="/"
        className="text-base mt-6 text-kino-white px-5 py-2 rounded-xl transition-all duration-300 hover:text-kino-red hover:scale-105 md:text-lg md:px-6 md:py-3"
        aria-label="Return to Kino Cinema homepage"
      >
        Back to the home page!
      </Link>
    </div>
  );
}
