import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Seat from '@/models/seat';

export async function GET() {
  try {
    await connectDB();
    const seatings = await Seat.find({});
    return NextResponse.json(seatings);
  } catch (error) {
    console.error('Kunde inte hämta säten:', error);
    return new NextResponse('Internt serverfel', { status: 500 });
  }
}