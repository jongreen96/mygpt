import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
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
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: 'Bot <support@jongreen.dev>',
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
