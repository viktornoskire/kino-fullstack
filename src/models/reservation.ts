// models/Reservation.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ReservationType extends Document {
  screeningId: mongoose.Types.ObjectId;
  seats: mongoose.Types.ObjectId[];
  userId: string;
  status: "reserved" | "confirmed" | "cancelled";
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema(
  {
    screeningId: {
      type: Schema.Types.ObjectId,
      ref: "Screening",
      required: true,
    },
    seats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Seat",
        required: true,
      },
    ],
    userId: {
      type: String,
      required: true,
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
  { timestamps: true }
);

export const Reservation =
  mongoose.models.Reservation ||
  mongoose.model<ReservationType>("Reservation", ReservationSchema);

export default Reservation;
