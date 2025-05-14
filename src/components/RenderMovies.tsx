import { FC } from "react";
import { displayMovie } from "@/types/Movietypes";
import Image from "next/image";

const Display: FC<displayMovie> = ({ display, children }) => {
  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-center p-4">{children}</h2>
        <ul className="flex flex-col lg:flex-row lg:justify-center items-center lg:items-baseline">
          {display.map((movie, index) => {
            return (
              <li key={index} className=" p-4 lg:p-2 lg:max-w-[240px]">
                <a href={movie.slug}>
                  <Image
                    src={movie.posterUrl}
                    alt="Movie poster"
                    width={300}
                    height={450}
                    className="w-auto h-auto mb-2 rounded-2xl"
                  />
                  <p className="text-xl mb-4">{movie.title}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default Display;
