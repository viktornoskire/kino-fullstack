import { NextAuthOptions } from 'next-auth';
import User from '@/models/authModels';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {},
    }),
  ],
  session: { strategy: 'jwt' },
};
