import Image from "next/image";

type MovieDetailsProps = {
  title: string;
  posterUrl: string;
};

const MovieInfo = ({ title, posterUrl }: MovieDetailsProps) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Image
        src={posterUrl}
        alt={`Poster for ${title}`}
        width={400}
        height={600}
        className="rounded-xl shadow-lg"
      />
    </div>
  );
};

export default MovieInfo;