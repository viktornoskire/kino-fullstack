import Image from "next/image";

export default function CinemaExperiences() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center m-5 text-kino-white md:col-span-2">
        Cinema Experiences
      </h1>
      <div className="bg-kino-darkgrey p-4 rounded-xl m-4 md:row-start-2">
        <h2 className="font-bold text-2xl mb-2 mt-6 text-kino-white">
          Exclusive Private Movie Rooms at Kino Cinema – Luxury, Comfort &
          Bubbling Bliss!
        </h2>
        <p className="mb-4 text-lg text-kino-white">
          Looking for a truly unique and indulgent movie experience? At Kino
          Cinema, we offer exclusive private screening rooms, designed to bring
          you the perfect blend of comfort, privacy, and entertainment. Relax in
          your own soothing jacuzzi while you watch your favorite films.
          State-of-the-art technology – Enjoy crystal-clear visuals and
          immersive surround sound for an unparalleled cinematic experience.
        </p>
        <p className="mb-10 text-lg text-kino-white">
          Personalized service – Order gourmet snacks, premium drinks, and
          champagne to complete your VIP movie night. Perfect for special
          occasions – Celebrate birthdays, anniversaries, or just a luxurious
          night out with an unforgettable private screening. Whether it’s an
          intimate date night, a gathering with friends, or simply a way to
          treat yourself, our private cinema suites provide the ultimate
          atmosphere for relaxation and entertainment.
        </p>
      </div>
      <div className="md:row-start-2 flex justify-center">
        <Image
          src="/privatemovie.png"
          alt="Picture of jacuzzi Cinema Experience room"
          width={500}
          height={300}
          priority
          className="rounded-xl m-4  w-full max-w-lg object-cover"
        />
      </div>
      <div className="bg-kino-darkgrey p-4 rounded-xl m-4 md:order-5">
        <p className="mb-4 text-xl font-bold text-kino-white">
          Personalized service – Order gourmet snacks, premium drinks, and
          champagne to complete your VIP movie night.
        </p>
        <p className="mb-10 text-lg text-kino-white">
          Perfect for special occasions – Celebrate birthdays, anniversaries, or
          just a luxurious night out with an unforgettable private screening.
          Whether it’s an intimate date night, a gathering with friends, or
          simply a way to treat yourself, our private cinema suites provide the
          ultimate atmosphere for relaxation and entertainment.
        </p>
      </div>      
      <div className="md:order-4 flex justify-center">
        <Image
          src="/charcuterie.png"
          alt="Picture of charcutertie board with melons,crackers, ham and cheese"
          width={500}
          height={300}
          loading="lazy"
          className="rounded-xl m-4 w-full max-w-lg object-cover"
        />
      </div>
      <div className="bg-kino-darkgrey p-4 rounded-xl m-4 md:row-start-6 md:col-span-2">
        <p className="mb-4 font-bold md:text-2xl text-kino-white">
          Book your private movie room today and let the luxury begin!
        </p>
        <p className="mb-4 text-xl text-kino-white">
          Do you have questions or wish to <strong>book</strong> a private screening? Feel free to contact us!          
        </p>
      </div>
    </div>
  );
}
