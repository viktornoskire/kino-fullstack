import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Reservation from "@/models/reservation";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();
  const deleted = await Reservation.findByIdAndDelete(id);

  if (!deleted) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
