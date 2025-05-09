import Image from "next/image";

export const AvailableSeatIcon = () => (
  <Image
    src="/empty-seat.png"
    alt="Empty seat"
    width={24}
    height={24}
    className="w-6 h-6"
  />
);

export const SelectedSeatIcon = () => (
  <Image
    src="/selected-seat.png"
    alt="Chosen seat"
    width={24}
    height={24}
    className="w-6 h-6"
  />
);

export const DisabledSeatIcon = () => (
  <Image
    src="/disability-icon.png"
    alt="Disabled seat"
    width={24}
    height={24}
    className="w-6 h-6"
  />
);

export const TakenSeatIcon = () => (
  <Image
    src="/taken-seat.png"
    alt="Taken seat"
    width={24}
    height={24}
    className="w-6 h-6"
  />
);
