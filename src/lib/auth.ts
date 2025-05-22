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
        number: { label: 'Number', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email }).select(
          '+password'
        );

        if (!user) throw new Error('Email invalid!');

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) throw new Error('Password incorrect!');

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          number: user.number, // should work now
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        return { ...token, id: user.id, number: user.number };
      }

      if (trigger === 'update' && session?.name) {
        token.name = session.name;
      }

      if (trigger === 'update' && session?.number) {
        token.number = session.number;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          number: token.number,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
};
