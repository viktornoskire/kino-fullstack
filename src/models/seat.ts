import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISeat extends Document {
  row: number;
  seatNumber: number;
}

const SeatSchema: Schema<ISeat> = new Schema(
  {
    row: { type: Number, required: true },
    seatNumber: { type: Number, required: true },
  },
  { collection: "seatings" }
);

const Seat: Model<ISeat> =
  mongoose.models.Seat || mongoose.model<ISeat>("Seat", SeatSchema);

export default Seat;
