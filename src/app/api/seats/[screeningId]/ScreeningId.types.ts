import { Types } from 'mongoose';

export interface SeatDocument {
  _id: Types.ObjectId | string;
  row: number;
  seatNumber: number;
  [key: string]: unknown;
  isBooked: boolean;
}

export interface BookingDocument {
  _id: Types.ObjectId | string;
  screeningId: Types.ObjectId | string; 
  seatIds: (Types.ObjectId | string)[];
  userId: string | null;
  status: string;
  [key: string]: unknown;
}

export interface ReservationDocument {
  _id: Types.ObjectId | string;
  screeningId: Types.ObjectId | string;
  seats: (Types.ObjectId | string)[];
  userId: string;
  status: string;
  expiresAt: Date;
  [key: string]: unknown;
}
