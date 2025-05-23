import { booking } from '@/types/Bookedmovietypes';
import Image from 'next/image';

const BookedMovies = ({ booked }: { booked: booking[] }) => {
  const uppcoming = booked
    .filter((time) => new Date(time.screening) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.screening).getDate() - new Date(b.screening).getDate()
    );

  return (
    <>
      <div className="w-[300px]">
        <h2 className="text-2xl font-bold pb-2">Booked movies</h2>
        <ul>
          {uppcoming.length > 0 ? (
            uppcoming.map((book, index) => {
              return (
                <li key={index}>
                  <Image
                    src={book.url}
                    alt="Movie poster"
                    width={300}
                    height={350}
                    className="h-auto w-auto mb-2 rounded-2xl"
                  />
                  <p className="text-xl font-bold mb-2">{book.movie}</p>
                  <p>Date: {book.date}</p>
                  <p>Time: {book.time}</p>
                </li>
              );
            })
          ) : (
            <p>No upcoming bookings</p>
          )}
        </ul>
      </div>
    </>
  );
};
export default BookedMovies;
