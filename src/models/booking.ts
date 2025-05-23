import mongoose, { Schema, Document } from 'mongoose';
export interface BookingType extends Document {
  movieId: mongoose.Types.ObjectId;
  screeningId: mongoose.Types.ObjectId;
  seatIds: mongoose.Types.ObjectId[];
  userId: string | null;
  status: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  customerInfo?: {
    email: string;
    phone: string;
    name: string;
  };
  paymentMethod?: 'swish' | 'card' | 'atCinema';
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

const CustomerInfoSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const BookingSchema = new Schema(
  {
    screeningId: {
      type: Schema.Types.ObjectId,
      ref: 'Screening',
      required: true,
    },
    seatIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Seat',
        required: true,
      },
    ],
    userId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['reserved', 'confirmed', 'cancelled'],
      default: 'reserved',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    customerInfo: {
      type: CustomerInfoSchema,
      required: false,
    },
    paymentMethod: {
      type: String,
      enum: ['swish', 'card', 'atCinema'],
      required: false,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
      required: false,
    },
  },
  { timestamps: true, collection: 'bookings' }
);

BookingSchema.pre('save', function (next) {
  if (this.status === 'confirmed') {
    if (!this.customerInfo) {
      return next(new Error('Customer information is required for confirmed bookings'));
    }

    if (!this.paymentMethod) {
      return next(new Error('Payment method is required for confirmed bookings'));
    }

    if (!this.paymentStatus) {
      this.paymentStatus = 'pending';
    }
  }

  next();
});

BookingSchema.index({ screeningId: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ 'customerInfo.email': 1 });

export const Booking = mongoose.models.Booking || mongoose.model<BookingType>('Booking', BookingSchema);

export default Booking;
