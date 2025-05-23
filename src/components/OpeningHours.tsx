import { displayOpen } from "@/types/Opentype";

const OpeningHours = ({ display }: { display: displayOpen[] }) => {
  return (
    <>
      <div className="bg-kino-black p-4 min-w-[500px] rounded-2xl">
        <h2 className="text-2xl font-bold mb-2">Opening hours</h2>
        <ul className="">
          {display.map((show, index) => {
            return (
              <li key={index} className="p-1  grid grid-cols-3">
                <span className="col-start-1">{show.day} </span>{" "}
                <span className="col-start-2">{show.date}</span>
                <span className="col-start-3">{show.hours}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default OpeningHours;
