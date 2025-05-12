import Image from "next/image";

type MovieDetailsProps = {
  title: string;
  posterUrl: string;
};

const MovieInfo = ({ title, posterUrl }: MovieDetailsProps) => {
  return (
    <div className="p-4 flex flex-row items-start gap-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <Image
        src={posterUrl}
        alt={`Poster for ${title}`}
        width={200}
        height={300} 
        className="rounded-xl shadow-lg flex-shrink-0"
        priority
      />
    </div>
  );
};

export default MovieInfo;