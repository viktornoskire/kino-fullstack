import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/authModels';
import { authOptions } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const user = body.userInfo;
    await User.findByIdAndUpdate(session.user.id, user);
    return NextResponse.json(
      { message: 'Updated!', type: 'succes' },
      { status: 201 }
    );
  } catch (err) {
    console.error('error', err);
    return NextResponse.json(
      { message: 'Failed', type: 'error' },
      { status: 500 }
    );
  }
}
