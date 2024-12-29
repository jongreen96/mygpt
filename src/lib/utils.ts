import { clsx, type ClassValue } from 'clsx';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { auth } from './auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getSession() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return session;
}
