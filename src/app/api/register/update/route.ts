import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/authModels';
import { authOptions } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log('session', session);

  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const name = body.name;
    const userFound = await User.findByIdAndUpdate(session.user.id, {
      name: name,
    });

    console.log('user', userFound);

    return NextResponse.json(
      { created: true, message: 'Updated!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to update', error);
    return new NextResponse('Failes', { status: 500 });
  }
}
