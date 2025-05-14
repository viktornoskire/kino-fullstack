// models/booking.ts
import mongoose, { Schema, Document } from "mongoose";

export interface BookingType extends Document {
  screeningId: mongoose.Types.ObjectId;
  seatIds: mongoose.Types.ObjectId[];
  userId: string | null;
  status: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema(
  {
    screeningId: {
      type: Schema.Types.ObjectId,
      ref: "Screening",
      required: true,
    },
    seatIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Seat",
        required: true,
      },
    ],
    userId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["reserved", "confirmed", "cancelled"],
      default: "reserved",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, collection: "bookings" }
);

export const Booking =
  mongoose.models.Booking ||
  mongoose.model<BookingType>("Booking", BookingSchema);

export default Booking;
