import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Reservation from '@/models/reservation';
import Booking from '@/models/booking';

export async function POST(request: Request) {
  try {
    const { reservationId, userInfo, paymentMethod } = await request.json();
    console.log(userInfo);

    if (!reservationId || !userInfo || !paymentMethod) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return NextResponse.json({ message: 'Reservation not found or expired' }, { status: 404 });
    }

    if (reservation.status !== 'reserved') {
      return NextResponse.json({ message: 'Reservation is no longer valid' }, { status: 400 });
    }

    const booking = await Booking.create({
      screeningId: reservation.screeningId,
      seatIds: reservation.seats,
      userId: reservation.userId,
      status: 'confirmed',
      totalPrice: reservation.totalPrice,
      customerInfo: {
        email: userInfo.email,
        phone: userInfo.phoneNumber,
        name: userInfo.name,
      },
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'atCinema' ? 'pending' : 'completed',
    });

    reservation.status = 'confirmed';
    await reservation.save();

    return NextResponse.json({ success: true, bookingId: booking._id });
  } catch (error) {
    console.error('Error in booking confirmation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
