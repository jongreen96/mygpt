import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';
import prisma from './db';

declare module 'next-auth' {
  interface Session {
    user: {
      credits: number;
    } & DefaultSession['user'];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    verifyRequest: '/verify',
    signIn: '/login',
  },
  trustHost: true,
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          // @ts-expect-error - It's fine dont worry about it, you shouldn't even be reading this code anyway.
          credits: user.credits,
        },
      };
    },
  },
});
