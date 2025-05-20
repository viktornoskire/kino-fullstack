import mongoose, { Schema, Document } from "mongoose";

export interface ReservationType extends Document {
  screeningId: mongoose.Types.ObjectId;
  seats: mongoose.Types.ObjectId[];
  userId: string;
  status: "reserved" | "confirmed" | "cancelled"; 
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
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

    expiresAt: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 10 * 60 * 1000); // CAN BE CHANGED, 10MIN RIGHT NOW.
      },
      required: function (this: ReservationType) {
        return this.status === "reserved";
      },
    },
  },
  { timestamps: true, collection: "reservations" }
);

ReservationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

ReservationSchema.index({ screeningId: 1, seats: 1, status: 1 });

export const Reservation =
  mongoose.models.Reservation ||
  mongoose.model<ReservationType>("Reservation", ReservationSchema);

export default Reservation;
