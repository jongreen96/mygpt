'use client';

import { H3 } from '@/components/typography';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className='flex h-dvh w-full items-center justify-center'>
      <Card>
        <CardHeader className='text-center'>
          <div className='mx-auto flex size-16 items-center justify-center rounded-full bg-secondary'>
            <CheckCircle className='size-10 text-green-500' />
          </div>
          <CardTitle>
            <H3>Payment Successful</H3>
          </CardTitle>
          <CardDescription>
            Your credits have been added to your account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-center gap-2 rounded border border-dashed p-2'>
            <AlertCircle className='size-4' />
            <p className='text-sm'>
              If you don&apos;t see your new credits, please
              <button
                onClick={() => window.location.reload()}
                className='px-1 text-primary underline hover:no-underline'
              >
                reload
              </button>
              the page
            </p>
          </div>

          <Link
            href='/chat'
            className={buttonVariants({
              className: 'w-full text-muted-foreground',
              variant: 'ghost',
            })}
          >
            <ChevronLeft className='-ml-3 size-2' />
            Return to Chat
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
