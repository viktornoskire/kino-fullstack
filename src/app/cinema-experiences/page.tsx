import Image from "next/image";

export default function CinemaExperiences() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center m-5">Cinema Experiences</h1>
      <div className="bg-kino-darkgrey p-4 rounded-xl m-4">
        <h2 className="font-bold text-2xl mb-2 mt-6">
          Exclusive Private Movie Rooms at Kino Cinema – Luxury, Comfort &
          Bubbling Bliss!
        </h2>
        <p className="mb-4">
          Looking for a truly unique and indulgent movie experience? At Kino
          Cinema, we offer exclusive private screening rooms, designed to bring
          you the perfect blend of comfort, privacy, and entertainment. Relax in
          your own soothing jacuzzi while you watch your favorite films.
          State-of-the-art technology – Enjoy crystal-clear visuals and
          immersive surround sound for an unparalleled cinematic experience.
        </p>
        <p className="mb-10">
          Personalized service – Order gourmet snacks, premium drinks, and
          champagne to complete your VIP movie night. Perfect for special
          occasions – Celebrate birthdays, anniversaries, or just a luxurious
          night out with an unforgettable private screening. Whether it’s an
          intimate date night, a gathering with friends, or simply a way to
          treat yourself, our private cinema suites provide the ultimate
          atmosphere for relaxation and entertainment.
        </p>        
      </div>
      <Image
        src="/privatemovie.png"
        alt="Picture of jacuzzi Cinema Experience room"
        width={500}
        height={300}
        className="rounded-xl m-4"
      />
      <div  className="bg-kino-darkgrey p-4 rounded-xl m-4">
        <p className="mb-4 font-bold text-lg">
          Book your private movie room today and let the luxury begin!
        </p>
        <p className="mb-10">
          Visit us at Kino Cinema or Contact us via Phonenumber: +46 26-290066 |
          Email: kinosandviken@kino.nu
        </p>
      </div>
      <Image
        src="/charcuterie.png"
        alt="Picture of charcutertie board with melons, ham and cheese"
        width={500}
        height={300}
        className="rounded-xl m-4"
      />
    </div>
  );
}
