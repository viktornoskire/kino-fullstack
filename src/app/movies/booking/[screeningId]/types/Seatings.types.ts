export interface Seat {
  _id: string;
  row: number;
  seatNumber: number;
  disabled?: boolean;
  isBooked: boolean;
}

export type SeatsByRow = {
  [key: number]: Seat[];
};

export interface CinemaSeatingProps  {
  screeningId: string;
  onSelectedSeatsChange: (seats: string[]) => void;
  totalTickets: number;
}
export type DisableModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type HandicapSeatProps = {
  children: React.ReactNode;
};