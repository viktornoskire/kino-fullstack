import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import Image from "next/image";
import { BookingDetailsProps } from "./types/Booking.types";

export default function BookingDetails({
  movie,
  screening,
}: BookingDetailsProps) {
  const hours = Math.floor(movie.durationMinutes / 60);
  const minutes = movie.durationMinutes % 60;

  return (
    <div className="flex flex-row ml-2 justify-between items-start gap-4 sm:gap-6">
      <div className="w-24 sm:w-40 flex-shrink-0">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          width={160}
          height={240}
          className="w-full rounded-xl object-cover"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-lg sm:text-2xl font-bold mb-2">{movie.title}</h1>

        <p className="flex items-center gap-2 text-xs sm:text-sm text-kino-grey mb-2">
          <span className="px-2 py-1 border rounded-md text-xs font-semibold border-kino-grey">
            {movie.ageLimit}+
          </span>
          <span>
            {hours} h {minutes} min
          </span>
          <span>{movie.genre.join(", ")}</span>
        </p>

        <p className="text-sm sm:text-base text-kino-white font-medium mb-1">
          {format(new Date(screening.screeningTime), "EEEE d MMM, HH:mm", {
            locale: enGB,
          })}
        </p>

        <p className="text-xs sm:text-sm text-kino-grey">
          Kino Cinema, {screening.auditorium}
        </p>
      </div>
    </div>
  );
}
