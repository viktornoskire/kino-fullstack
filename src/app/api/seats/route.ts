import { NextResponse } from "next/server";
import Seat from "@/models/seat";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    const seatings = await Seat.find({});
    return NextResponse.json(seatings);
  } catch (error) {
    console.error("Kunde inte hämta säten:", error);
    return new NextResponse("Internt serverfel", { status: 500 });
  }
}
