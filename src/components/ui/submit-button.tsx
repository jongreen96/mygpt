'use client';

import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './button';

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending} className='w-full'>
      {pending ? (
        <p className='flex gap-2 items-center'>
          <Loader2 className='size-4 animate-spin' />
          Please Wait
        </p>
      ) : (
        <p>{children}</p>
      )}
    </Button>
  );
}
