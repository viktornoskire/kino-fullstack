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

export interface CinemaSeatingProps {
  totalTickets: number;
}
